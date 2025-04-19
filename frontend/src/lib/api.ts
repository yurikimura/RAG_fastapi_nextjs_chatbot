// APIクライアント関数

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'ファイルのアップロードに失敗しました');
  }

  return await response.json();
};

export const sendChatMessage = async (message: string) => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'メッセージの送信に失敗しました');
  }

  return await response.json();
};