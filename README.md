# CRUD de Usuários com Spring Boot

Projeto de cadastro de usuários desenvolvido em **Java com Spring Boot**, implementando operações CRUD (Create, Read, Update e Delete) através de uma API REST.

## 📌 Descrição

Este projeto é uma aplicação backend que permite o gerenciamento de usuários por meio de requisições HTTP.
Foi desenvolvido com o objetivo de praticar:

* Arquitetura em camadas
* API REST
* Spring Boot
* JPA/Hibernate
* Banco de dados em memória

---

## 🛠 Tecnologias utilizadas

* Java 25
* Spring Boot 3
* Spring Data JPA
* H2 Database (em memória)
* Maven
* Lombok

---

## ⚙️ Funcionalidades

* Criar usuário
* Listar usuários
* Buscar usuário por ID
* Atualizar usuário
* Excluir usuário

---

## ▶️ Como executar o projeto

### Pré-requisitos

* Java JDK 17 ou superior
* Maven instalado

### Passos

1. Clone o repositório:

```bash
git clone LINK_DO_REPOSITORIO
```

2. Entre na pasta do projeto:

```bash
cd cadastrar_usuario
```

3. Execute o projeto:

```bash
mvn spring-boot:run
```

O servidor iniciará em:

```
http://localhost:8080
```

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

## 📡 Exemplos de endpoints

| Método | Endpoint       | Descrição             |
| ------ | -------------- | --------------------- |
| POST   | /usuarios      | Criar usuário         |
| GET    | /usuarios      | Listar usuários       |
| GET    | /usuarios/{id} | Buscar usuário por ID |
| PUT    | /usuarios/{id} | Atualizar usuário     |
| DELETE | /usuarios/{id} | Excluir usuário       |

---

## 📁 Estrutura do projeto

```
src
 └── main
     └── java
         └── com.kaiolamanna.cadastrar_usuario
             ├── controller
             ├── model
             ├── repository
             └── service
```

---

## 🎯 Objetivo do projeto

Projeto desenvolvido para fins **acadêmicos e de portfólio**, com o objetivo de demonstrar conhecimentos em:

* Desenvolvimento de APIs REST
* Spring Boot
* Persistência com JPA
* Estruturação de projetos Java

---

## 👨‍💻 Autor

Desenvolvido por **Kaio Lamanna**.
