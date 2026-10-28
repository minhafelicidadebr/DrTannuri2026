# Imagem base oficial leve do Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia código e realiza o build
COPY . .
RUN npm run build

# Estágio de produção
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# Porta padrão do Cloud Run
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/server.cjs"]
