'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Scenario {
  label: string;
  percentage: number;
  description: string;
}

export default function AnalysisResultsPage() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [rawText, setRawText] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const result = localStorage.getItem('analysisResult');
    if (result) {
      try {
        const parsed = JSON.parse(result);
        const data = parsed.result || parsed;

        if (Array.isArray(data)) {
          setScenarios(data);
        } else if (typeof data === 'string') {
          setRawText(data);
        } else {
          console.warn('صيغة غير مدعومة:', data);
        }
      } catch (error) {
        console.error('خطأ في تحليل البيانات:', error);
      }
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className="bg-[#F1ECEA] min-h-screen font-sans text-right">
      <header className="bg-white shadow-md p-4 flex justify-between items-center print:flex print:justify-between print:shadow-none">
        <Image src="/logo12.png" alt="شعار ميراث" width={120} height={40} />
        <h1 className="text-[#002F3E] text-2xl font-bold">نتائج التحليل</h1>
      </header>

      {/* المحتوى */}
      <main className="max-w-5xl mx-auto p-6">
        <p className="text-[#333] mb-6 leading-relaxed">
تم إعداد التحليل وفق نموذج ذكي يجمع بين حوكمة الشركات العائلية والتجارب التشغيلية لـ 500 شركة تجاوزت تحديات النمو والاستدامة.

        </p>

        {scenarios.length > 0 ? (
          scenarios.map((item, idx) => (
            <section key={idx} className="mb-8 print:break-inside-avoid">
              <h2 className="font-bold mb-3 text-lg text-[#002F3E]">{item.label}</h2>
              <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center print:border print:shadow-none print:p-2">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-8 border-[#002F3E] flex items-center justify-center text-xl font-bold text-[#002F3E] print:border-4">
                    %{item.percentage}
                  </div>
                  <p className="mt-2 text-sm text-[#666] print:text-xs">نسبة نجاح التحليل</p>
                </div>
                <p className="w-3/4 text-[#444] leading-loose bg-[#E4DAD6] p-4 rounded-md print:bg-white print:text-black print:p-2 print:border">
                  {item.description}
                </p>
              </div>
            </section>
          ))
        ) : rawText ? (
          <div className="bg-white p-6 rounded-md shadow text-[#333] leading-relaxed whitespace-pre-wrap print:text-black print:shadow-none print:p-2">
            {rawText}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">لا توجد نتائج متاحة حاليًا.</p>
        )}

        {/* التوقيع الرسمي (للطباعة فقط) */}
        <div className="hidden print:block mt-16 text-[#333]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-base font-semibold">المستشار التنفيذي</p>
              <p className="mt-2">منصة ميراث لتحليل الشركات العائلية</p>
              <p className="mt-2">التاريخ: {new Date().toLocaleDateString('ar-EG')}</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/sing-logo.png" alt="ختم رسمي" width={100} height={100} />
            </div>
          </div>
        </div>
      </main>

      {/* الأزرار */}
      <div className="flex justify-center gap-4 my-8 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-[#002F3E] text-white px-6 py-2 rounded hover:bg-[#01485c] transition"
        >
          📄 طباعة التقرير
        </button>
        <button
          onClick={goToHome}
          className="bg-white border border-[#002F3E] text-[#002F3E] px-6 py-2 rounded hover:bg-gray-100 transition"
        >
          ⬅ العودة للرئيسية
        </button>
      </div>

      {/* الفوتر */}
      <footer className="bg-[#022A3C] text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 items-start">
          {/* Contact */}
          <div>
            <h4 className="font-bold mb-2">تواصل معنا</h4>
            <p>8001208000</p>
            <div className="flex gap-4 mt-2">
             
              <a href="https://instagram.com" target="_blank">
                <Image src="/instagram.png" alt="Instagram" width={16} height={16} />
              </a>
              <a href="https://twitter.com" target="_blank">
                <Image src="/twitter.png" alt="X" width={16} height={16} />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <Image src="/linkedin.png" alt="LinkedIn" width={16} height={16} />
              </a>
            </div>
          </div>
      
          {/* Services */}
          <div>
            <h4 className="font-bold mb-2">الخدمات</h4>
            <ul className="space-y-1">
              <li>تحليل ورثة ذكي</li>
              <li>مراجعة سيناريوهات التوزيع</li>
              <li>تقارير نهائية جاهز للطباعة</li>
            </ul>
          </div>
      
          {/* About */}
          <div>
            <h4 className="font-bold mb-2">عن ميراث</h4>
            <ul className="space-y-1">
              <li>الرؤية والرسالة</li>
              <li>الأثر</li>
              <li>خدمة ذوي الورثة وكبار السن</li>
              <li>حماية العملاء</li>
            </ul>
          </div>
      
          {/* Logo on the left */}
          <div className="flex justify-end sm:justify-start">
            <Image src="/logo.png" alt="شعار ميراث" width={350} height={5} />
          </div>
        </div>
      
        {/* Bottom text */}
        <div className="text-xs text-center mt-8 text-gray-300">
          مصرف الإنماء | شركة مساهمة سعودية | خاضعة لرقابة وإشراف البنك المركزي السعودي | سجل 1010250808<br />
          رأس مال 25,000,000,000 ريال | العنوان: الرياض 8/أ حي العليا | الهاتف: 966112185555+ | الفاكس: 966112185555+
        </div>
      </footer>
    </div>
  );
}
