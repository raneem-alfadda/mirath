// /app/api/fetch-company-data/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const companyName = searchParams.get('name');

  // تحقق من الإدخال
  if (!companyName) {
    return NextResponse.json({ error: 'اسم الشركة مطلوب' }, { status: 400 });
  }

  // بيانات وهمية بناءً على الاسم
  if (companyName === 'شركة الذكاء المستقبلية') {
    return NextResponse.json({
      industryType: 'استشارات تقنية',
      capital: '2,000,000',
      partnerCount: '2',
      isListed: 'no',
      fullOwnership: 'yes',
      partners: [
        { name: 'عبدالله السلمي', share: '60' },
        { name: 'ريم التميمي', share: '40' },
      ],
    });
  }

  // افتراضي إذا ما حصل شيء
  return NextResponse.json({ error: 'لم يتم العثور على الشركة' }, { status: 404 });
}
