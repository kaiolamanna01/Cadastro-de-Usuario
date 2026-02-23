# CRUD de Usuários — Spring Boot + React

Projeto fullstack de cadastro de usuários desenvolvido em **Java com Spring Boot** no backend e **React com Vite** no frontend, implementando operações CRUD (Create, Read, Update e Delete) através de uma API REST.

---

## 📌 Descrição

Esta aplicação permite o gerenciamento de usuários por meio de uma interface web moderna integrada a uma API REST.

Foi desenvolvida com o objetivo de praticar:

* Arquitetura em camadas
* API REST
* Spring Boot
* JPA/Hibernate
* Banco de dados em memória
* Integração frontend/backend
* Componentização com React
* Consumo de APIs com Fetch

---

## 🛠 Tecnologias utilizadas

### Backend
* Java 25
* Spring Boot 3
* Spring Data JPA
* H2 Database (em memória)
* Maven
* Lombok

### Frontend
* React 18
* Vite
* JavaScript (ES6+)
* CSS-in-JS (inline styles)

---

## ⚙️ Funcionalidades

* Criar usuário
* Listar usuários
* Buscar usuário por nome (requisição ao backend)
* Atualizar usuário
* Excluir usuário
* Interface responsiva (mobile, tablet e desktop)
* Feedback visual com notificações (toasts)
* Confirmação antes de excluir

---

## ▶️ Como executar o projeto

### Pré-requisitos
* Java JDK 17 ou superior
* Node.js 18 ou superior
* Maven instalado (ou usar o `mvnw` incluso no projeto)

---

### Backend

1. Clone o repositório:
```bash
git clone LINK_DO_REPOSITORIO
```

2. Entre na pasta do backend:
```bash
cd cadastrar_usuario
```

3. Execute o projeto:
```bash
./mvnw spring-boot:run
```

O servidor iniciará em:
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

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A interface estará disponível em:
```
http://localhost:5173
```

> ⚠️ O backend precisa estar rodando antes de iniciar o frontend.

---

## 🧪 Banco de dados H2

O projeto utiliza o **H2 Database em memória**, que é recriado a cada execução.

Acesse o console do H2:
```
http://localhost:8080/h2-console
```

Configurações padrão:
```
JDBC URL: jdbc:h2:mem:testdb
User: sa
Password: (vazio)
```

---

## 📡 Endpoints da API

| Método | Endpoint              | Descrição                      |
| ------ | --------------------- | ------------------------------ |
| POST   | /usuario              | Criar usuário                  |
| GET    | /usuario/lista        | Listar todos os usuários       |
| GET    | /usuario?email=...    | Buscar usuário por e-mail      |
| GET    | /usuario/buscar?nome= | Buscar usuários por nome       |
| PUT    | /usuario              | Atualizar usuário              |
| DELETE | /usuario?email=...    | Excluir usuário por e-mail     |

---

## 📁 Estrutura do projeto

```
cadastrar_usuario/
├── backend/
│   └── src/main/java/com/kaiolamanna/cadastrar_usuario
│       ├── controller
│       ├── business
│       ├── infrastructure
│       │   ├── entitys
│       │   ├── repository
│       │   └── config
│       └── CadastrarUsuarioApplication.java
│
└── frontend/
    └── src/
        ├── api/
        │   └── usuarioApi.js
        ├── components/
        │   ├── Avatar.jsx
        │   ├── Button.jsx
        │   ├── DeleteConfirm.jsx
        │   ├── Field.jsx
        │   ├── Spinner.jsx
        │   ├── Toast.jsx
        │   ├── UserModal.jsx
        │   └── UserRow.jsx
        ├── styles/
        │   └── global.js
        └── App.jsx
```

---

## 🚀 Deploy

O projeto está disponível em produção:

- **Frontend:** https://frontend-cadastro-production.up.railway.app
- **Backend:** https://backend-cadastro-production.up.railway.app

## 🎯 Objetivo do projeto

Projeto desenvolvido para fins **acadêmicos e de portfólio**, com o objetivo de demonstrar conhecimentos em:

* Desenvolvimento de APIs REST
* Spring Boot
* Persistência com JPA
* Estruturação de projetos Java
* Criação de interfaces com React
* Integração fullstack frontend/backend
* Componentização e organização de código

---

## 👨‍💻 Autor

Desenvolvido por **Kaio Lamanna**.
