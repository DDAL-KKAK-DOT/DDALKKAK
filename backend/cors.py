"""
CORS 미들웨어를 제공하는 모듈입니다.
"""

from fastapi.middleware.cors import CORSMiddleware

def add_cors_middleware(app):
    """
    CORS 미들웨어를 FastAPI 애플리케이션에 추가합니다.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # 실제 배포 시에는 특정 도메인으로 제한하세요
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
