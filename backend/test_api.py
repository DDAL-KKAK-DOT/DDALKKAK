"""
프로필 데이터를 제공하는 FastAPI 애플리케이션을 정의하는 모듈입니다.
"""

from typing import List
from fastapi import FastAPI, HTTPException
from cors import add_cors_middleware
from model import ProfileResponse, Project, Career, Education, Club
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
    """
    API 루트 경로입니다. 환영 메시지를 반환합니다.
    """
    return {"message": "프로필 API에 오신 것을 환영합니다"}


@app.get("/api/profile", response_model=ProfileResponse, tags=["프로필"])
async def get_profile():
    """
    사용자 프로필 전체 정보를 조회합니다.
    """
    return profile_data


@app.get("/api/profile/projects", response_model=List[Project], tags=["프로필"])
async def get_projects():
    """
    사용자의 프로젝트 목록만 조회합니다.
    """
    return profile_data["projects"]


@app.get("/api/profile/skillset", response_model=List[str], tags=["프로필"])
async def get_skillset():
    """
    사용자의 스킬셋 목록만 조회합니다.
    """
    return profile_data["skillset"]


@app.get("/api/profile/career", response_model=List[Career], tags=["프로필"])
async def get_career():
    """
    사용자의 경력 정보만 조회합니다.
    """
    return profile_data["career"]


@app.get("/api/profile/education", response_model=List[Education], tags=["프로필"])
async def get_education():
    """
    사용자의 교육 정보만 조회합니다.
    """
    return profile_data["education"]


@app.get("/api/profile/clubs", response_model=List[Club], tags=["프로필"])
async def get_clubs():
    """
    사용자의 동아리 활동 정보만 조회합니다.
    """
    return profile_data["clubs"]

#에러 헨들링
@app.get("/api/profile/{section}")
async def get_profile_section(section: str):
    """
    프로필의 특정 섹션 정보를 조회합니다.

    Args:
        section: 조회할 프로필 섹션 이름

    Returns:
        선택한 섹션의 데이터

    Raises:
        HTTPException: 해당 섹션이 존재하지 않을 경우
    """
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
