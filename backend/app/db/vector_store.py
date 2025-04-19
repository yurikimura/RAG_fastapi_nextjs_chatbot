from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
import os

# 環境変数からOpenAI APIキーを取得
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def get_vector_store():
    # OpenAI埋め込みモデルを使用
    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    
    # ChromaDBベクトルストア
    vector_store = Chroma(
        collection_name="document_collection",
        embedding_function=embeddings,
        persist_directory="./data/chroma_db"
    )
    
    return vector_store