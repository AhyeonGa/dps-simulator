export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { type, name, contact, message } = req.body;

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  const payload = {
    username: "DPS模擬器",
    content:
      `新留言\n` +
      `類型：${type}\n` +
      `暱稱：${name}\n` +
      `聯絡：${contact || "未填"}\n` +
      `內容：${message}`
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  });

  res.status(200).json({ ok: true });
}