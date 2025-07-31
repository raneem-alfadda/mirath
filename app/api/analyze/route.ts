import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'أنت خبير في تحليل الشركات العائلية. اقرأ المدخلات بدقة واستنتج سيناريو واضح للتوزيع العادل والمستدام.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const result = completion.choices[0]?.message?.content;
    return NextResponse.json({ result });
  } catch (error) {
    console.error('تحليل فشل:', error);
    return NextResponse.json({ error: 'فشل في المعالجة' }, { status: 500 });
  }
}
