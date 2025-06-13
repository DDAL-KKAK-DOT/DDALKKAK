![readmeheader](https://github.com/user-attachments/assets/c49c5c44-6d00-4490-9d5e-a70ce547d97a)
---

> ### 목차
> [1. 🚀 서비스 배포 링크](#-서비스-배포-링크) <br>
> [2. 💡 기획 배경](#-기획-배경) <br>
> [3. 📋 핵심 기능](#-핵심-기능) <br>
> [4. ⚙️ 서비스 아키텍처](#) <br>
> [5. 📝 기술적 도전](#) <br>
> [6. 🛠️ 기술 스택](#) <br>
> [7. 🧑🏻‍💻 실행 방법](#) <br>

<br/>

# 🚀 서비스 배포 링크

<br/>

# 👆🏻 기획 배경

> <strong>'딸깍'</strong>은 이력서를 처음 작성하는 학생들이 겪는 어려움을 해결하고자 시작된 프로젝트입니다.<br/><br/>
사용자는 <strong>자신의 활동 링크(예: GitHub, Notion 등)</strong>만 입력하면,<br/>AI가 내용을 분석하여 구조화된 이력서 데이터를 생성하고,<br/>
깔끔한 템플릿으로 PDF까지 자동 생성해주는 서비스를 제공합니다.

<br/>

# 📋 핵심 기능

### 🔗 회원가입 없이 이력서 생성하기

> 번거로운 가입 과정 없이 빠르게 이력서 생성 시작이 가능합니다.

<table>
  <tr align="center">
    <td><strong>랜딩 페이지</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img src="https://github.com/user-attachments/assets/3b6fd7c5-aa97-453d-8193-b0e21474c782" alt="메인 랜딩 페이지" width="900"/>
    </td>
  </tr>
</table>

<br>

### 🔗 이력서 템플릿 선택하기

> 깔끔한 스타일의 디자인 템플릿이 5종 기본 제공됩니다.

<table>
  <tr align="center">
    <td><strong>진행할 이력서 템플릿 선택</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img src="https://github.com/user-attachments/assets/97559b9b-fbd1-4730-8f5f-1dd7c1b25968" alt="템플릿 선택 화면" width="900"/>
    </td>
  </tr>
</table>

<br>


### 🔗 기본 정보 입력하기

> AI 이력서 생성을 위한 기본 정보를 입력합니다.<br/>
이름, 희망직무, 활동링크는 최소 1개 이상 입력이 필요합니다.<br/>
입력한 데이터에 따라 크롤링과 LLM 생성에 약 30초~3분 가량이 소요됩니다.


<table>
  <tr align="center">
    <td><strong>기본 정보 입력 폼</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img src="https://github.com/user-attachments/assets/24c96162-9e31-4c43-a097-f8d9cfa3c330" alt="기본정보입력 화면" width="900"/>
    </td>
  </tr>
</table>

<br>

### 🔗 이력서 수정하기

> 생성된 이력서를 기반으로 수정하며 더욱 완벽한 나만의 이력서를 완성합니다.<br/>
왼쪽에는 수정 폼, 오른쪽에는 선택한 템플릿이 적용된 프리뷰를 보여줍니다.<br/>
각 창의 사이즈를 조절할 수 있으며, 다른 템플릿을 적용해 볼 수 있습니다.

<table>
  <tr align="center">
    <td><strong>이력서 편집 화면</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img src="https://github.com/user-attachments/assets/41fe2a4d-094f-46e0-807e-c26126d41dd3" alt="이력서 편집 화면" width="900"/>
    </td>
  </tr>
</table>

<table>
  <tr align="center">
    <td><strong>템플릿 변경</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img src="https://github.com/user-attachments/assets/8499d83b-8ed4-4806-8022-6de7fc516b06" alt="프리뷰 템플릿 변경 화면" height="400"/>
    </td>
  </tr>
</table>

<br>

### 🔗 PDF & HTML 파일 다운로드

> 편집이 완료된 이력서를 버튼 클릭 한 번으로 빠르게 다운로드 받을 수 있습니다<br/>

<table>
  <tr align="center">
    <td><strong>파일 다운로드</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img src="https://github.com/user-attachments/assets/13e69e77-2f37-47e6-b06a-800d69ee5cfc" alt="pdf 다운화면" width="900"/>
    </td>
  </tr>
</table>

<br>

# 서비스 아키텍처

<br>

# 기술적 도전

<br>

# 기술 스택

- **언어 및 프레임워크**
    - Python 3.8 이상
    - FastAPI (웹 모드)
- **의존성 관리**
    - pip + virtualenv
- **버전 관리**
    - Git (GitHub 저장소에 호스팅)

<br>

# 실행 방법
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
