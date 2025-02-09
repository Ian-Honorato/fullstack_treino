 ## 🚀 Fullstack Treino 

Este é um projeto full stack desenvolvido com **Node.js, Express, Sequelize, MySQL** no backend e **React, Vite, TailwindCSS** no frontend.

## 📂 Estrutura do Projeto 

### 🖥️ Backend 
- **Tecnologias:** Node.js, Express, Sequelize, MySQL
- **Diretórios:**
  - `config/` - Configurações gerais do projeto (multer, database, url)
  - `Controllers/` - Controladores da aplicação
  - `database/` - Configuração do banco de dados - associações Model - Banco de dados
  - `Middlewares/` - Middlewares personalizados - controle de acesso
  - `migrations/` - Arquivos de migração do Sequelize
  - `Models/` - Modelos do banco de dados
  - `routes/` - Definição de rotas da API
  - `upload/` - Diretório para upload de arquivos

**Arquivos Importantes**
   - `app.js` -  ponto inicial da aplicação - centraliza a logica principal do servidor
   - `server.js` - configuração da porta do servidor
### 🎨 Frontend 
- **Tecnologias:** React, Vite, TailwindCSS
- **Diretórios:**
  - `assets/` - Recursos estáticos
  - `components/` - Componentes reutilizáveis
  - `pages/` - Páginas da aplicação
  - `Provider/` - Context API e gerenciamento de estado
  - `service/` - Serviços de comunicação com a API

## 🛠️ Configuração do Ambiente 

 ### 1️⃣ Backend 
1. Instale as dependências:
   ```sh
   cd backend
   npm install
   ```
2. Configure as variáveis de ambiente em `.env`:
   ```sh
  DATABASE = produtos
   DATABASE_HOST = 
   DATABASE_PORT = 
   DATABASE_USERNAME = 
   TOKEN_SECRET = 
   TOKEN_EXPIRATION =
   ```
3. Execute as migrações do banco de dados:
   ```sh
   npx sequelize db:migrate
   ```
4. Inicie o servidor:
   ```sh
   npm start
   ```
📍 O backend será iniciado em http://localhost:3000.
 ### 2️⃣ Frontend
1. Instale as dependências:
   ```sh
   cd frontend
   npm install
   ```
2. Inicie o servidor:
   ```sh
   npm run dev
   ```
📍 O frontend será iniciado em http://localhost:5173.

## 📌 Rotas da API
### Exemplo de Rotas (Backend)
- **Autenticação:**
  - `POST /login` - Autentica um usuário
- **Produtos:**
  - `GET /produtos` - Retorna todos os produtos
  - `GET /produtos/:id` - Retorna um produto especifico
  - `POST /produtos/store` - Cria um novo produto
  - `PUT /produtos/:id` - Atualiza um produto
  - `DELETE /produtos/:id` - Remove um produto
- **User:**
  - `POST /usuario/store` - Cria um novo usuário
  - `GET /usuarios` - Retorna todos usuários
  - `GET /usuarios/:id` - retorna um usuário
  - `PUT /usuario/:id` - Altera um usuário

## 🔧 Tecnologias Utilizadas
### Backend
- Node.js
- Express
- Sequelize
- MySQL
- Multer (para upload de arquivos)
- CORS

### Frontend
- React
- Vite
- TailwindCSS
- React Router Dom
- Axios

## 📝 Melhorias Futuras
-    **Backend:**
      - Implementar novas funcionalidades - Ex: controle de estoque, carrinho de compras
      - Estruturação do banco de dados: Relacionamentos entre usuários e produtos, garantindo integridade dos dados.
      - 
-    **Frontend:** 
      - Implementar controle de estoque
      - Criar um exemplo de carrinho de compras

## 🌟 Objetivos do Projeto
O principal objetivo deste projeto é desenvolver uma aplicação full stack completa, integrando um backend robusto com um frontend dinâmico e responsivo. 

   O projeto visa:

   - Criar uma API REST estruturada e escalável.
   - Gerenciar usuários e produtos de forma eficiente.
   - Implementar um frontend moderno utilizando React e TailwindCSS.
   - Aprimorar conhecimentos em autenticação, manipulação de banco de dados e boas práticas no desenvolvimento web.

## 🎯 Desafios do Projeto
Durante o desenvolvimento, alguns desafios foram enfrentados, como: 

   O projeto visa:

   - Autenticação de usuários: Implementação segura de tokens JWT e proteção de rotas.
   - Upload de arquivos: Configuração do Multer para armazenar imagens de produtos corretamente.
   - Integração frontend-backend: Garantir comunicação eficiente entre React e Node.js com CORS e requisições assíncronas.
     

## 📝 Contribuição
Se quiser contribuir, sinta-se à vontade, seria um prazer aprendermos juntos.







