# Simulador Tributário AX Educação

Aplicação React com lógica completa de simulação tributária, cálculos de reforma e gestão de planos.

## 🚀 Quickstart (3 passos)

### 1. Testar localmente (opcional)

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` e testa tudo.

### 2. Subir no GitHub

Se ainda não tem conta GitHub, cria em [github.com](https://github.com).

No terminal, dentro desta pasta:

```bash
git init
git add .
git commit -m "Initial commit - Simulador tributário AX"
git branch -M main
git remote add origin https://github.com/SEU_USERNAME/simulador-tributario-ax.git
git push -u origin main
```

**Troca `SEU_USERNAME` pelo seu username do GitHub.**

### 3. Subir na Netlify (2 minutos)

1. Vai em [netlify.com](https://netlify.com)
2. Clica "Sign up with GitHub"
3. Autoriza a Netlify acessar seus repositórios
4. Clica "New site from Git"
5. Seleciona o repositório `simulador-tributario-ax`
6. Clica "Deploy" — espera ~2 minutos
7. Seu site está online! 🎉

A Netlify vai gerar um link tipo: `https://simulador-ax-xxxxx.netlify.app`

## 🌐 Configurar domínio próprio

Depois que estiver funcionando, conecta seu domínio `app.axeducacao.com`:

1. No painel da Netlify, vai em **Domain settings**
2. Clica "Add custom domain"
3. Digita `app.axeducacao.com`
4. Netlify fornece registros DNS
5. No Hostinger (painel de DNS), adiciona os registros
6. Espera 10-30 minutos pra DNS propagar

Pronto, sua app estará em `https://app.axeducacao.com`

## 📦 Estrutura

```
├─ src/
│  ├─ App.jsx          ← Sua calculadora (main component)
│  └─ main.jsx         ← Entry point
├─ index.html
├─ package.json        ← Dependências
├─ vite.config.js      ← Build config
└─ netlify.toml        ← Deploy config
```

## 🔧 Build manual (pra criar dist/)

```bash
npm run build
```

Gera a pasta `dist/` pronta pra produção. Netlify faz isso automaticamente.

## 📝 Notas

- **Usuários de teste:** admin@axeducacao.com.br / admin123 (dados em memória, reset ao recarregar)
- **Banco de dados real:** Ainda não implementado (próxima fase com Supabase)
- **Autenticação real:** Ainda não implementada
- **Pagamentos:** Integração Kiwify será adicionada no backend

## 🆘 Se der erro

**Erro "command not found: npm"**
→ Instala Node.js em nodejs.org (LTS)

**Erro "404 Not Found" na Netlify**
→ Espera 5-10 minutos pra DNS propagar. Se persistir, vai no painel Netlify e verifica Domain settings.

**Quer mudar o código?**
→ Edita `src/App.jsx`, faz `git add . && git commit -m "msg" && git push`. Netlify faz redeploy automaticamente.

---

**Dúvidas?** Me manda mensagem. Sucesso! 🚀
