'use client';

import { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const handleUploadSuccess = () => {
    setUploadComplete(true);
    // 3秒後にホームページにリダイレクト
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };
  
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">ドキュメントのアップロード</h1>
      
      <div className="max-w-md mx-auto">
        <FileUpload onSuccess={handleUploadSuccess} />
        
        {uploadComplete && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
            アップロードが完了しました。3秒後にホームページにリダイレクトします...
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ホームページに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}