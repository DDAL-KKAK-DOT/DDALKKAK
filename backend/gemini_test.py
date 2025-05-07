import os
import shutil
from dotenv import load_dotenv
from google import genai
from google.genai import types
from utils_fetch import fetch_page_text

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

# GitHub API 토큰 (선택사항)
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
headers = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}


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
- 학력: {profile['education']}
- 기술 스택: {', '.join(profile['skills'])}

링크 발췌:
{links_block}


### 작성 규칙
1. **각 필드**는 다음과 같이 **풍부한 세부 내용**을 포함해야 합니다.  
   - `skillset`: 기술명 뒤에 ‘초급/중급/상급’ 수준 + 1줄 설명을 덧붙이세요.  
   - `projects[n].description`: 문제 상황 → 해결 과정 → 성과(숫자·지표) 순으로 3~5문장 작성.  
   - `projects[n].honor`: 정량 성과(예: *쿼리 속도 30% 개선*, *DAU 10 → 2 만 명*).  
   - `career[n].description`: (기술·팀 규모·업무 흐름·리더십 사례)를 4문장 이상으로 상세히.  
   - `education`, `clubs`도 구체적 경험·배운 점 포함(2문장↑).  
2. 한국어로 작성하고, 키 이름·중첩 구조 변경 금지.
3. 마크다운·코드펜스 없이 **순수 JSON만 출력**.

1) 출력할 JSON 스키마:
{{
  "profileInfo": "<이름/나이/직무 요약>",
  "shortIntro": "<간단 자기 소개>",
  "skillset": ["<기술1 수준>", "..."],
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
  "career": [
    {{
      "role": "<직무명>",
      "company": "<회사명>",
      "period": "<근무 기간>",
      "description": "<담당 업무 설명>"
    }},
    …
  ],
  "education": [
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
  "profileInfo": "홍길동 23세 백엔드",
  "shortIntro": "책임감 있는 개발자입니다!",
  "skillset": [
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
      "name": "프로젝트 이름2",
      "period": "2022.06 - 2022.12",
      "role": "프로젝트 직무2",
      "description": "프로젝트 내용에 대한 설명을 입력하세요.",
      "honor": ""
    }}
  ],
  "career": [
    {{
      "role": "직무 이름",
      "company": "기업명",
      "period": "2020.03 - 2023.02",
      "description": "업무 내용에 대한 설명을 입력하세요."
    }},
    {{
      "role": "직무 이름2",
      "company": "기업명2",
      "period": "2018.01 - 2020.02",
      "description": "업무 내용에 대한 설명을 입력하세요."
    }}
  ],
  "education": [
    {{
      "name": "교육 이름",
      "period": "2017.03 - 2017.08",
      "description": "교육 내용에 대한 설명을 입력하세요."
    }},
    {{
      "name": "교육 이름2",
      "period": "2016.09 - 2017.02",
      "description": "교육 내용에 대한 설명을 입력하세요."
    }}
  ],
  "clubs": [
    {{
      "name": "동아리 이름",
      "period": "2015.03 - 2016.12",
      "description": "동아리 활동에 대한 설명을 입력하세요."
    }},
    {{
      "name": "동아리 이름2",
      "period": "2014.03 - 2015.02",
      "description": "동아리 활동에 대한 설명을 입력하세요."
    }}
  ]
}}

3) 지시 사항:
- **반드시** 위 스키마와 동일한 JSON 키와 중첩 구조를 사용하세요.  
- 값은 샘플 데이터를 참고해 사실에 근거하거나, 입력된 정보에서 추론한 내용으로 채웁니다.  
- 설명(`description`)이나 성과(`honor`)가 비어 있을 경우 빈 문자열 `""`로 남겨 주세요.

-- 이제 바로 JSON만 출력해 주세요.
"""


def parse_llm_output(text: str) -> dict:
    parts = text.split("EXPERIENCES:")
    summary = parts[0].replace("SUMMARY:", "").strip() if parts else ""
    experiences = []
    if len(parts) > 1:
        for line in parts[1].strip().splitlines():
            if ":" in line and "." in line:
                num_title, desc = line.split(":", 1)
                title = num_title.split(". ", 1)[-1].strip()
                experiences.append({"title": title, "description": desc.strip()})
            elif line.strip():
                experiences.append({"title": "", "description": line.strip()})
    return {"summary": summary, "experiences": experiences}


def find_wkhtmltopdf() -> str:
    path = shutil.which("wkhtmltopdf")
    if path:
        return path
    brew = "/usr/local/bin/wkhtmltopdf"
    if os.path.isfile(brew):
        return brew
    raise IOError(
        "`wkhtmltopdf` 실행 파일을 찾을 수 없습니다. 설치하거나 경로를 지정하세요."
    )


def main():
    profile = {
        "name": "김예찬",
        "email": "yechan@example.com",
        "phone": "010-1234-5678",
        "education": "중앙대학교 소프트웨어공학과",
        "skills": ["Python", "FastAPI", "Flutter"],
    }
    links = [
        "https://github.com/ii2001",
        "https://fossil-drifter-7be.notion.site/?pvs=4",
        "https://fossil-drifter-7be.notion.site/PengCook-7de0b01f342d442080f677c309796b5c?pvs=4",
        "https://fossil-drifter-7be.notion.site/Yechan-Kim-1111058952168023a472d3e26729b4b7?pvs=4",
        "https://www.youtube.com/watch?v=tO3iGK2m4K8",
    ]
    # 1) tools 정의
    tools = [types.Tool(google_search=types.GoogleSearch())]

    # 2) config 객체 생성
    gen_cfg = types.GenerateContentConfig(
        tools=tools,
        response_mime_type="text/plain",
    )
    prompt = build_resume_prompt(profile, links)

    # 3) 호출
    resp = genai_client.models.generate_content(
        model="models/gemini-2.5-flash-preview-04-17",
        contents=prompt,  # ← str 또는 types.Content list
        config=gen_cfg,  # ← 여기!
    )

    out = resp.text

    print(out)


if __name__ == "__main__":
    main()
