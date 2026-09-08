export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const secret = req.headers["x-signal-secret"];

  if (!secret || secret !== process.env.SIGNAL_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "Missing message" });
  }

  const botToken = (process.env.TELEGRAM_BOT_TOKEN || "").trim();
  const chatId = (process.env.TELEGRAM_CHAT_ID || "").trim();

  if (!botToken || !chatId) {
    return res.status(500).json({
      error: "Telegram configuration missing"
    });
  }

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true
        })
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      return res.status(500).json({
        error: "Telegram error",
        telegram: telegramData
      });
    }

    return res.status(200).json({
      ok: true,
      sent: true
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
