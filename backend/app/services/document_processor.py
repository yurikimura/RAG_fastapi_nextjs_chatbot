import os
import uuid
from typing import List
from langchain.document_loaders import PyPDFLoader, Docx2txtLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from app.db.vector_store import get_vector_store

class DocumentProcessor:
    def __init__(self):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
    
    def process_document(self, file_path: str) -> List[str]:
        # ファイル拡張子に基づいて適切なローダーを使用
        if file_path.endswith('.pdf'):
            loader = PyPDFLoader(file_path)
        elif file_path.endswith('.docx'):
            loader = Docx2txtLoader(file_path)
        else:
            raise ValueError("サポートされていないファイル形式です")
        
        # ドキュメントを読み込む
        documents = loader.load()
        
        # テキストを分割
        chunks = self.text_splitter.split_documents(documents)
        
        # ベクトルストアに保存
        vector_store = get_vector_store()
        vector_store.add_documents(chunks)
        
        return [chunk.page_content for chunk in chunks]