import functools
import os
import platform
import shutil
import time

import requests
from bs4 import BeautifulSoup
from readability import Document
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

UA = {"User-Agent": "Mozilla/5.0"}
MAX_CHARS = 5000  # 최대 5000자 (≈1500 토큰)
STATIC_THRESHOLD = 200  # 정적 파싱으로 충분한 텍스트 길이 기준


@functools.lru_cache(maxsize=256)
def fetch_page_text(url: str) -> str:
    """
    URL의 본문 텍스트를 가져옵니다.
    - 정적 파싱으로 200자 이상이면 반환
    - 그렇지 않으면 Selenium 동적 렌더링으로 본문 전체 추출
    """
    txt = _static_fetch(url)
    if len(txt) >= STATIC_THRESHOLD:
        return txt[:MAX_CHARS]
    return _dynamic_fetch(url)[:MAX_CHARS]


def _static_fetch(url: str) -> str:
    """
    requests + readability로 주요 콘텐츠만 요약 추출
    """
    res = requests.get(url, timeout=8, headers=UA)
    doc = Document(res.text)
    cleaned_html = doc.summary()
    return BeautifulSoup(cleaned_html, "html.parser").get_text(strip=True)


def _select_driver(options: Options) -> Service:
    arch = platform.machine()
    if arch in ("aarch64", "arm64"):
        snap_drv = "/snap/bin/chromium.chromedriver"
        snap_bin = "/snap/chromium/current/command-chromium.wrapper"
        if os.path.exists(snap_drv) and os.path.exists(snap_bin):
            options.binary_location = snap_bin
            return Service(snap_drv)
        alt = shutil.which("chromedriver")
        if alt:
            return Service(alt)
    return Service(ChromeDriverManager().install())


def _dynamic_fetch(url: str) -> str:
    """
    Selenium을 사용해 JS 렌더링 후 전체 <body> 텍스트를 수집
    """
    # Chrome 옵션 설정
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(f'user-agent={UA["User-Agent"]}')

    driver = webdriver.Chrome(service=_select_driver(options), options=options)

    try:
        driver.get(url)
        time.sleep(2)
        last_height = driver.execute_script("return document.body.scrollHeight")
        while True:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height
        text = driver.find_element("tag name", "body").text
    finally:
        driver.quit()

    return text.strip()
