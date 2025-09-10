# Node API Server

Um servidor Node.js simples com Express que expõe uma API REST básica.

## 🚀 Funcionalidades

- API REST com endpoints para usuários
- CORS habilitado
- Middleware de logging
- Tratamento de erros
- Health check
- Graceful shutdown

## 📋 Endpoints disponíveis

- `GET /` - Health check do servidor
- `GET /api/status` - Status detalhado do servidor
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Busca usuário por ID
- `POST /api/users` - Cria novo usuário

## 🛠️ Como executar localmente

### Pré-requisitos
- Node.js 14+ instalado
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <seu-repo>
cd node-api-server

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Ou execute em modo de produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📁 Estrutura do projeto

```
node-api-server/
├── server.js          # Arquivo principal do servidor
├── package.json       # Dependências e scripts
├── README.md          # Este arquivo
└── .gitignore         # Arquivos ignorados pelo Git
```

## 🌐 Deploy

### EasyPanel
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente se necessário
3. EasyPanel detectará automaticamente o `package.json` e executará `npm start`

### Railway
1. Conecte seu repositório GitHub
2. Railway detectará automaticamente o projeto Node.js
3. Configure a variável `PORT` se necessário (Railway define automaticamente)

## 🔧 Variáveis de ambiente

- `PORT` - Porta do servidor (padrão: 3000)
- `NODE_ENV` - Ambiente de execução (development/production)

## 📊 Exemplos de uso

### Listar usuários
```bash
curl http://localhost:3000/api/users
```

### Buscar usuário por ID
```bash
curl http://localhost:3000/api/users/1
```

### Criar novo usuário
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana Silva","email":"ana@email.com","idade":28}'
```

### Status do servidor
```bash
curl http://localhost:3000/api/status
```

## 📄 Licença

MIT
