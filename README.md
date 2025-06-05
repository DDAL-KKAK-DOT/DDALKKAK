# 이력서 자동 생성기

구조화된 데이터를 입력하면 전문적이고 커스터마이징 가능한 이력서를 PDF/HTML 형태로 빠르게 생성하는 도구입니다. FastAPI와 Python, 템플릿 엔진을 활용하여 웹 모드에서 사용할 수 있습니다.

---

## 목차

1. [프로젝트 개요](https://www.notion.so/readme-20903738548280798b74ee881809aa9b?pvs=21)
2. [주요 기능](https://www.notion.so/readme-20903738548280798b74ee881809aa9b?pvs=21)
3. [아키텍처 및 기술 스택](https://www.notion.so/readme-20903738548280798b74ee881809aa9b?pvs=21)
4. [사전 요구사항](https://www.notion.so/readme-20903738548280798b74ee881809aa9b?pvs=21)

---

## 프로젝트 개요

이 도구는 본인이 한 프로젝트 및 내역 링크를 받아서, 사전에 정의된 템플릿을 통해 일관되고 시각적으로 완성도 높은 이력서를 자동으로 만들어 줍니다.

- **빠른 생성**: 구조화된 데이터를 입력만 하면 몇 초 내로 HTML 이력서를 얻을 수 있습니다.
- **유연한 형식 지원**: FastAPI 기반 웹 모드를 지원합니다.

---

## 주요 기능

- **링크 크롤링**
    - 개인 정보, 학력, 경력, 기술 스택, 프로젝트, 인증/수상, 언어 등 다양한 섹션을 자동으로 감지
    - 순서 변경, 조건부 섹션(On/Off) 지원
- **웹 모드 (FastAPI)**
    - 브라우저에서 업로드할 JSON/YAML 파일을 선택하면 즉시 HTML 이력서를 반환
    - RESTful API로 다른 서비스와 연동 가능

---

## 아키텍처 및 기술 스택

- **언어 및 프레임워크**
    - Python 3.8 이상
    - FastAPI (웹 모드)
- **의존성 관리**
    - pip + virtualenv
- **버전 관리**
    - Git (GitHub 저장소에 호스팅)

---

## 사전 요구사항

1. **Python 3.8 이상 설치**
2. **가상환경 설정 권장**

    ```bash
    python -m venv .venv
    source .venv/bin/activate    # macOS/Linux
    .venv\\Scripts\\activate       # Windows
    
    ```


---

## 설치 방법

1. GitHub 저장소를 클론

    ```bash
    git clone https://github.com/사용자명/resume-auto-generator.git
    cd resume-auto-generator
    ```

2. 가상환경 활성화 및 의존성 설치

    ```bash
    
    python -m venv .veurce .venv/bin/activate    # macOS/Linux
    .venv\Scripts\activate       # Windows
    
    pip install --upgrade pip
    pip install -r requirements.txt
    ```


---

## 설정

1. **환경 변수 설정 (선택 사항)**
    - PDF 엔진 경로, 템플릿 디렉토리 경로 등을 `.env` 파일에 정의하세요.
    - 예시 (`.env`):

        ```
        GEMINI_API_KEY="YOUR_API_KEY"
        ```


## 사용 방법

---

### 서버 실행 방법 (FastAPI)

1. 서버 실행

    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

2. 브라우저에서 접속

    ```bash
    http://localhost:8000/docs
    ```

   또는

    ```
    http://localhost:8000/redoc
    ```


---

## 샘플 입력 및 출력

- **JSON 예시 (`data/profile.json`)**

    ```json
    {
      "personal_info": {
        "name": "김예찬",
        "email": "yechan.kim@example.com",
        "phone": "+82-10-1234-5678",
        "address": "서울시 관악구"
      },
      "education": [
        {
          "institution": "중앙대학교",
          "degree": "학사",
          "major": "소프트웨어학부",
          "start_date": "2019-03",
          "end_date": "2023-02"
        },
        {
          "institution": "Ohio State University",
          "degree": "학사",
          "major": "Landscape Architecture",
          "start_date": "2018-08",
          "end_date": "2022-05"
        }
      ],
      "experience": [
        {
          "company": "ABC Tech",
          "position": "소프트웨어 엔지니어 인턴",
          "start_date": "2024-07",
          "end_date": "2024-08",
          "details": [
            "FastAPI 기반 RESTful API 개발",
            "Docker를 활용한 컨테이너 배포",
            "CI/CD 파이프라인 설정 및 관리"
          ]
        }
      ],
      "skills": ["Python", "FastAPI", "Docker", "Git", "HTML/CSS"],
      "projects": [
        {
          "title": "Resume Auto-Generator",
          "description": "구조화된 데이터를 기반으로 이력서를 자동 생성하는 툴 개발",
          "technologies": ["FastAPI", "Jinja2"]
        }
      ]
    }
    
    ```


---

## 프로젝트 구조

```
resume-auto-generator/
├── app/
│   ├── main.py              # FastAPI 엔트리포인트
│   ├── schemas.py           # Pydantic 모델 정의 (입력 데이터 구조)
│   ├── generator.py         # 템플릿 렌더링 및 PDF/HTML 변환 로직
│   └── utils.py             # 공통 유틸리티 함수 모음
├── cli/
│   ├── __init__.py
│   └── commands.py          # Typer를 이용한 CLI 명령어 정의
├── templates/
│   ├── default/             # 기본 템플릿 폴더
│   │   ├── resume.html.jinja
│   │   └── styles.css
│   └── custom/              # 사용자 정의 템플릿 예시
│       ├── resume.html.jinja
│       └── styles.css
├── data/                    # 샘플 입력 파일 (JSON/YAML)
│   ├── profile.json
│   └── profile.yaml
├── output/                  # 생성된 이력서 결과물 저장 디렉토리
├── requirements.txt         # Python 패키지 의존성 목록
├── README.md                # 이 문서
└── .env.example             # 환경 변수 예시 파일

```

---

## 개발 및 기여

- **기여 방법**
    1. 저장소를 Fork
    2. 새 브랜치 생성 (`feature/be/{issue_number}`)
    3. 코드 수정 및 커밋
    4. Pull Request 생성
    5. 리뷰 후 병합 (리드 개발자 전원 Approve 시 Merge 가능)
- **이슈 등록**
    - 버그 발견, 기능 요청 등은 [Issues](https://github.com/%EC%82%AC%EC%9A%A9%EC%9E%90%EB%AA%85/resume-auto-generator/issues)에 남겨주세요.
- **코딩 스타일**
    - PEP8을 준수하여 코드 작성 → pylint 를 준수하도록 Github Actions를 활용
    - 문서화를 병행

---

## 라이선스

이 프로젝트는 [MIT 라이선스](https://www.notion.so/nasanghyun/LICENSE)를 따릅니다. 자유롭게 사용, 수정, 배포가 가능합니다.