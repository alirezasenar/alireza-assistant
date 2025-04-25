export default async function handler(req, res) {
  const { query } = req.body;

  // پاسخ آزمایشی
  res.status(200).json({ answer: `پرسش شما "${query}" دریافت شد.` });
}
