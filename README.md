# Automação WhatsApp Hub (3 contas ➜ 1 central)

Este projeto cria uma automação para conectar **3 contas de WhatsApp** e encaminhar as mensagens recebidas para um **chat central**.

> ⚠️ Importante: esta solução usa `whatsapp-web.js` (não oficial). Avalie riscos de bloqueio e conformidade com os termos do WhatsApp para uso em produção.

## Como funciona

- Inicia 3 sessões independentes (`account_1`, `account_2`, `account_3`).
- Você escaneia um QR para cada sessão.
- Cada mensagem recebida é encaminhada para um chat central definido em `CENTRAL_CHAT_ID`.
- Se a mensagem tiver mídia, a mídia também é encaminhada.

## Pré-requisitos

- Node.js 18+
- Google Chrome/Chromium instalado (usado pelo Puppeteer)

## Instalação

```bash
npm install
cp .env.example .env
```

Edite o `.env`:

```env
CENTRAL_CHAT_ID=5511999999999@c.us
ALLOWED_FORWARD_TARGETS=
```

### Como descobrir o `CENTRAL_CHAT_ID`

No WhatsApp Web, o identificador de chat privado geralmente é:

- `55DDDNÚMERO@c.us`

Exemplo: `5511987654321@c.us`

## Execução

```bash
npm start
```

- Escaneie os 3 QRs mostrados no terminal.
- Deixe o processo rodando.

## Estrutura

- `index.js`: lógica principal de conexão, escuta e encaminhamento.
- `.env.example`: variáveis de ambiente necessárias.

## Próximos passos recomendados

- Persistir logs em arquivo/observabilidade.
- Adicionar tratamento para reconexão automática avançada.
- Implementar filtros por horário, etiquetas ou palavras-chave.
- Migrar para API oficial (WhatsApp Business Platform) se o uso for comercial.
