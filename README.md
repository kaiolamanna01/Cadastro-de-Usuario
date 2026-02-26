# CRUD de Usuários — Spring Boot + React

Projeto fullstack de cadastro de usuários desenvolvido em **Java com Spring Boot** no backend e **React com Vite** no frontend, implementando operações CRUD (Create, Read, Update e Delete) através de uma API REST.

---

## 📌 Descrição

Esta aplicação permite o gerenciamento de usuários por meio de uma interface web moderna integrada a uma API REST.

O projeto evoluiu para incluir **autenticação segura com JWT** e **persistência em banco de dados PostgreSQL em produção**.

Foi desenvolvido com o objetivo de praticar:

* Arquitetura em camadas
* API REST
* Spring Boot
* JPA/Hibernate
* Autenticação com JWT
* Banco de dados relacional (PostgreSQL)
* Integração frontend/backend
* Componentização com React
* Consumo de APIs com Fetch

---

## 🔐 Autenticação e Segurança

Foi implementada uma **tela de login** para autenticação de usuários:

👉 **Login:**
[https://frontend-cadastro-production.up.railway.app/login](https://frontend-cadastro-production.up.railway.app/login)

### 🛡 Autenticação com JWT (JSON Web Token)

A aplicação utiliza **JWT** para controle de acesso e segurança da API.

Fluxo de autenticação:

1. O usuário realiza login informando suas credenciais.
2. O backend valida os dados.
3. Um **token JWT** é gerado e retornado ao frontend.
4. O token é enviado no header das requisições protegidas.
5. O backend valida o token antes de permitir acesso aos endpoints restritos.

Isso garante:

* Proteção de rotas
* Controle de sessão stateless
* Maior segurança na comunicação cliente-servidor
* Separação clara entre autenticação e regras de negócio

---

## 🗄 Banco de Dados

* PostgreSQL (produção)

A utiliza **PostgreSQL**, proporcionando:

* Persistência real dos dados
* Maior robustez e confiabilidade
* Melhor aderência a cenários reais de mercado
* Compatibilidade com ambientes de deploy (Railway)

---

## 🛠 Tecnologias utilizadas

### Backend

* Java 17
* Spring Boot 3
* Spring Data JPA
* PostgreSQL
* Spring Security
* JWT
* Maven
* Lombok

### Frontend

* React 18
* Vite
* JavaScript (ES6+)
* CSS-in-JS (inline styles)
* Fetch API

---

## ⚙️ Funcionalidades

* Criar usuário
* Listar usuários
* Buscar usuário por nome
* Atualizar usuário
* Excluir usuário
* Sistema de login com autenticação JWT
* Proteção de rotas no frontend
* Interface responsiva (mobile, tablet e desktop)
* Feedback visual com notificações (toasts)
* Confirmação antes de excluir

---

## ▶️ Como executar o projeto

### Pré-requisitos

* Java JDK 17 ou superior
* Node.js 18 ou superior
* Maven instalado (ou usar o `mvnw` incluso no projeto)
* PostgreSQL instalado e configurado

---

### Backend

1. Clone o repositório:

```bash
git clone LINK_DO_REPOSITORIO
```

2. Entre na pasta do backend:

```bash
cd cadastrar_usuario/backend
```

3. Configure o `application.properties` com suas credenciais do PostgreSQL:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/seu_banco
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
```

4. Execute o projeto:

```bash
./mvnw spring-boot:run
```

Servidor:

```
http://localhost:8080
```

---

### Frontend

1. Entre na pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm run dev
```

Interface:

```
http://localhost:5173
```

> ⚠️ O backend precisa estar rodando antes de iniciar o frontend.

---

## 📡 Endpoints da API

### 🔓 Públicos

| Método | Endpoint    | Descrição    |
| ------ | ----------- | ------------ |
| POST   | /auth/login | Autenticação |

### 🔐 Protegidos (necessitam JWT)

| Método | Endpoint              | Descrição                  |
| ------ | --------------------- | -------------------------- |
| POST   | /usuario              | Criar usuário              |
| GET    | /usuario/lista        | Listar todos os usuários   |
| GET    | /usuario?email=...    | Buscar usuário por e-mail  |
| GET    | /usuario/buscar?nome= | Buscar usuários por nome   |
| PUT    | /usuario              | Atualizar usuário          |
| DELETE | /usuario?email=...    | Excluir usuário por e-mail |

---

## 🚀 Deploy

O projeto está disponível em produção:

* **Frontend:** [https://frontend-cadastro-production.up.railway.app](https://frontend-cadastro-production.up.railway.app)
* **Backend:** [https://backend-cadastro-production.up.railway.app](https://backend-cadastro-production.up.railway.app)

Deploy realizado utilizando **Railway**, com backend e banco PostgreSQL configurados em ambiente cloud.

---

## 🎯 Objetivo do projeto

Projeto desenvolvido para fins **acadêmicos e de portfólio**, demonstrando evolução de um CRUD simples para uma aplicação mais próxima de um cenário real de mercado, incluindo:

* Desenvolvimento de APIs REST seguras
* Implementação de autenticação com JWT
* Integração com PostgreSQL
* Uso de Spring Security
* Estruturação profissional de projeto Java
* Criação de interfaces modernas com React
* Integração fullstack
* Deploy em ambiente cloud

---

## 👨‍💻 Autor

Desenvolvido por **Kaio Lamanna**.
