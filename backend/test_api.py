from typing import List
from fastapi import FastAPI, HTTPException
from cors import add_cors_middleware
from model import ProfileResponse, Project, Career, Education, Club, UserProfile
from sample_data import profile_data

app = FastAPI(
    title= "ddalkkak API",
    description= "Portfolio result text API",
    version= "1.0.0"
)

# CORS 미들웨어 추가
app = add_cors_middleware(app)

@app.get("/")
async def root():
    return {"message": "프로필 API에 오신 것을 환영합니다"}


@app.get("/api/profile", response_model=ProfileResponse, tags=["프로필"])
async def get_profile():
    return profile_data


@app.get("/api/profile/projects", response_model=List[Project], tags=["프로필"])
async def get_projects():
    return profile_data["projects"]


@app.get("/api/profile/skillset", response_model=List[str], tags=["프로필"])
async def get_skillset():
    return profile_data["skillset"]


@app.get("/api/profile/career", response_model=List[Career], tags=["프로필"])
async def get_career():
    return profile_data["career"]


@app.get("/api/profile/education", response_model=List[Education], tags=["프로필"])
async def get_education():
    return profile_data["education"]


@app.get("/api/profile/clubs", response_model=List[Club], tags=["프로필"])
async def get_clubs():
    return profile_data["clubs"]


@app.post("/submit-profile")
async def submit_profile(profile: UserProfile):
    if not profile.activity_links:
        raise HTTPException(status_code=422, detail="활동 링크는 최소 하나 이상 입력해야 합니다.")

    return {
        "message": "사용자 프로필이 성공적으로 저장되었습니다.",
        "data": profile
    }

#에러 헨들링
@app.get("/api/profile/{section}")
async def get_profile_section(section: str):
    if section in profile_data:
        return {section: profile_data[section]}
    else:
        raise HTTPException(
            status_code=404,
            detail=f"섹션 '{section}'을(를) 찾을 수 없습니다. 유효한 섹션: {', '.join(profile_data.keys())}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
