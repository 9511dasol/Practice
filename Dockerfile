# -------- builder --------
    FROM node:20.19-alpine AS builder
    WORKDIR /app
    
    COPY package.json package-lock.json ./
    RUN npm ci
    
    COPY . .
    RUN npm run build
    
    # -------- runner (standalone) --------
    FROM node:20.19-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    
    # standalone 결과물만 복사 (여기 안에 server.js + 필요한 node_modules가 최소로 포함됨)
    COPY --from=builder /app/.next/standalone ./
    
    # 정적 파일은 별도로 필요
    COPY --from=builder /app/.next/static ./.next/static
    COPY --from=builder /app/public ./public
    
    EXPOSE 3000
    
    # "npm start" 원하면 package.json의 start를 node server.js로 맞추면 됨
    # (추천: CMD는 node server.js로 바로 실행)
    CMD ["node", "server.js"]