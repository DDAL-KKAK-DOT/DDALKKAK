![readmeheader](https://github.com/user-attachments/assets/c49c5c44-6d00-4490-9d5e-a70ce547d97a)
---

> ### 목차
> [1. 🚀 서비스 배포 링크](#-서비스-배포-링크) <br>
> [2. 💡 기획 배경](#-기획-배경) <br>
> [3. 📋 핵심 기능](#-핵심-기능) <br>
> [4. ⚙️ 서비스 아키텍처](#-서비스-아키텍처) <br>
> [5. 💻 실행 방법](#-실행-방법) <br>
> [6. 📃 라이선스](#-라이선스) <br>

<br/>

# 🚀 서비스 배포 링크

>https://ddalkkak.vercel.app/

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
      <img src="https://github.com/user-attachments/assets/3b6fd7c5-aa97-453d-8193-b0e21474c782" alt="메인 랜딩 페이지" width="1000"/>
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
      <img src="https://github.com/user-attachments/assets/97559b9b-fbd1-4730-8f5f-1dd7c1b25968" alt="템플릿 선택 화면" width="1000"/>
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
      <img src="https://github.com/user-attachments/assets/24c96162-9e31-4c43-a097-f8d9cfa3c330" alt="기본정보입력 화면" width="1000"/>
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
      <img src="https://github.com/user-attachments/assets/41fe2a4d-094f-46e0-807e-c26126d41dd3" alt="이력서 편집 화면" width="1000"/>
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
      <img src="https://github.com/user-attachments/assets/13e69e77-2f37-47e6-b06a-800d69ee5cfc" alt="pdf 다운화면" width="1000"/>
    </td>
  </tr>
</table>

<br>

# ⚙️ 서비스 아키텍처

```mermaid
flowchart TD

%% 사용자
User[사용자 브라우저]

%% FastAPI 서버
subgraph FastAPI
  App[FastAPI 애플리케이션]
  Middleware[CORS 미들웨어]
  Validate[InputProfile 유효성 검사]
  RoutePost[POST /api/profile]
  RouteGet[GET /api/resume]
  Gemini[Gemini API 호출]
  Prompt[프롬프트 생성 및 텍스트 수집]
  Verify[OutputProfile 파싱 및 검증]
end

%% 텍스트 수집 유틸
subgraph TextFetch
  Fetch[fetch_page_text]
  Static[정적 파싱 with readability]
  Dynamic[동적 파싱 with Selenium]
end

%% PDF 변환 모듈
subgraph PDF
  UploadHTML[HTML 업로드]
  GeneratePDF[PDF 변환 처리]
end

%% 데이터 모델
subgraph DataModel
  Input[InputProfile]
  Output[OutputProfile]
  Units[Career, Project, Club, Education]
end

%% 전체 흐름
User -->|입력 제출| RoutePost
RoutePost --> Middleware --> App
App --> Validate --> Prompt
Prompt --> Fetch --> Static
Fetch --> Dynamic
Prompt --> Gemini --> Verify --> App
App -->|OutputProfile 반환| User

User --> UploadHTML --> GeneratePDF --> User

Validate --> Input
Verify --> Output --> Units
```

<br/>

# 💻 실행 방법


## 1️⃣ 사전 요구사항

1. **Python 3.8 이상 설치**
2. **가상환경 설정 권장**

    ```bash
    python -m venv .venv
    source .venv/bin/activate    # macOS/Linux
    .venv\\Scripts\\activate       # Windows
    
    ```


---

## 2️⃣ 설치 방법

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

## 3️⃣ 설정

1. **환경 변수 설정 (선택 사항)**
    - PDF 엔진 경로, 템플릿 디렉토리 경로 등을 `.env` 파일에 정의하세요.
    - 예시 (`.env`):

        ```
        GEMINI_API_KEY="YOUR_API_KEY"
        ```

---

## 4️⃣ 사용 방법

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

## 5️⃣ 샘플 입력 및 출력

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
<br/>

# 📃 라이선스

이 프로젝트는 [MIT 라이선스](https://www.notion.so/nasanghyun/LICENSE)를 따릅니다. 자유롭게 사용, 수정, 배포가 가능합니다.

<br/>
