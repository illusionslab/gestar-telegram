export default async function handler(req, res) {
  const botToken = (process.env.TELEGRAM_BOT_TOKEN || "").trim();
  const chatId = "-5236072453";

  if (!botToken) {
    return res.status(500).json({ error: "Telegram configuration missing" });
  }

  const text = [
    "🚨 GESTAR SIGNAL — PRUEBA 9:30",
    "QQQ → MNQ INTRADÍA",
    "Sesgo: BAJISTA",
    "Score: 82/100",
    "Confirmación: MNQ pierde 29,820",
    "Invalidación: recuperación sobre 29,865",
    "TP1: 29,770",
    "TP2: 29,720",
    "Estado: PRUEBA — NO ES SEÑAL REAL"
  ].join("\n");

  const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    })
  });

  const data = await telegramResponse.json();
  return res.status(data.ok ? 200 : 500).json(data);
}
