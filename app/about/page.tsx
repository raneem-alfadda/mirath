'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const faqs = [
  { question: 'ما الهدف من منصة ميراث؟', answer: 'المنصة تهدف إلى تسهيل توزيع الإرث التجاري في الشركات العائلية بطريقة عادلة وذكية.' },
  { question: 'هل تتوافق المنصة مع الشريعة الإسلامية؟', answer: 'نعم، يتم بناء التحليل بناءً على البيانات المدخلة وتوصيات تتوافق مع أحكام الشريعة.' },
  { question: 'هل يمكن الاعتماد على النتائج قانونيًا؟', answer: 'المنصة تقدم استشارات مساعدة ولا تغني عن الاستشارة القانونية الرسمية.' },
  { question: 'هل توفر المنصة تقارير قابلة للطباعة؟', answer: 'نعم، يمكن تنزيل التقرير بصيغة PDF بعد التحليل.' },
  { question: 'هل يمكن استخدام المنصة للأفراد وليس الشركات فقط؟', answer: 'المنصة مخصصة بشكل رئيسي للشركات العائلية، ولكن يمكن تخصيصها للحالات الفردية إذا لزم الأمر.' },
];

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="bg-[#F1ECEA] font-sans text-[#333] min-h-screen flex flex-col justify-between">
      
      {/* Header */}
      <header className="bg-white shadow-md p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo12.png" alt="شعار ميراث" width={200} height={50} />
        </Link>
      </header>

      {/* تعريف المنصة */}
      <section className="max-w-6xl mx-auto py-10 px-6 flex flex-col md:flex-row items-center gap-8">
        <Image src="/logo.png" alt="شعار ميراث" width={400} height={300} />
        <div className="bg-[#F1ECEA] border border-[#e0dcd9] rounded-xl p-6 w-full shadow-md">
          <p className="text-lg leading-relaxed text-right">
            منصة ميراث هي منصة ذكية صممت لدعم العائلات في إدارة وتوزيع الإرث التجاري بعد وفاة المؤسس.
            تعتمد على تحليل البيانات باستخدام نظام خبير لتقديم سيناريوهات عادلة ومتوازنة تحافظ على استقرار الشركة وحقوق الورثة.
          </p>
        </div>
      </section>

      {/* الأسئلة الشائعة */}
      <section className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold text-[#002F3E] mb-6 text-right">الأسئلة الشائعة</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 rounded-xl shadow-sm border border-[#D6D2CD] overflow-hidden bg-white transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-right px-6 py-4 font-semibold text-[#333] hover:bg-[#f8f8f8] transition-all"
            >
              {faq.question}
            </button>
            <div
              className={`px-6 bg-[#F9F9F9] text-sm text-[#555] transition-all duration-300 ${
                openIndex === index ? 'max-h-40 py-4 border-t border-[#ccc]' : 'max-h-0 py-0 overflow-hidden'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
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
            <ul className="space-y-1 text-sm">
              <li>تحليل ورثة ذكي</li>
              <li>مراجعة سيناريوهات التوزيع</li>
              <li>تقارير نهائية جاهز للطباعة</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold mb-2">عن ميراث</h4>
            <ul className="space-y-1 text-sm">
              <li>الرؤية والرسالة</li>
              <li>الأثر</li>
              <li>خدمة ذوي الورثة وكبار السن</li>
              <li>حماية العملاء</li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex justify-end sm:justify-start">
            <Image src="/logo.png" alt="شعار ميراث" width={350} height={5} />
          </div>
        </div>

        <div className="text-xs text-center mt-8 text-gray-300">
          مصرف الإنماء | شركة مساهمة سعودية | خاضعة لرقابة وإشراف البنك المركزي السعودي | سجل 1010250808<br />
          رأس مال 25,000,000,000 ريال | العنوان: الرياض 8/أ حي العليا | الهاتف: 966112185555+ | الفاكس: 966112185555+
        </div>
      </footer>
    </div>
  );
}
