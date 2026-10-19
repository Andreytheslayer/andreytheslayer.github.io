module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TELEGRAM_BOT_TOKEN = '8988547373:AAFflrai9T-okn-46EB0J77C_tWsKMLqs5s';
  const TELEGRAM_CHAT_ID = '324272045';

  const { text } = req.body;

  try {
    const tgResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    });

    const data = await tgResponse.json();

    if (data.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: data.description });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
};