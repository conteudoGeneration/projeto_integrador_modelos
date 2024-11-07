# Projeto Caronas Compartilhadas - Frontend 

<br />

<div align="center">
    <img src="https://i.imgur.com/AzshGmS.png" title="source: imgur.com" width="50%"/>
</div>


<br /><br />

## 1. Descrição

O Projeto Caronas Compartilhadas é um **frontend** desenvolvido com o **Vite** e o **React** para consumir uma API de Caronas Compartilhadas, desenvolvida em **NestJS**. A aplicação permite o gerenciamento dos **Usuários**, **Veículos** e **Viagens (caronas)**, além de utilizar autenticação por usuário e senha, com validação de token **JWT** para proteger as rotas e garantir a segurança da aplicação.

### 1.1. Principais Funcionalidades

- **Autenticação por Usuário e Senha**: Login seguro para controlar o acesso dos usuários.
- **Validação de Token JWT**: Proteção de rotas e verificação de token para acessar recursos privados.
- **CRUD de Usuários**: Criação, leitura e atualização de perfis de usuários.
- **CRUD de Veículos**: Gerenciamento dos veículos.
- **CRUD de Viagens**: Gerenciamento das caronas.
- **Indicação de Produtos Saudáveis**.

------

## 2. Tecnologias

| Item                         | Descrição  |
| ---------------------------- | ---------- |
| **Servidor**                 | Node JS    |
| **Linguagem de programação** | TypeScript |
| **Biblioteca**               | React JS   |
| **Build**                    | Vite       |
| **Estilização**              | Tailwind   |

---

## 3. Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v16+)
- [yarn](https://yarnpkg.com/)
- Backend da API NestJS rodando ([Repositório da API](https://github.com/rafaelq80/crm-nest))

---

## 4. Instalação - Ambiente Local

### 4.1. Clonando o repositório

```bash
git clone https://github.com/usuario/carona-react.git
cd carona-react
```

### 4.2. Instalando as dependências

Utilize o comando abaixo para instalar todas as bibliotecas através do yarn:

```bash
yarn
```

### 4.3. Configuração do ambiente

A URL da API NestJS deve estar apontando para o endereço abaixo:

```bash
http://localhost:4000
```

### 4.4. Executando o projeto

Inicie o servidor de desenvolvimento com o yarn:

```bash
yarn dev
```

A aplicação estará disponível no enderço: `http://localhost:5173`

---

## 5. Estrutura do Projeto

```plaintext
src/
│
├── components/       # Componentes reutilizáveis
├── contexts/         # Gerenciamento de estado global (ex: autenticação)
├── models/           # Estrutura de dados da aplicação-
├── pages/            # Páginas da aplicação
├── services/         # Integração com a API (requisições HTTP)
├── utils/            # Funções auxiliares (alerts)
└── App.tsx           # Componente principal da aplicação
```

---

## 6. Autenticação e Validação de Token JWT

### Fluxo de Autenticação

1. O usuário realiza o login com **e-mail** e **senha**.
2. A aplicação faz uma requisição para a API, que retorna um token **JWT**.
3. O token é armazenado na **Context API** para uso em futuras requisições autenticadas.
4. Nas rotas protegidas, o token é validado antes do acesso aos recursos.

### Controle de Autenticação

- Se o token expirar ou for inválido, o usuário será redirecionado para a página de login.

------

## 7. Implementações Futuras

- [ ] Implementar um Carrossel de imagens
- [ ] Implementar o Simulador de Carrinho de Contratações
- [ ] Implementar a Busca de caronas na página inicial
- [ ] Implementar a Atualização do Perfil
- [ ] Implementar o Formulário de Contato

