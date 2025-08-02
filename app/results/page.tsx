'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';

export default function OutputPage() {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('analysisData');
    if (stored) setData(JSON.parse(stored));
  }, []);

  const handlePrint = () => window.print();

  if (!data) return <div className="p-10 text-center">جاري تحميل البيانات...</div>;

  const pieData = [
    { name: 'رنيم', value: 1 },
    { name: 'سارة', value: 1 },
  ];

  const barData = [
    { year: '2021', profit: 4 },
    { year: '2022', profit: 3 },
    { year: '2023', profit: 2 },
  ];

  const readiness = 60;
  const COLORS = ['#8884d8', '#82ca9d'];

  const fullReport = `تقرير استشاري شامل حول جاهزية الشركة العائلية لانتقال الملكية

استنادًا إلى البيانات المُدخلة من قبل المستخدم، أجرينا تحليلًا ماليًا وإداريًا لتقييم جاهزية الشركة لمرحلة انتقال الملكية. يعرض هذا التقرير أبرز المؤشرات المالية، الهيكل الإداري، والمخاطر المحتملة، ويوفر توصيات عملية تدعم الاستقرار والاستدامة.

التحليل المالي:
تم تحليل البيانات التالية:
- رأس المال: ${data.capital} ريال
- الأصول: ${data.totalAssets} ريال
- الالتزامات: ${data.totalLiabilities} ريال
- الأرباح السنوية (2021): ${data.profit2021} ريال
- الأرباح السنوية (2022): ${data.profit2022} ريال
- الأرباح الحالية: ${data.annualProfit} ريال

الملاحظات:
تشير المؤشرات إلى ${parseFloat(data.annualProfit) > parseFloat(data.profit2022) ? 'تحسن في الأداء المالي' : 'انخفاض محتمل في الأرباح'}، مع ${parseFloat(data.totalAssets) > parseFloat(data.totalLiabilities) ? 'استقرار نسبي في الميزانية العمومية' : 'مخاطر مالية قائمة نتيجة ارتفاع الالتزامات'}.

التحليل الإداري:
تم إدخال عدد الورثة: ${data.heirCount} وريث.
وجود وصية: ${data.hasWill === 'yes' ? 'نعم' : 'لا'}

النتائج:
- ${data.hasWill === 'yes' ? 'وجود وصية يسهل عملية الانتقال ويوضح النية المسبقة للتوزيع.' : 'عدم وجود وصية يفتح الباب للنزاعات والتعقيدات القانونية.'}
- يوصى بتحديد المهام الإدارية والتشغيلية لكل وريث لضمان استمرارية الأعمال.

التوصيات:
1. إعداد خطة انتقال إداري تتضمن جدولًا زمنيًا واضحًا.
2. بدء برنامج تدريبي للورثة لتأهيلهم إداريًا وماليًا.
3. إعادة تقييم الهيكل المالي للحد من الالتزامات وتحسين السيولة.
4. توثيق كافة الاتفاقيات والوصايا أمام الجهات القانونية المختصة.
`;

  return (
    <div className="bg-[#FAF3F0] min-h-screen flex flex-col justify-between font-sans print:bg-white">
      <header className="py-4 bg-white shadow-md text-center print:hidden">
        <Image src="/logo12.png" alt="شعار ميراث" width={200} height={40} className="mx-auto" />
      </header>

      <hr className="border-t border-[#002F3E] w-full print:hidden" />

      <main className="max-w-5xl mx-auto space-y-8 px-4 pt-10 pb-28 print:pb-10">
        <h1 className="text-3xl font-bold text-center text-[#002F3E] print:mt-10 print:text-2xl">
          التقرير الاستشاري لتحليل انتقال الملكية
        </h1>

        <section className="bg-[#F1ECEA] rounded-xl shadow p-6 space-y-4 leading-loose print:shadow-none print:border print:border-gray-300">
          <h2 className="text-xl font-semibold text-[#002F3E] border-b pb-2">
            القسم الأول: التقرير الرسمي
          </h2>
          <div className="whitespace-pre-line text-gray-800">
            {fullReport}
          </div>
        </section>

        <section className="bg-[#F1ECEA] border border-[#E3D9D6] rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-[#002F3E] border-b pb-2">
            القسم الثاني: الذكاء والتحليل الرقمي
          </h2>
          <ul className="space-y-2 text-gray-800">
            <li className="flex items-center gap-2">
              <span>⚠️</span> مستوى المخاطر في انتقال الملكية: <strong>متوسط</strong>
            </li>
            <li className="flex items-center gap-2">
              <span>📊</span> جاهزية الانتقال: {readiness} / 100
            </li>
            <li className="flex items-start gap-2">
              <span>🛑</span>
              <span>
                <strong>نقطة الضعف الرئيسية:</strong><br />
                غياب خطة انتقال واضحة يهدد استقرار الإدارة.
              </span>
            </li>
          </ul>

          <div className="w-full bg-gray-200 h-3 rounded mt-2">
            <div className="h-3 bg-[#C97C5D] rounded" style={{ width: `${readiness}%` }} />
          </div>
          <p className="text-sm text-gray-600 mt-1">جاهزية الانتقال: {readiness}%</p>
        </section>

        <section className="bg-[#F1ECEA] rounded-xl shadow p-6 space-y-4 print:hidden">
          <h2 className="text-xl font-semibold text-[#002F3E]">القسم الثالث : الواجهة البصرية للتقرير</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">توزيع الورثة</h3>
              <PieChart width={300} height={200}>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {pieData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div>
              <h3 className="font-bold mb-2">الأرباح السنوية</h3>
              <BarChart width={300} height={200} data={barData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="profit" fill="#C97C5D" />
              </BarChart>
            </div>
          </div>
        </section>

        <div className="flex justify-between mt-8 print:hidden">
          <button onClick={() => router.push('/')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            العودة للرئيسية
          </button>
          <button onClick={handlePrint} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            طباعة التقرير
          </button>
        </div>
      </main>

      <footer className="bg-[#002F3E] text-white text-center text-sm py-4 print:hidden">
        © 2025 منصة ميراث. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
