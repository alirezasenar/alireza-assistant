export default async function handler(req, res) {
  const { query } = req.body;

  // پاسخ ساده برای تست
  res.status(200).json({
    answer: `پرسش شما دریافت شد: ${query}`,
  });
}
