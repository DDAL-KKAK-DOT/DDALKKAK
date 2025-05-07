# utils_fetch.py
import functools
import requests

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout
from readability import Document

UA = {"User-Agent": "Mozilla/5.0"}

MAX_CHARS = 5000  # 이 정도면 1500토큰 ≈ LLM에 넣기 안전
TIMEOUT = 20000  # ms (Playwright)


# ─────────────────── 캐시 ───────────────────
@functools.lru_cache(maxsize=256)
def fetch_page_text(url: str) -> str:
    txt = _static_fetch(url)
    if len(txt) >= 200:  # 200자 넘으면 본문 확보 성공
        return txt[:MAX_CHARS]
    return _dynamic_fetch(url)[:MAX_CHARS]


# ─────────────────── 1) requests + Readability ───────────────────
def _static_fetch(url: str) -> str:
    try:
        res = requests.get(url, timeout=8, headers=UA)
        res.raise_for_status()
        doc = Document(res.text)
        cleaned_html = doc.summary()
        return BeautifulSoup(cleaned_html, "html.parser").get_text(separator=" ", strip=True)
    except Exception:
        return ""


# ─────────────────── 2) Playwright 렌더링 ───────────────────
def _dynamic_fetch(url: str) -> str:
    try:
        with sync_playwright() as pw:
            br = pw.chromium.launch(headless=True)
            pg = br.new_page()
            pg.goto(url, wait_until="domcontentloaded", timeout=TIMEOUT)

            # Notion 같은 lazy 페이지: 끝까지 스크롤
            if "notion.site" in url:
                pg.evaluate("""
                    () => new Promise(r=>{
                        let p=0; const s=()=>{window.scrollBy(0,1000);
                        if(document.documentElement.scrollTop!==p){p=document.documentElement.scrollTop;requestAnimationFrame(s);}
                        else r();}; s();})
                """)

            # 가장 긴 텍스트를 뽑기 위한 셀렉터 여러 개
            sel = ["div.notion-text", "article", "main", ".markdown-body", "body"]
            blocks = []
            for css in sel:
                try:
                    blocks.extend(pg.locator(css).all_inner_texts())
                except PWTimeout:
                    pass
            br.close()
        return "\n".join(blocks).strip()
    except Exception:
        return ""
