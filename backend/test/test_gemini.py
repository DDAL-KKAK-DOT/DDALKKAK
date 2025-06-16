import json
from types import SimpleNamespace

from backend import gemini_client


# ----------------------------------------------------------------------
# 헬퍼: Gemini 호출·결과를 흉내 내는 Stub 객체
# ----------------------------------------------------------------------
class _DummyResp:
    def __init__(self, data: dict):
        self.text = json.dumps(data)  # gemini_test 코드가 .text를 사용


def _fake_generate_content(*_, **__):
    """
    gemini_test.genai_client.models.generate_content 를 대신할 가짜 함수.
    호출 파라미터 검증은 필요하다면 여기에 추가하면 됨.
    """
    fake_json = {
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
    return _DummyResp(fake_json)


# ----------------------------------------------------------------------
# 1) build_resume_prompt가 fetch_page_text를 URL 수 만큼 호출하는지 검증
# ----------------------------------------------------------------------
def test_build_resume_prompt_invokes_fetch(monkeypatch):
    called = []

    def _fake_fetch(url):
        called.append(url)
        return f"{url} - dummy page text"

    monkeypatch.setattr(gemini_client, "fetch_page_text", _fake_fetch)

    dummy_profile = {
        "name": "홍길동",
        "email": "hong@example.com",
        "phone": "010-1234-5678",
        "educations": "중앙대학교",
        "skills": [],
    }
    urls = ["https://a.com", "https://b.com"]
    prompt = gemini_client.build_resume_prompt(dummy_profile, urls)

    # fetch가 두 번 호출됐는지
    assert called == urls
    # 반환된 프롬프트에 URL · dummy text가 포함됐는지
    for url in urls:
        assert url in prompt
        assert "dummy page text" in prompt


# ----------------------------------------------------------------------
# 2) generate_profile_from_input이 정상적으로 OutputProfile을 반환하는지 검증
#    - 외부 API 호출(genai)과 fetch_page_text를 모두 패치
# ----------------------------------------------------------------------
def test_generate_profile_from_input(monkeypatch):
    # 2-1) Gemini API 가짜로 대체
    monkeypatch.setattr(
        gemini_client.genai_client.models,
        "generate_content",
        _fake_generate_content,
    )

    # 2-2) fetch_page_text도 간단히 패치
    monkeypatch.setattr(
        gemini_client, "fetch_page_text", lambda url: "dummy page text"
    )

    # 2-3) OutputProfile을 Pydantic 대신 단순 네임스페이스로 패치
    #      (스키마 검사까지 하고 싶다면 실제 모델을 써도 무방)
    class _DummyOut:
        def __init__(self, **kw):
            self.__dict__.update(kw)

    monkeypatch.setattr(gemini_client, "OutputProfile", _DummyOut)

    # 2-4) 최소한의 InputProfile 스텁
    dummy_input = SimpleNamespace(
        name="홍길동",
        contact="hong@example.com",
        educations=["중앙대학교"],
        activity_links=["https://a.com"],
    )

    result = gemini_client.generate_profile_from_input(dummy_input)

    # 결과 객체가 _DummyOut이며 핵심 필드가 존재하는지 확인
    assert isinstance(result, _DummyOut)
    assert result.profileInfo["name"] == "홍길동"
    assert result.skills == ["Python 상"]
