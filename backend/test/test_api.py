import json
from fastapi.testclient import TestClient

from backend import service

# ------------------------------------------------------------------
# 공통: 테스트 클라이언트와 더미 OutputProfile JSON
# ------------------------------------------------------------------
client = TestClient(service.app)

_stub_output = {
    "profileInfo": {
        "name": "홍길동",
        "english_name": "Hong Gil-dong",
        "educations": ["중앙대학교"],
        "desired_role": "백엔드 개발자",
        "contact": "hong@example.com",
        "activity_links": [],
    },
    "shortIntro": "책임감 있는 개발자입니다!",
    "skills": ["Python 상"],
    "projects": [],
    "careers": [],
    "educations": [],
    "clubs": [],
}


# ------------------------------------------------------------------
# 1) 루트 엔드포인트
# ------------------------------------------------------------------
def test_root():
    resp = client.get("/")
    assert resp.status_code == 200
    assert resp.json() == {"message": "welcome to DDALKKAK API"}


# ------------------------------------------------------------------
# 2) /api/resume – Gemini 호출을 스텁으로 대체
# ------------------------------------------------------------------
def test_get_resume(monkeypatch):
    monkeypatch.setattr(service, "generate_profile", lambda: _stub_output)

    resp = client.get("/api/resume")
    assert resp.status_code == 200
    assert resp.json()["profileInfo"]["name"] == "홍길동"


# ------------------------------------------------------------------
# 3) /api/profile – 샘플 데이터 반환 확인
# ------------------------------------------------------------------
def test_get_profile():
    resp = client.get("/api/profile")
    assert resp.status_code == 200
    # 프로젝트·스킬 키 존재 여부만 간단 확인
    body = resp.json()
    assert "projects" in body and "skills" in body


# ------------------------------------------------------------------
# 4) /api/profile/{section} – 잘못된 섹션 요청 시 404
# ------------------------------------------------------------------
def test_invalid_section():
    resp = client.get("/api/profile/nonexistent")
    assert resp.status_code == 404
    assert "찾을 수 없습니다" in resp.json()["detail"]


# ------------------------------------------------------------------
# 5) POST /api/profile – 링크 누락 422, 정상 호출 200
# ------------------------------------------------------------------
def test_generate_profile_endpoint(monkeypatch):
    # 5-1) 활동 링크 없을 때 422
    bad_payload = {
        "name": "홍길동",
        "contact": "hong@example.com",
        "educations": [],
        "activity_links": []
    }
    resp = client.post("/api/profile", json=bad_payload)
    assert resp.status_code == 422

    # 5-2) 정상 케이스 – Gemini 호출 스텁
    monkeypatch.setattr(service, "generate_profile_from_input",
                        lambda _: _stub_output)

    good_payload = {
        "name": "홍길동",
        "contact": "hong@example.com",
        "educations": [],
        "activity_links": ["https://example.com"]
    }
    resp = client.post("/api/profile", json=good_payload)
    assert resp.status_code == 200
    assert resp.json()["skills"] == ["Python 상"]
