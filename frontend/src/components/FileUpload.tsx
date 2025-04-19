'use client';

import { useState } from 'react';
import { uploadDocument } from '../lib/api';

type FileUploadProps = {
  onSuccess?: () => void;  // オプショナルの成功コールバック
};

export default function FileUpload({ onSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setMessage('');

    try {
      const result = await uploadDocument(file);
      setMessage(`ファイル "${result.filename}" がアップロードされました。${result.chunk_count} チャンクが処理されました。`);
      setFile(null);
      
      // 成功コールバックが提供されていれば呼び出す
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setMessage(`エラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">ドキュメントをアップロード</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ファイルを選択 (PDF または DOCX)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={!file || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md
            hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'アップロード中...' : 'アップロード'}
        </button>
      </form>
      {message && (
        <div className={`mt-4 p-3 rounded ${message.includes('エラー') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
}