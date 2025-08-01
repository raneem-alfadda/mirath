import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { data } = await req.json();

  const prompt = `
أنت مستشار مالي. قم بتحليل هذه البيانات باحترافية، وقدم تقريرًا استشاريًا دقيقًا عن الشركة العائلية، يشمل الآتي:

- القطاع
- المؤشرات المالية
- تقييم الجاهزية للانتقال
- احتمالية الخطر
- ملاحظات إدارية
- توصيات تنفيذية

وفي النهاية أضف فقرة بعنوان:
"نقطة الضعف الرئيسية:" تتحدث فيها عن أبرز نقطة ضعف تهدد انتقال الملكية بسطرين فقط.

البيانات:
${JSON.stringify(data, null, 2)}

اكتب التقرير بصيغة رسمية، ومنظمة، وباللغة العربية، وابدأ بعنوان واضح.
`;

  try {
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'أنت خبير استشاري في تحليل الشركات العائلية' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const result = await completion.json();

    const fullText = result.choices?.[0]?.message?.content || 'تعذر توليد التقرير.';
    const weaknessMatch = fullText.match(/نقطة الضعف الرئيسية[:\-]?\s*(.+)/);
    const weakness = weaknessMatch ? weaknessMatch[1].trim() : null;

    // ✅ بناء سيناريوهات ذكية من الورثة
    let scenarios = [];
    if (data.heirs && Array.isArray(data.heirs)) {
      const total = data.heirs.length || 1;
      const percent = Math.floor(100 / total);

      scenarios = data.heirs.map((heir: any, index: number) => ({
        label: heir.name || `الوريث ${index + 1}`,
        percentage: percent,
        description: `تم تخصيص ${percent}% لهذا الوريث ضمن التحليل`,
      }));
    }

    return NextResponse.json({ analysis: fullText, weakness, scenarios });
  } catch (err) {
    console.error('Error in GPT API:', err);
    return NextResponse.json({ error: 'Failed to fetch GPT result' }, { status: 500 });
  }
}
