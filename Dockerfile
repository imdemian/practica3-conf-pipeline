FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

# Copiar solo las carpetas necesarias de la app
COPY app.js .
COPY bin/ bin/
COPY routes/ routes/
COPY public/ public/
COPY lib/ lib/

EXPOSE 3000

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "./bin/www"]