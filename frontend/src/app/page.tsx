import FileUpload from '../components/FileUpload';
import ChatInterface from '../components/ChatInterface';
import DocumentList from '../components/DocumentList';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">社内ドキュメント検索チャット</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <FileUpload />
          <div className="mt-8">
            <DocumentList />
          </div>
        </div>
        <div>
          <ChatInterface />
        </div>
      </div>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>社内ドキュメント検索チャット © {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}