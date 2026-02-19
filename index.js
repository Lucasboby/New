import dotenv from 'dotenv';
import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';

const { Client, LocalAuth } = pkg;

dotenv.config();

const CENTRAL_CHAT_ID = process.env.CENTRAL_CHAT_ID;

if (!CENTRAL_CHAT_ID) {
  console.error('❌ Defina CENTRAL_CHAT_ID no .env antes de iniciar.');
  process.exit(1);
}

const allowedTargets = new Set(
  (process.env.ALLOWED_FORWARD_TARGETS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
);

const accountConfigs = [
  { key: 'account_1', label: 'WhatsApp 1' },
  { key: 'account_2', label: 'WhatsApp 2' },
  { key: 'account_3', label: 'WhatsApp 3' }
];

function formatMessage({ accountLabel, from, body }) {
  const header = `📩 Nova mensagem em ${accountLabel}`;
  const sender = `👤 De: ${from}`;
  const content = body?.trim() ? `💬 Mensagem: ${body}` : '💬 Mensagem sem texto (mídia/sticker).';
  return `${header}\n${sender}\n${content}`;
}

function canForwardToCentral(message) {
  if (allowedTargets.size === 0) return true;
  return allowedTargets.has(message.from);
}

function setupClient({ key, label }) {
  const client = new Client({
    authStrategy: new LocalAuth({ clientId: key }),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  });

  client.on('qr', (qr) => {
    console.log(`\n🔐 Escaneie o QR para ${label}:`);
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    console.log(`✅ ${label} conectado.`);
  });

  client.on('auth_failure', (msg) => {
    console.error(`❌ Falha de autenticação em ${label}:`, msg);
  });

  client.on('disconnected', (reason) => {
    console.warn(`⚠️ ${label} desconectado: ${reason}`);
  });

  client.on('message', async (message) => {
    try {
      if (message.from === 'status@broadcast') return;
      if (!canForwardToCentral(message)) return;

      const text = formatMessage({
        accountLabel: label,
        from: message.from,
        body: message.body
      });

      await client.sendMessage(CENTRAL_CHAT_ID, text);

      if (message.hasMedia) {
        const media = await message.downloadMedia();
        if (media) {
          await client.sendMessage(CENTRAL_CHAT_ID, media, {
            caption: `📎 Mídia encaminhada de ${label} (${message.from})`
          });
        }
      }
    } catch (error) {
      console.error(`❌ Erro ao processar mensagem de ${label}:`, error.message);
    }
  });

  client.initialize();
}

for (const account of accountConfigs) {
  setupClient(account);
}

console.log('🚀 Hub iniciado. Aguarde os QRs e escaneie cada conta.');
