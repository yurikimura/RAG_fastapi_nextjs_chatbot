'use client';

import { useState, useEffect } from 'react';
import ChatInterface from '../../components/ChatInterface';
import DocumentList from '../../components/DocumentList';
import Link from 'next/link';

export default function ChatPage() {
  const [documentsAvailable, setDocumentsAvailable] = useState(false);
  
  // ドキュメントが存在するか確認するための簡易チェック
  // 実際の実装では、APIエンドポイントを呼び出してドキュメントの存在を確認します
  useEffect(() => {
    const checkDocuments = async () => {
      try {
        // ここでAPIを呼び出してドキュメントの存在を確認
        // 例: const response = await fetch('/api/documents/list');
        // 例: setDocumentsAvailable(response.data.length > 0);
        
        // デモのため、仮の実装としてtrueに設定
        setDocumentsAvailable(true);
      } catch (error) {
        console.error('ドキュメント確認エラー:', error);
        setDocumentsAvailable(false);
      }
    };
    
    checkDocuments();
  }, []);
  
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">ドキュメント検索チャット</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">アップロード済みドキュメント</h2>
            <DocumentList />
            
            <div className="mt-4">
              <Link href="/upload" className="text-blue-600 hover:underline block text-center">
                新しいドキュメントをアップロード
              </Link>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {!documentsAvailable ? (
            <div className="bg-yellow-100 p-6 rounded-lg text-center">
              <p className="mb-4">ドキュメントがまだアップロードされていません。</p>
              <Link href="/upload" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                ドキュメントをアップロード
              </Link>
            </div>
          ) : (
            <ChatInterface />
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          ホームページに戻る
        </Link>
      </div>
    </main>
  );
}