'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';

interface HeirData {
  name: string;
  value: number;
}

export default function OutputPage() {
  const [data, setData] = useState<any>(null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('analysisData');
    const gptStored = localStorage.getItem('analysisResult');

    if (stored) setData(JSON.parse(stored));
    if (gptStored) {
      try {
        const parsed = JSON.parse(gptStored);
        if (typeof parsed === 'string') setAiReport(parsed);
        else if (typeof parsed.result === 'string') setAiReport(parsed.result);
        else if (parsed.analysis) setAiReport(parsed.analysis);
      } catch {
        console.warn('Failed to parse GPT report');
      }
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!data) return <div className="p-10 text-center">جاري تحميل البيانات...</div>;

  const riskMatch = aiReport?.match(/مستوى المخاطر.*?[:\-]\s*(.+)/);
  const readinessMatch = aiReport?.match(/جاهزية الانتقال.*?[:\-]\s*(\d+)/);

  const riskScore = riskMatch ? riskMatch[1].trim() : 'غير محدد';
  const readiness = readinessMatch ? parseInt(readinessMatch[1]) : 0;

  const weaknessMatch = aiReport?.match(/نقطة الضعف.*?[:\-]\s*(.+)/);
  const weakness = weaknessMatch ? weaknessMatch[1].trim() : null;

  const pieData: HeirData[] = data.heirs?.map((heir: any) => ({
    name: heir.name || 'وريث',
    value: 1
  })) || [];

  const barData = [
    { year: '2021', profit: parseFloat(data.profit2021 || 0) },
    { year: '2022', profit: parseFloat(data.profit2022 || 0) },
    { year: '2023', profit: parseFloat(data.annualProfit || 0) },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a0d911', '#fa541c'];

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

        {aiReport && (
          <section className="bg-[#F1ECEA] rounded-xl shadow p-6 space-y-4 leading-loose print:shadow-none print:border print:border-gray-300">
            <h2 className="text-xl font-semibold text-[#002F3E] border-b pb-2">القسم الأول: التقرير الرسمي</h2>
            <div className="whitespace-pre-line text-gray-800">{aiReport}</div>
          </section>
        )}

        <section className="bg-[#F1ECEA] border border-[#E3D9D6] rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-[#002F3E] border-b pb-2">
            التحليل المالي باستخدام الذكاء الاصطناعي (نموذج استشاري)
          </h2>

          <ul className="space-y-2 text-gray-800">
            <li className="flex items-center gap-2">
              <span>⚠️</span> مستوى المخاطر في انتقال الملكية: <strong>{riskScore}</strong>
            </li>
            <li className="flex items-center gap-2">
              <span>📊</span> جاهزية الانتقال: {readiness} / 100
            </li>
            {weakness && (
              <li className="flex items-start gap-2">
                <span>🛑</span>
                <span>
                  <strong>نقطة الضعف الرئيسية:</strong><br />
                  {weakness}
                </span>
              </li>
            )}
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
                  {pieData.map((entry, i) => (
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
