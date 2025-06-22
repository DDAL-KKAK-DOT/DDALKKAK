import json
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from backend.data_model.inputProfile import InputProfile
from backend.data_model.outputProfile import OutputProfile
from backend.utils_fetch import fetch_page_text

# .env 파일 로드
load_dotenv()

# 환경 변수에서 API 키 읽기
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY environment variable is not set. .env 파일을 확인하세요."
    )

# Gemini 클라이언트 초기화
genai_client = genai.Client(api_key=GEMINI_API_KEY)


def generate_profile_from_input(profile: InputProfile) -> OutputProfile:
    profile_dict = {
        "name": profile.name,
        "email": profile.contact or "",  # contact 필드를 이메일로 사용
        "phone": profile.contact or "",
        "educations": profile.educations[0] if profile.educations else "",
        "skills": [],  # skill 정보는 InputProfile에 없음
    }
    links = [str(link) for link in profile.activity_links]
    prompt = build_resume_prompt(profile_dict, links)

    cfg = types.GenerateContentConfig(response_mime_type="application/json")
    resp = genai_client.models.generate_content(
        model="models/gemini-2.5-flash-preview-04-17",
        contents=prompt,
        config=cfg,
    )
    raw = json.loads(resp.text)

    # 🛠 누락된 필드가 있으면 기본값 설정
    raw.setdefault("skills", [])
    raw.setdefault("projects", [])
    raw.setdefault("careers", [])
    raw.setdefault("educations", [])
    raw.setdefault("clubs", [])

    return OutputProfile(**raw)


def build_resume_prompt(profile: dict, urls: list[str]) -> str:
    sections = []
    print(urls)
    for idx, url in enumerate(urls, start=1):
        content = fetch_page_text(url)  # 전처리·길이컷 포함
        print(idx, content)
        sections.append(f"[{idx}] URL: {url}\nCONTENT:\n{content}\n")
    links_block = "\n".join(sections)
    # (아래 프롬프트 구성은 종전 그대로)

    return f"""
당신은 경력 개발자를 뽑으려고하는 면접자 입니다.
아래 프로필·프로젝트·경력·교육·동아리 정보를 바탕으로,
당신이 뽑고싶은 인재상을 담아서 내 정보를 기반으로 
JSON 포맷으로 **매우 상세한** 이력서를 만들어 주세요.

프로필:
- 이름: {profile['name']}
- 이메일: {profile['email']}
- 연락처: {profile['phone']}
- 학력: {profile['educations']}
- 기술 스택: {', '.join(profile['skills'])}

링크 발췌:
{links_block}


### 작성 규칙
1. **각 필드**는 다음과 같이 **풍부한 세부 내용**을 포함해야 합니다.  
   - `skills`: 기술명 뒤에 ‘초급/중급/상급’ 수준 + 1줄 설명을 덧붙이세요.  
   - `projects[n].description`: 문제 상황 → 해결 과정 → 성과(숫자·지표) 순으로 3~5문장 작성.  
   - `projects[n].honor`: 정량 성과(예: *쿼리 속도 30% 개선*, *DAU 10 → 2 만 명*).  
   - `careers[n].description`: (기술·팀 규모·업무 흐름·리더십 사례)를 4문장 이상으로 상세히.  
   - `educations`, `clubs`도 구체적 경험·배운 점 포함(2문장↑).  
2. 한국어로 작성하고, 키 이름·중첩 구조 변경 금지.
3. 마크다운·코드펜스 없이 **순수 JSON만 출력**.

1) 출력할 JSON 스키마:
{{
  "profileInfo": {{
  "name": "<이름>",
  "english_name": "<영문 이름>",
  "educations": ["<학교 이름>", "..."],
  "desired_role": "<희망 직무>",
  "contact": "<이메일 or 전화번호>",
  "activity_links": ["<링크1>", "<링크2>", "..."]
    }},
  "shortIntro": "<간단 자기 소개>",
  "skills": ["<기술1 수준>", "..."],
  "projects": [
    {{
      "name": "<프로젝트명>",
      "period": "<기간>",
      "role": "<맡은 역할>",
      "description": "<상세 설명>",
      "honor": "<주요 성과>"
    }},
    …
  ],
  "careers": [
    {{
      "role": "<직무명>",
      "company": "<회사명>",
      "period": "<근무 기간>",
      "description": "<담당 업무 설명>"
    }},
    …
  ],
  "educations": [
    {{
      "name": "<교육명>",
      "period": "<기간>",
      "description": "<교육 내용>"
    }},
    …
  ],
  "clubs": [
    {{
      "name": "<동아리명>",
      "period": "<활동 기간>",
      "description": "<활동 내용>"
    }},
    …
  ]
}}

2) 실제 데이터(샘플):
{{
  "profileInfo": {{
  "name": "홍길동",
  "english_name": "HONG GIl Dong",
  "educations": ["중앙대"],
  "desired_role": "백엔드 개발자",
  "contact": "dfddf@gmail.com",
  "activity_links": ["https://github.com/0dsdka"]
    }},
  "shortIntro": "책임감 있는 개발자입니다!",
  "skills": [
    "java 상",
    "C++ 중",
    "Python 상"
  ],
  "projects": [
    {{
      "name": "아이엘츠 사이트 제작",
      "period": "2023.01 - 2023.12",
      "role": "백엔드",
      "description": "학원 외주를 받아서 제작한 프로젝트",
      "honor": "데이터 쿼리 조회 시간 3초 단축"
    }},
    {{
      "name": "ㅇㅇㅇ 해커톤 참여",
      "period": "2022.06 - 2022.12",
      "role": "백엔드 / 서버 인프라",
      "description": "ㅇㅇㅇ 해커톤에 참여하여 서비스를 개발했습니다.",
      "honor": "캐싱 레이어를 활용하여 응답 속도 50% 개선"
    }}
  ],
  "careers": [
    {{
      "role": "PM",
      "company": "ㅁㅁㅁ 스타트업",
      "period": "2020.03 - 2023.02",
      "description": "스타트업에서 PM으로 근무하며 시장 조사 및 데이터 분석을 통해 사용자 페인 포인트를 식별하여 사용자 중심의 제품 전략을 수립하고 실행했습니다"
    }},
  ],
  "educations": [
    {{
      "name": "한국과학고등학교",
      "period": "2013.03 - 2016.02",
      "description": "과학 고등학교 과정 이수 및 기본 학업 역량 배양했습니다. 교내 동아리 활동 참여를 통해 협업 능력 및 문제 해결 능력을 함양했습니다."
    }},
    {{
      "name": "정부 지원 코딩부트캠프",
      "period": "2019.03 - 2019.08",
      "description": "프론트엔드/백엔드 개발 역량 강화를 위한 집중 교육 과정을 이수했습니다. HTML, CSS, JavaScript, React(또는 Spring, Node.js) 등 웹 개발 핵심 기술 습득 및 팀 프로젝트를 통한 실전 개발 경험을 축적했습니다."
    }}
  ],
  "clubs": [
    {{
      "name": "알고리즘 학회",
      "period": "2017.03 - 2018.12",
      "description": "주 1회 스터디를 통해 코딩 테스트 문제 풀이 역량을 강화하고, 자료구조 및 알고리즘의 심화 이론을 학습했습니다."
    }},
  ]
}}

{
    "profileInfo": {
    "name": "김철수",
    "english_name": "KIM CHUL SOO",
    "educations": ["서울대학교 정보보호학과"],
    "desired_role": "시스템 소프트웨어 엔지니어",
    "contact": "chulsoo@example.com",
    "activity_links": [
      "https://github.com/chulsoo/sysproj",
      "https://github.com/chulsoo/netproj"
    ]
  },
  "shortIntro": "안정성과 효율성을 중시하는 시스템 개발자입니다.",
  "skills": [
    "C++ 상급: 커널 모듈 및 드라이버 개발 경험",
    "Go 중급: 고성능 네트워크 서버 설계",
    "Docker 중급: 컨테이너 오케스트레이션 자동화"
  ],
  "projects": [
    {
    "name": "커널 모듈 개발 프로젝트",
      "period": "2021.02 - 2021.08",
      "role": "시스템 개발자",
      "description": "Linux 커널 모듈을 구현하여 디바이스 드라이버 기능을 확장했습니다.",
      "honor": "모듈 로드 시간 25% 감소"
    },
    {
    "name": "네트워크 서버 구현",
      "period": "2020.03 - 2020.11",
      "role": "백엔드 개발자",
      "description": "Go 언어로 TCP/UDP 서버를 설계하고 부하 분산 시스템을 구축했습니다.",
      "honor": "서버 처리량 2배 증가"
    }
  ],
  "careers": [
    {
    "role": "시스템 엔지니어",
      "company": "XYZ 솔루션",
      "period": "2018.04 - 2020.01",
      "description": "임베디드 시스템 및 리얼타임 OS 개발"
    }
  ],
  "educations": [
    {
    "name": "정보보호 전문가 과정",
      "period": "2019.05 - 2019.10",
      "description": "침투 테스트 및 보안 아키텍처 학습"
    }
  ],
  "clubs": [
    {
    "name": "해킹 방어대회 팀",
      "period": "2017.09 - 2018.02",
      "description": "CTF 대회 참가 및 메달 획득"
    }
  ]
}

3) 지시 사항:
- **반드시** 위 스키마와 동일한 JSON 키와 중첩 구조를 사용하세요.  
- 값은 샘플 데이터를 참고해 사실에 근거하거나, 입력된 정보에서 추론한 내용으로 채웁니다.  
- 설명(`description`)이나 성과(`honor`)가 비어 있을 경우 빈 문자열 `""`로 남겨 주세요.

-- 이제 바로 JSON만 출력해 주세요.
"""


def generate_profile() -> OutputProfile:
    profile = {
        "name": "김예찬",
        "email": "yechan@example.com",
        "phone": "010-1234-5678",
        "educations": "중앙대학교 소프트웨어공학과",
        "skills": ["Python ", "FastAPI", "Flutter"],
    }
    links = [
        "https://github.com/ii2001",
        "https://fossil-drifter-7be.notion.site/?pvs=4",
        "https://fossil-drifter-7be.notion.site/PengCook-7de0b01f342d442080f677c309796b5c?pvs=4",
        "https://fossil-drifter-7be.notion.site/Yechan-Kim-1111058952168023a472d3e26729b4b7?pvs=4",
        "https://www.youtube.com/watch?v=tO3iGK2m4K8",
    ]
    prompt = build_resume_prompt(profile, links)
    cfg = types.GenerateContentConfig(
        response_mime_type="application/json",
    )
    # 호출
    resp = genai_client.models.generate_content(
        model="models/gemini-2.5-flash-preview-04-17",
        contents=prompt,  # ← str 또는 types.Content list
        config=cfg,
    )
    # resp.text가 JSON 문자열이라면
    raw = json.loads(resp.text)
    # Pydantic 모델로 검증·변환
    return OutputProfile(**raw)
