# Projeto de Gestão de Produtos

Este projeto é uma aplicação web para gerenciamento de produtos, permitindo a criação, edição, listagem e exclusão de produtos. Ele é composto por uma API construída com FastAPI e um frontend desenvolvido em React, integrados para fornecer uma experiência completa e funcional.

## Funcionalidades Implementadas

### Backend (API - FastAPI)
1. **Criação de Produtos**:
   - Upload de imagem do produto.
   - Validação de campos obrigatórios.
   - Verificação de duplicidade de EAN (apresenta erro caso já exista).
2. **Edição de Produtos**:
   - Atualização dos campos do produto, ignorando valores nulos.
3. **Listagem de Produtos**:
   - Paginação de resultados.
4. **Exclusão de Produtos**.
5. **Validação de Dados**:
   - Campos obrigatórios como `name`, `ean`, `price`, etc.
   - Validação do formato de EAN.
6. **Mensagens Personalizadas**:
   - Mensagem específica ao tentar cadastrar um EAN duplicado.
7. **Status e Local de Venda**:
   - Campo de status com valores "Ativo" e "Desativado".
   - Campo "Local de Venda" com opções "Evento" e "Loja".

### Frontend (React)
1. **Tela de Listagem de Produtos**:
   - Exibição paginada dos produtos.
   - Botões para editar e excluir produtos.
2. **Tela de Adição de Produto**:
   - Formulário para cadastrar novo produto.
   - Upload de imagem.
   - Validação e exibição de mensagens de erro via Toast.
3. **Tela de Edição de Produto**:
   - Formulário pré-preenchido com dados do produto.
   - Permite atualização de campos específicos.
4. **Mensagens e Feedback**:
   - Toasts de sucesso e erro para ações realizadas.
5. **Configuração de Rotas**:
   - Rotas definidas para as páginas principais: listagem, adição e edição.

## Tecnologias Utilizadas

### Backend
- **Linguagem**: Python
- **Framework**: FastAPI
- **Banco de Dados**: PostgreSQL
- **Docker**: Para containerização da aplicação.
- **Outras Bibliotecas**: SQLAlchemy, Pydantic, Uvicorn.

### Frontend
- **Linguagem**: TypeScript
- **Framework**: React
- **Bibliotecas**: Axios, React Router, React Toastify.

### Arquitetura
- Arquitetura baseada em serviços separados para API e frontend.
- Banco de dados em container separado, gerenciado por PostgreSQL.
- Backend segue princípios de boas práticas com separação entre serviços e arquitetura limpa DDD.

## Como Rodar o Projeto

### Backend (API - FastAPI)

1. **Pré-requisitos**:
   - Docker e Docker Compose instalados.

2. **Configuração do `.env`**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   POSTGRES_USER=seu_usuario
   POSTGRES_PASSWORD=sua_senha
   POSTGRES_DB=nome_do_banco
   DATABASE_URL=postgresql://seu_usuario:sua_senha@db:5432/nome_do_banco
   ```

3. **Subindo o Backend com Docker**:
   Execute o comando:
   ```bash
   docker-compose up --build
   ```
   A API estará disponível em: [http://localhost:8000](http://localhost:8000)

4. **Documentação da API**:
   Acesse [http://localhost:8000/docs](http://localhost:8000/docs) para visualizar e interagir com a documentação gerada automaticamente pelo Swagger.

### Frontend (React)

1. **Pré-requisitos**:
   - Node.js e npm instalados.

2. **Instalando as Dependências**:
   Na pasta do frontend, execute:
   ```bash
   npm install
   ```

3. **Rodando o Frontend**:
   Execute o comando:
   ```bash
   npm start
   ```
   A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)


