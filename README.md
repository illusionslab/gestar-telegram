# Gestar Telegram Bridge

Endpoint: `POST /api/signal`

Required Vercel environment variables:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `SIGNAL_SECRET`

Request body example:
```json
{
  "message": "GESTAR SIGNAL\nSHORT MNQ\nScore: 82/100"
}
```

Required header:
`x-signal-secret: YOUR_SIGNAL_SECRET`
