from typing import List
from fastapi import FastAPI, HTTPException
from backend.data_model.career import Career
from backend.data_model.club import Club
from backend.data_model.education import Education
from backend.data_model.inputProfile import InputProfile
from backend.data_model.outputProfile import OutputProfile
from backend.data_model.project import Project
from backend.gemini_test import generate_profile, generate_profile_from_input
from backend.sample_data.output_data import profile_data
from backend.cors import add_cors_middleware


app = FastAPI(
    title="ddalkkak API", description="Portfolio result text API", version="1.0.0"
)

# CORS 미들웨어 추가
app = add_cors_middleware(app)


@app.get("/")
async def root():
    return {"message": "welcome to DDALKKAK API"}


@app.get("/api/resume", response_model=OutputProfile)
async def get_resume():
    return generate_profile()


@app.get("/api/profile", response_model=OutputProfile, tags=["프로필"])
async def get_profile():
    return profile_data


@app.get("/api/profile/projects", response_model=List[Project], tags=["프로필"])
async def get_projects():
    return profile_data["projects"]


@app.get("/api/profile/skills", response_model=List[str], tags=["프로필"])
async def get_skills():
    return profile_data["skills"]


@app.get("/api/profile/career", response_model=List[Career], tags=["프로필"])
async def get_career():
    return profile_data["career"]


@app.get("/api/profile/education", response_model=List[Education], tags=["프로필"])
async def get_education():
    return profile_data["education"]


@app.get("/api/profile/clubs", response_model=List[Club], tags=["프로필"])
async def get_clubs():
    return profile_data["clubs"]

@app.post("/api/profile", response_model=OutputProfile)
async def generate_profile_endpoint(profile: InputProfile):
    if not profile.activity_links:
        raise HTTPException(status_code=422, detail="활동 링크는 최소 하나 이상 입력해야 합니다.")
    return generate_profile_from_input(profile)

# 에러 헨들링
@app.get("/api/profile/{section}")
async def get_profile_section(section: str):
    if section in profile_data:
        return {section: profile_data[section]}

    raise HTTPException(
        status_code=404,
        detail=f"섹션 '{section}'을(를) 찾을 수 없습니다. 유효한 섹션: {', '.join(profile_data.keys())}",
    )

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
