# Use uma imagem do Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /frontend

# Copie os arquivos de configuração e dependências
COPY package.json yarn.lock ./

# Instale as dependências
RUN yarn install

# Copie o restante dos arquivos do aplicativo
COPY . .

# Comando para compilar e iniciar o aplicativo
CMD ["yarn", "start"]
