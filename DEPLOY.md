# Implantação — Lucas Marketing AI

## 1. GitHub e Netlify

1. No Netlify, escolha **Add new site → Import an existing project**.
2. Conecte o repositório `Lucasboby/New`.
3. Não informe comando de build. O diretório publicado é `.` e as funções estão em `netlify/functions`; o arquivo `netlify.toml` já configura isso.
4. Faça o primeiro deploy. Sem chave, a aplicação abre em modo demonstração.

## 2. OpenAI

No Netlify, abra **Site configuration → Environment variables** e cadastre `OPENAI_API_KEY`. Defina `DEMO_MODE=false`. A chave só existe no servidor e nunca é enviada ao navegador.

Modelos podem ser alterados com `OPENAI_ROUTER_MODEL`, `OPENAI_SPECIALIST_MODEL` e `OPENAI_CMO_MODEL`.

## 3. Supabase e login

1. Crie um projeto Supabase.
2. Abra **SQL Editor**, cole e execute `supabase/schema.sql`.
3. Copie Project URL, anon key e service-role key para as variáveis correspondentes no Netlify.
4. Crie o primeiro usuário em **Authentication → Users**.
5. Depois de confirmar o acesso, altere `AUTH_REQUIRED=true`.

A service-role key nunca deve ser exposta no frontend.

## 4. Segurança

Configure `SITE_URL` com a URL exata de produção. Ajuste `RATE_LIMIT_PER_10_MIN` conforme o plano. Para webhooks, gere um segredo forte em `WEBHOOK_SECRET` e assine o corpo bruto com HMAC-SHA256 no cabeçalho `x-lm-signature`.

## 5. n8n e WhatsApp

Cadastre `N8N_WEBHOOK_URL` no Netlify. No n8n, armazene credenciais do provedor oficial do WhatsApp e da Meta no cofre de credenciais; não grave tokens em nós de texto nem no navegador.

## Verificação

- `/api/health` deve retornar `ok: true`.
- `/api/config` deve informar `mode: production` após OpenAI e `DEMO_MODE=false`.
- Faça login e execute uma pergunta curta ao CMO.
- Confira limites e logs das Functions antes de liberar clientes.
