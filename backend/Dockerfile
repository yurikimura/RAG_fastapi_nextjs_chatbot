# Python 3.10をベースイメージとして使用
FROM python:3.10-slim

# 作業ディレクトリを設定
WORKDIR /app

# 必要なパッケージをインストールするためのrequirements.txtをコピー
COPY requirements.txt .

# システムパッケージの更新とPythonパッケージのインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    && pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# アプリケーションコードをコピー
COPY . .

# データディレクトリが存在することを確認
RUN mkdir -p /app/data/documents /app/data/temp /app/data/chroma_db

# コンテナが公開するポートを指定
EXPOSE 8000

# アプリケーションの起動コマンド
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]