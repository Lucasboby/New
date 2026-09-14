# Lucas Marketing AI

Plataforma multiagente para operação de marketing. Um CMO IA coordena 20 especialistas e mantém clientes, projetos, conteúdo, CRM, automações, analytics e histórico em um único painel.

## O que está implementado

- CMO com roteamento automático de 1 a 5 especialistas
- 20 agentes com missões independentes
- síntese final sem respostas conflitantes
- dashboard responsivo e futurista
- contexto separado por cliente
- projetos, conteúdo, CRM, pipeline e automações
- analytics e exportação CSV
- modo demonstração sem consumo de API
- OpenAI Responses API no backend
- autenticação Supabase opcional
- persistência em nuvem multiempresa
- Row Level Security e papéis por organização
- rate limit, timeout, CORS restrito e headers de segurança
- chave OpenAI somente no servidor
- webhook HMAC para n8n e integrações
- logs de auditoria sem armazenar o texto dos prompts

## Estrutura

- `index.html` e `assets/`: aplicação web
- `netlify/functions/chat.js`: CMO, especialistas e segurança
- `netlify/functions/config.js`: configuração pública sem segredos
- `netlify/functions/health.js`: diagnóstico
- `netlify/functions/webhook.js`: automações assinadas
- `supabase/schema.sql`: banco multi-tenant e RLS
- `DEPLOY.md`: configuração de produção
- `.env.example`: variáveis necessárias

## Publicação

Consulte [DEPLOY.md](DEPLOY.md). O projeto foi preparado para importação direta do GitHub pelo Netlify. O primeiro deploy funciona em modo demonstração; as respostas reais são ativadas apenas depois que `OPENAI_API_KEY` for salva com segurança no ambiente do Netlify.

## Segurança

Não coloque chaves em `assets/app.js`, `index.html`, commits, prints ou mensagens. Use exclusivamente as variáveis de ambiente do provedor.
