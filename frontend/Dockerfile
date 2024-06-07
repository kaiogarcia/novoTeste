# frontend/Dockerfile

# Use uma imagem base oficial do Node.js
FROM node:16

# Copie o package.json e yarn.lock para o diretório /frontend do container
COPY package.json yarn.lock /frontend/

# Defina o diretório de trabalho para /frontend
WORKDIR /frontend

# Instale as dependências
RUN yarn install

# Copie o restante do código do aplicativo para /frontend
COPY . /frontend/

# Compile a aplicação
RUN yarn build

# Instale o servidor web para servir a aplicação compilada
RUN yarn global add serve

# Exponha a porta que o servidor web irá utilizar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["serve", "-s", "build", "-l", "3000"]
