export default async function handler(req, res) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const out = {
    tokenPresent: Boolean(botToken),
    chatId: chatId ?? null,
    chatIdType: typeof chatId,
    chatIdLength: chatId ? String(chatId).length : 0,
    bot: null,
    chatCheck: null
  };

  if (!botToken) return res.status(500).json(out);

  try {
    const meResp = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const me = await meResp.json();
    out.bot = me.ok ? { id: me.result.id, username: me.result.username, first_name: me.result.first_name } : me;

    if (chatId) {
      const chatResp = await fetch(`https://api.telegram.org/bot${botToken}/getChat?chat_id=${encodeURIComponent(chatId)}`);
      const chat = await chatResp.json();
      out.chatCheck = chat.ok ? { ok: true, id: chat.result.id, title: chat.result.title, type: chat.result.type } : chat;
    }

    return res.status(200).json(out);
  } catch (e) {
    return res.status(500).json({ ...out, error: e.message });
  }
}
