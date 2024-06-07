# backend/Dockerfile

# Use uma imagem base oficial do Node.js
FROM node:16

# Copie o package.json e yarn.lock para o diretório /backend do container
COPY package.json yarn.lock /backend/

# Defina o diretório de trabalho para /backend
WORKDIR /backend

# Instale as dependências
RUN yarn install

# Copie o restante do código do aplicativo para /backend
COPY . /backend/

# Compile o TypeScript
RUN yarn build

# Gere o Prisma Client
RUN npx prisma generate

# Exponha a porta que a aplicação utiliza
EXPOSE 4000

# Comando para rodar a aplicação
CMD ["node", "dist/server.js"]
