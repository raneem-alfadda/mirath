// /api/gpt-analysis.ts

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    const prompt = `
    بناءً على البيانات التالية الخاصة بشركة عائلية وورثتها، قدّم تقريرًا استشاريًا احترافيًا يشمل تحليلًا ماليًا، تقييمًا للوضع الإداري، وتوصيات استراتيجية:

    - نوع الشركة: ${data.companyType}
    - رأس المال: ${data.capital}
    - إجمالي الأصول: ${data.totalAssets}
    - إجمالي الالتزامات: ${data.totalLiabilities}
    - نسبة هامش الربح: ${data.profitMargin}%
    - نسبة السيولة: ${data.liquidityRatio}
    - نسبة المديونية إلى رأس المال: ${data.debtEquity}
    - ملخص قائمة الدخل: ${data.incomeStatement}
    - الميزانية العمومية: ${data.balanceSheet}
    - عدد الورثة: ${data.heirCount}
    - هل توجد وصية؟: ${data.hasWill}
    - تفاصيل الورثة:
    ${data.heirs.map((heir: any, i: number) => `  ${i + 1}. الاسم: ${heir.name} - العمر: ${heir.age} - صلة القرابة: ${heir.relation}`).join('\n')}

    صِغ التقرير بلغة رسمية، واختتمه بتوصيات استراتيجية تراعي استدامة الشركة وعدالة التوزيع.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const analysis = completion.choices[0].message.content;

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error in GPT analysis:', error);
    return NextResponse.json({ error: 'فشل التحليل' }, { status: 500 });
  }
}
