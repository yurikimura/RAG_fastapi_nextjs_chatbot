# ビルドステージ
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
RUN npm install
COPY . .
RUN npm run build

# 実行ステージ
FROM node:18-alpine
WORKDIR /app
# ビルドステージからビルド結果をコピー
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

EXPOSE 3000
CMD ["npm", "run", "start"]