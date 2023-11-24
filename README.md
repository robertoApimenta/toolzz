# Construção de um Microsserviços de Gerenciamento de Usuários em Node.js

---

###### Clone esse projeto

`git clone https://github.com/robertoApimenta/toolzz.git`

###### Acesse o diretório ./toolzz

###### Instale as dependências

`npm install`

###### Renomeie o arquivo .env.example para .env

###### Nesse mesmo arquivo preencha com suas credenciais postgres (usuário e senha):

![1700836592213](image/README/1700836592213.png)

###### OBS: certifique-se de estar com o postgres rodando localmente na porta 5432, caso não tenha o mesmo instalado em sua máquina rode em um container docker utilize o comando abaixo:

`docker run --mypostgres -e POSTGRES_ROOT=user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

###### Rode o servidor:

`npm start`

###### Acesse as rotas da aplicação, para isso vc pode usar o arquivo exportado do insomnia, ele está na raiz do projeto.

Pra rodar os testes unitário rode o comando:

`npm test`
