from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from app.db.vector_store import get_vector_store
import os

class ChatService:
    def __init__(self):
        # OpenAI LLMの設定
        self.llm = ChatOpenAI(
            model_name="gpt-4",  # 予算に応じてgpt-3.5-turboも選択可能
            temperature=0,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        
        # 会話メモリの設定
        self.memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )
        
        # ベクトルストアの取得
        self.vector_store = get_vector_store()
        
        # RAGチェーンの構築
        self.chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=self.vector_store.as_retriever(),
            memory=self.memory
        )
    
    async def get_response(self, query: str) -> str:
        # クエリに基づいて回答を生成
        response = self.chain({"question": query})
        return response["answer"]