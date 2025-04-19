'use client';

import { useState, useEffect } from 'react';
import { FaFile, FaFilePdf, FaFileWord } from 'react-icons/fa';

type Document = {
  id: string;
  filename: string;
  uploadDate: string;
  fileType: string;
};

export default function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ドキュメント一覧を取得する関数
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        // 本来はAPIエンドポイントからデータを取得
        // ここではモックデータを使用
        const response = await fetch('/api/documents');
        
        // デモのためのフォールバック（APIが実装されていない場合）
        if (!response.ok) {
          // モックデータ
          const mockDocuments: Document[] = [
            {
              id: '1',
              filename: '会社規則.pdf',
              uploadDate: '2025-04-15',
              fileType: 'pdf'
            },
            {
              id: '2',
              filename: '営業マニュアル.docx',
              uploadDate: '2025-04-16',
              fileType: 'docx'
            },
            {
              id: '3',
              filename: '社内連絡事項.pdf',
              uploadDate: '2025-04-18',
              fileType: 'pdf'
            }
          ];
          setDocuments(mockDocuments);
        } else {
          const data = await response.json();
          setDocuments(data);
        }
      } catch (err) {
        console.error('ドキュメント取得エラー:', err);
        setError('ドキュメントの読み込み中にエラーが発生しました');
        
        // エラー時のデモデータ
        const mockDocuments: Document[] = [
          {
            id: '1',
            filename: '会社規則.pdf',
            uploadDate: '2025-04-15',
            fileType: 'pdf'
          },
          {
            id: '2',
            filename: '営業マニュアル.docx',
            uploadDate: '2025-04-16',
            fileType: 'docx'
          }
        ];
        setDocuments(mockDocuments);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // ファイル形式に基づいてアイコンを選択
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" />;
      case 'docx':
        return <FaFileWord className="text-blue-500" />;
      default:
        return <FaFile className="text-gray-500" />;
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">ドキュメントを読み込み中...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        アップロードされたドキュメントはありません
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">アップロード済みドキュメント</h2>
      <ul className="divide-y divide-gray-200">
        {documents.map((doc) => (
          <li key={doc.id} className="py-3 flex items-center">
            <div className="mr-3">
              {getFileIcon(doc.fileType)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{doc.filename}</p>
              <p className="text-sm text-gray-500">
                アップロード日: {doc.uploadDate}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}