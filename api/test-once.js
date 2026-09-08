export default async function handler(req, res) {
  const botToken = (process.env.TELEGRAM_BOT_TOKEN || "").trim();
  const chatId = -5236072453;

  if (!botToken) {
    return res.status(500).json({ error: "Telegram configuration missing" });
  }

  const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "GESTAR SIGNALS - PRUEBA AUTOMATICA\nConexion Vercel -> Telegram funcionando.",
      disable_web_page_preview: true
    })
  });

  const data = await telegramResponse.json();
  return res.status(data.ok ? 200 : 500).json(data);
}
