from pathlib import Path
from typing import List

from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.responses import FileResponse

from backend.cors import add_cors_middleware
from backend.data_model.career import Career
from backend.data_model.club import Club
from backend.data_model.education import Education
from backend.data_model.inputProfile import InputProfile
from backend.data_model.outputProfile import OutputProfile
from backend.data_model.project import Project
from backend.gemini_client import generate_profile, generate_profile_from_input
from backend.sample_data.output_data import profile_data
from backend.utils_convert import convert_html_to_pdf_logic

app = FastAPI(
    title="ddalkkak API", description="Portfolio result text API", version="1.0.0"
)

# CORS 미들웨어 추가
app = add_cors_middleware(app)

PDF_OUTPUT_DIR = Path(__file__).parent / "generated_pdfs"
PDF_OUTPUT_DIR.mkdir(exist_ok=True)


@app.get("/")
async def root():
    return {"message": "welcome to DDALKKAK API"}


@app.get("/api/resume", response_model=OutputProfile)
async def get_resume():
    return generate_profile()


@app.get("/api/profile/profileInfo", response_model=InputProfile, tags=["프로필"])
async def get_profile():
    return profile_data["profileInfo"]


@app.get("/api/profile/projects", response_model=List[Project], tags=["프로필"])
async def get_projects():
    return profile_data["projects"]


@app.get("/api/profile/skills", response_model=List[str], tags=["프로필"])
async def get_skills():
    return profile_data["skills"]


@app.get("/api/profile/career", response_model=List[Career], tags=["프로필"])
async def get_career():
    return profile_data["careers"]


@app.get("/api/profile/education", response_model=List[Education], tags=["프로필"])
async def get_education():
    return profile_data["educations"]


@app.get("/api/profile/clubs", response_model=List[Club], tags=["프로필"])
async def get_clubs():
    return profile_data["clubs"]


@app.post("/api/profile", response_model=OutputProfile)
async def generate_profile_endpoint(profile: InputProfile):
    if not profile.activity_links:
        raise HTTPException(status_code=422, detail="활동 링크는 최소 하나 이상 입력해야 합니다.")
    return generate_profile_from_input(profile)


@app.post("/api/convert/html-to-pdf", tags=["유틸리티"])
async def convert_html_to_pdf(html_file: UploadFile = File(...)):
    pdf_path = convert_html_to_pdf_logic(html_file, PDF_OUTPUT_DIR)
    return FileResponse(
        path=str(pdf_path),
        media_type="application/pdf",
        filename=Path(pdf_path).stem + ".pdf"
    )


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
