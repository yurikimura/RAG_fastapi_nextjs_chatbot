export const metadata = {
    title: '社内ドキュメント検索チャット',
    description: 'チャット形式で社内ドキュメントを検索できるWebアプリケーション',
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="ja">
        <body>{children}</body>
      </html>
    )
  }