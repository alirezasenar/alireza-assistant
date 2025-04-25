// pages/api/chat.js
import { Configuration, OpenAIApi } from 'openai';
import { fetchTable } from '../../utils/nocodb';

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

export default async function handler(req, res) {
  try {
    const { messages } = req.body;
    const customers  = await fetchTable('customers');
    const properties = await fetchTable('properties');
    const systemPrompt = `
شما دستیار مشاور املاک هستید.
لیست مشتری‌ها: ${JSON.stringify(customers)}
لیست املاک: ${JSON.stringify(properties)}
    `;
    const chat = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ]
    });
    res.status(200).json({ answer: chat.data.choices[0].message.content });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
