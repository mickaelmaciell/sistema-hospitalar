# Sistema Hospitalar

![React](https://img.shields.io/badge/React-18+-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-teal) ![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Descrição

Este é um sistema de controle de atendimento hospitalar desenvolvido em **React**. Oferece funcionalidades para:

* Autenticação de usuários (Login)
* Cadastro de pacientes com prioridade de atendimento
* Triagem e gerenciamento de fila de pacientes
* Acompanhamento em tempo real via painel de atendimento
* Exportação de dados de pacientes para CSV/Excel
* Consulta de medicamentos via API Wikipedia

Os estilos combinam utilitários do **Tailwind CSS** e arquivos de **CSS puro** organizados em `src/styles/`.

## 🛠 Tecnologias e Ferramentas

* **React** (>=18)
* **Tailwind CSS**
* **CSS tradicional** (arquivos em `src/styles/`)
* **React Router** para roteamento
* **LocalStorage** para persistência de dados
* **Lucide-react** (ícones SVG)
* **Axios** para requisições HTTP

## 📁 Estrutura de Pastas

```text
sistema-hospitalar/
├── public/                  # HTML estático e assets
├── src/
│   ├── assets/              # Imagens e fontes
│   ├── components/          # Componentes reutilizáveis (Header, ConsultaRemedios, etc.)
│   ├── pages/               # Páginas principais (LoginPage, TriagemPage, Atendimento, Painel, LandingPage)
│   ├── services/            # Configuração de APIs (axios)
│   ├── styles/              # Arquivos CSS separados por página/componente
│   ├── App.jsx              # Definição de rotas e layout global
│   └── index.jsx            # Ponto de entrada React
├── .gitignore               # Arquivos ignorados pelo Git
├── package.json             # Dependências e scripts
├── tailwind.config.js       # Configuração do Tailwind CSS
└── postcss.config.js        # Configuração do PostCSS
```

## 🚀 Instalação e Execução

1. **Clone o repositório**

   ```bash
   git clone https://github.com/mickaelmaciell/sistema-hospitalar.git
   ```
2. **Acesse a pasta do projeto**

   ```bash
   cd sistema-hospitalar
   ```
3. **Instale as dependências**

   ```bash
   npm install
   ```
4. **Inicie em modo de desenvolvimento**

   ```bash
   npm start
   ```
5. **Abra no navegador**
   Acesse `http://localhost:3000`.

## 📦 Scripts Disponíveis

* `npm start` — inicia o servidor de desenvolvimento
* `npm run build` — gera build otimizado em `build/`
* `npm test` — executa testes (se configurado)
* `npm run lint` — verifica padrões de código (se configurado)

## 📝 Configuração do Tailwind CSS

O Tailwind foi configurado em `tailwind.config.js`. Para ajustar temas ou adicionar plugins:

```js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: { extend: {} },
  plugins: [],
};
```

## 🎛️ Uso

1. **Login**: usuário `admin` / senha `1234` (pode ser alterado em `LoginPage.jsx`).
2. **Cadastro**: registre pacientes via formulário em `/cadastro`.
3. **Triagem**: gerencie fila e prioridade em `/triagem`.
4. **Atendimento**: realize atendimentos em `/atendimento`.
5. **Painel**: visualize status em tempo real em `/painel`.

## 👥 Equipe

* Mickael do nascimento maciel
* Francisco Diemes Simplicio dos Santos
* Guilherme pereira pinho

## 📄 Licença

Este projeto está licenciado sob a **MIT License**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
