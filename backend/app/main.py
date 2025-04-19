from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import documents, chat

app = FastAPI(title="社内ドキュメント検索API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境では適切に制限してください
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents.router)
app.include_router(chat.router)

@app.get("/")
async def root():
    return {"message": "ドキュメント検索APIへようこそ"}