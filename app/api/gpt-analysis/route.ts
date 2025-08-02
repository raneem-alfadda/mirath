// /api/gpt-analysis.ts

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    const prompt = `
أنت مستشار مالي مخضرم. طُلب منك تقديم تقرير استشاري شامل حول حالة شركة عائلية بناءً على البيانات التالية.

✅ المطلوب:
- كتابة تقرير رسمي ومهني يبدأ بعنوان واضح.
- ثم فقرة تحليل مالي مفصل تشرح وضع الشركة باستخدام لغة تحليلية احترافية.
- بعدها فقرة تقييم إداري توضّح التحديات أو الملاحظات الإدارية (مثل ضعف الهيكلة، تداخل الأدوار، اعتماد مفرط...إلخ).
- ثم فقرة توصيات استراتيجية توجّه الورثة نحو انتقال ملكية عادل ومستقر ومستدام.

📊 بعد ذلك، أضف قسم منفصل بعنوان: "ثانيًا: ذكاء فعلي (تحليل رقمي)"
- اذكر فيه تقييم الجاهزية للانتقال كنسبة مئوية من 100
- اذكر فيه درجة المخاطر (مرتفع، متوسط، منخفض)
- أضف "نقطة الضعف الرئيسية" في سطرين فقط، بدون شرح مطول.

🧾 البيانات:
- نوع الشركة: ${data.companyType}
- رأس المال: ${data.capital}
- إجمالي الأصول: ${data.totalAssets}
- إجمالي الالتزامات: ${data.totalLiabilities}
- نسبة هامش الربح: ${data.profitMargin}%
- نسبة السيولة: ${data.liquidityRatio}
- نسبة المديونية إلى رأس المال: ${data.debtEquity}
- قائمة الدخل: ${data.incomeStatement}
- الميزانية العمومية: ${data.balanceSheet}
- عدد الورثة: ${data.heirCount}
- هل توجد وصية؟: ${data.hasWill}
- تفاصيل الورثة:
${data.heirs.map((heir: any, i: number) => `  ${i + 1}. الاسم: ${heir.name} - العمر: ${heir.age} - صلة القرابة: ${heir.relation}`).join('\n')}

📌 الصيغة المطلوبة:
- لا تستخدم Markdown.
- استخدم عناوين واضحة: "أولًا: التحليل الاستشاري"، "ثانيًا: ذكاء فعلي".
- اجعل النبرة رسمية، وكأنك تقدم التقرير لجهة مصرفية أو لجنة ورثة.
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
