import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.document_processor import DocumentProcessor
from typing import List

router = APIRouter(prefix="/documents", tags=["documents"])

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    # 一時ファイルの保存先
    temp_dir = "./data/temp"
    os.makedirs(temp_dir, exist_ok=True)
    
    # ドキュメント保存ディレクトリ
    docs_dir = "./data/documents"
    os.makedirs(docs_dir, exist_ok=True)
    
    # ファイル拡張子のチェック
    if not (file.filename.endswith('.pdf') or file.filename.endswith('.docx')):
        raise HTTPException(
            status_code=400,
            detail="PDFまたはDOCXファイルのみサポートしています"
        )
    
    # 一時ファイルパス
    temp_file_path = os.path.join(temp_dir, file.filename)
    
    try:
        # ファイルを一時ディレクトリに保存
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # ファイルを処理
        processor = DocumentProcessor()
        chunks = processor.process_document(temp_file_path)
        
        # 処理済みのファイルを保存ディレクトリに移動
        final_path = os.path.join(docs_dir, file.filename)
        shutil.move(temp_file_path, final_path)
        
        return {
            "filename": file.filename,
            "stored_path": final_path,
            "chunk_count": len(chunks)
        }
    
    except Exception as e:
        # エラーが発生した場合、一時ファイルを削除
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        raise HTTPException(status_code=500, detail=str(e))