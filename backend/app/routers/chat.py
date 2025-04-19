from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest):
    chat_service = ChatService()
    response = await chat_service.get_response(request.message)
    return ChatResponse(response=response)