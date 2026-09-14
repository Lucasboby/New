# Segurança e dados

## Princípios

- Chaves secretas existem somente nas variáveis de ambiente do Netlify.
- O navegador recebe apenas configurações públicas.
- Envio de WhatsApp exige Supabase configurado, sessão válida e `AUTH_REQUIRED=true`.
- Webhooks são validados com HMAC-SHA256 e comparação resistente a timing.
- Logs de agentes registram metadados operacionais, não o texto integral do usuário.
- Dados em nuvem são isolados por organização com Row Level Security.

## Integrações sensíveis pendentes de autorização

A captura automática de leads da Meta e o encaminhamento de payloads ao n8n não devem ser habilitados até que sejam definidos:

1. conta e formulário de origem;
2. organização e cliente de destino;
3. campos pessoais permitidos;
4. tempo de retenção;
5. URL exata do n8n;
6. pessoas autorizadas a acessar esses dados;
7. base legal e avisos de privacidade aplicáveis.

## Resposta a incidentes

Se um segredo for exposto, revogue-o no provedor, gere outro, atualize o Netlify e revise os logs. Nunca apenas apague o segredo do último commit: considere-o comprometido.

## Produção

Antes de liberar clientes:

- altere `DEMO_MODE=false`;
- altere `AUTH_REQUIRED=true`;
- defina `SITE_URL`;
- ative MFA nas contas administrativas;
- limite convites e papéis;
- confirme políticas RLS;
- teste restauração do banco;
- configure alertas de custo e uso.
