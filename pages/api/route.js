import { NextResponse } from 'next/server';
import { NOCODB_API, DB_PROJECT, DB_TABLE } from '../../config';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { NocoDBDataset } from 'langchain/datasets/loaders/nocodb';

export async function GET() {
  try {
    const dataset = new NocoDBDataset({
      apiUrl: NOCODB_API,
      projectId: DB_PROJECT,
      tableId: DB_TABLE,
    });

    const data = await dataset.load();

    const template = `شما یک دستیار هوشمند برای مشاور املاک هستی. با توجه به اطلاعات زیر به سوال پاسخ بده:
    اطلاعات:
    {context}

    سوال:
    {question}`;

    const prompt = new PromptTemplate({
      inputVariables: ['context', 'question'],
      template,
    });

    const model = new ChatOpenAI({ temperature: 0 });
    const chain = new LLMChain({ llm: model, prompt });

    const question = 'چه تعداد مشتری ثبت شده‌اند؟';

    const res = await chain.call({
      context: JSON.stringify(data),
      question,
    });

    return NextResponse.json({ answer: res.text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
