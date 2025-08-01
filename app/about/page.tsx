'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="bg-[#F1ECEA] font-sans text-[#333] min-h-screen flex flex-col justify-between">

      {/* Header */}
      <header className="bg-[#E9E4E1] shadow-md p-6 flex flex-col items-center justify-center text-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo12.png" alt="شعار ميراث" width={200} height={50} />
        </Link>
      </header>

      {/* تعريف المنصة */}
      <section className="max-w-6xl mx-auto py-10 px-6 text-right">
        <div className="bg-[#F1ECEA] border border-[#e0dcd9] rounded-xl p-6 w-full shadow-md leading-relaxed">
          <h2 className="text-2xl font-bold text-[#002F3E] mb-4">منصة ميراث – شراكة استراتيجية مع البنك</h2>
          <p>
            منصة ميراث هي مبادرة تقنية متقدمة، طُورت لتكون أداة ذكية داعمة للبنك في معالجة تحديات الإرث التجاري داخل الشركات العائلية.
            تهدف المنصة إلى تقديم تحليلات احترافية وسيناريوهات توزيع عادلة، مما يتيح للبنك تعزيز دوره الاستشاري، وتقليل النزاعات، وربط التوزيع مباشرة بالخدمات المصرفية.
            تعتمد المنصة على نظام خبير ونماذج ذكاء اصطناعي متوافقة مع الشريعة، وتُمكن البنك من تفعيل حلول مالية واقعية وقابلة للتنفيذ فوراً.
          </p>
        </div>
      </section>

      {/* الأسئلة الشائعة */}
      <section className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold text-[#002F3E] mb-4 border-b-2 w-fit pb-1">الأسئلة الشائعة من الجهات المصرفية</h2>
        {[
          { question: 'ما الفائدة الأساسية للبنك من المنصة؟', answer: 'تمكين البنك من تقديم خدمات استشارية ذكية مضافة لعملائه من الشركات العائلية، وتحقيق ربط مباشر مع توزيع التركات عبر الحسابات البنكية.' },
          { question: 'هل المنصة تدمج مع الأنظمة البنكية بسهولة؟', answer: 'نعم، تم تصميم المنصة لتكون قابلة للتكامل عبر API، وتُتيح تدفقات عمل سلسة داخل البنية التحتية للبنك.' },
          { question: 'هل التقارير صالحة كمرجع قانوني؟', answer: 'يتم إصدار التقرير بصيغة رسمية، ويمكن استخدامه كدعم استشاري داخل خدمات البنك، مع إمكانية مراجعته من القسم القانوني.' },
          { question: 'هل النظام متوافق مع الشريعة؟', answer: 'جميع التوصيات تعتمد على قواعد توزيع تتوافق مع أحكام الشريعة الإسلامية في الإرث التجاري.' },
          { question: 'هل يمكن تفعيل الحسابات البنكية تلقائيًا؟', answer: 'المنصة تدعم ذلك من خلال ربط الورثة مباشرة بحساباتهم، وفق سيناريو التوزيع المعتمد من البنك.' }
        ].map((faq, index) => (
          <div
            key={index}
            className="mb-4 rounded-xl shadow-sm border border-[#D6D2CD] overflow-hidden bg-white transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-right px-6 py-4 font-semibold text-[#333] hover:bg-[#f8f8f8] transition-all flex justify-between items-center"
            >
              <span>{faq.question}</span>
              <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
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
          <div>
            <h4 className="font-bold mb-2">جهة التواصل التنفيذي</h4>
            <p>الاسم: وحدة الابتكار – البنك</p>
            <p>الهاتف: 8001208000</p>
            <p>البريد الإلكتروني: advisory@bank.sa</p>
          </div>

      

          <div>
            <h4 className="font-bold mb-2">الامتثال والحوكمة</h4>
            <ul className="space-y-1 text-sm">
              <li>متوافق مع أنظمة البنك المركزي</li>
              <li>خاضع لمراجعة قانونية داخلية</li>
              <li>يعزز الشفافية وحوكمة الشركات</li>
            </ul>
          </div>

          <div className="justify-end sm:justify-start">
            <Image src="/logo.png" alt="شعار ميراث" width={450} height={5} />
          </div>
        </div>

        <div className="text-xs text-center mt-8 text-gray-300 leading-loose">
          مصرف الإنماء | شركة مساهمة سعودية | خاضعة لرقابة وإشراف البنك المركزي السعودي | سجل 1010250808<br />
          جميع حقوق النشر محفوظة © 2025 – منصة ميراث بالشراكة مع البنك
        </div>
      </footer>
    </div>
  );
}
