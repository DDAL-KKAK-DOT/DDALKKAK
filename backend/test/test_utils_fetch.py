import backend.utils_fetch as uf  # 실제 모듈 경로에 맞게 수정

URL = "https://example.com"


# ------------------------------------------------------------------
# 1) 정적 파싱이 충분히 길면 동적 파싱을 호출하지 않는다
# ------------------------------------------------------------------
def test_static_branch(monkeypatch):
    uf.fetch_page_text.cache_clear()

    long_text = "S" * (uf.MAX_CHARS + 200)  # 5 000자 초과
    dynamic_called = {"cnt": 0}

    monkeypatch.setattr(uf, "_static_fetch", lambda _: long_text)
    monkeypatch.setattr(uf, "_dynamic_fetch",
                        lambda _: dynamic_called.update(cnt=dynamic_called["cnt"] + 1))

    result = uf.fetch_page_text(URL)

    assert result == long_text[:uf.MAX_CHARS]  # 5 000자로 잘림
    assert dynamic_called["cnt"] == 0  # _dynamic_fetch 미호출


# ------------------------------------------------------------------
# 2) 정적 파싱이 짧으면 동적 파싱으로 넘어간다
# ------------------------------------------------------------------
def test_dynamic_fallback(monkeypatch):
    uf.fetch_page_text.cache_clear()

    dynamic_text = "D" * (uf.MAX_CHARS + 10)
    dynamic_called = {"cnt": 0}

    monkeypatch.setattr(uf, "_static_fetch", lambda _: "short")  # 200자 미만

    def _fake_dynamic(_):
        dynamic_called["cnt"] += 1
        return dynamic_text

    monkeypatch.setattr(uf, "_dynamic_fetch", _fake_dynamic)

    result = uf.fetch_page_text(URL)

    assert result == dynamic_text[:uf.MAX_CHARS]  # 5 000자로 잘림
    assert dynamic_called["cnt"] == 1  # 정확히 한 번 호출


# ------------------------------------------------------------------
# 3) lru_cache가 동일 URL 재호출을 막는지 확인
# ------------------------------------------------------------------
def test_lru_cache(monkeypatch):
    uf.fetch_page_text.cache_clear()

    # 1) 200자 이상 텍스트를 만들어 줌
    long_text = "S" * (uf.STATIC_THRESHOLD + 10)   # 210자

    monkeypatch.setattr(uf, "_static_fetch", lambda _: long_text)
    monkeypatch.setattr(uf, "_dynamic_fetch", lambda _: "should not run")

    first = uf.fetch_page_text(URL)

    # 2) static/dynamic을 바꿔도 캐시된 값이 유지돼야 함
    monkeypatch.setattr(uf, "_static_fetch", lambda _: "NEW")
    second = uf.fetch_page_text(URL)

    assert first == second == long_text[:uf.MAX_CHARS]
    assert uf.fetch_page_text.cache_info().hits == 1

