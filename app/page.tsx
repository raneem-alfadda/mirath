'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const services = [
  {
    icon: '/icon-inheritance.png',
    title: 'تحليل هيكلي للورثة وربطهم بالكيان التجاري ',
  },
  {
    icon: '/icon-review.png',
    title: '   تكامل مباشر وآمن مع أنظمة المصرف   ',
  },
  {
    icon: '/icon-report.png',
    title: ' اصدار تقارير معتمدة للطباعة والتوثيق  ',
  },
];

export default function AboutPage() {
  return (
    <div className="font-sans">
      {/* Header */}
<header className="bg-[#022A3C] px-6 py-4 flex items-center justify-between">
  {/* أزرار التنقل في اليمين */}
  <div className="flex gap-4">
    <a href="/about">
      <button className="text-[#398282] border border-[#398282] rounded px-4 py-1 hover:bg-[#398282] hover:text-white transition">
        عن المنصة
      </button>
    </a>
    <a href="/register">
      <button className="text-[#398282] border border-[#398282] rounded px-4 py-1 hover:bg-[#398282] hover:text-white transition">
        تسجيل دخول
      </button>
    </a>
  </div>

  {/* الشعار في اليسار */}
  <Image src="/logo.png" alt="ميراث" width={160} height={60} />
</header>
<section className="bg-gradient-to-b from-[#022A3C] to-[#398282] text-white px-6 pt-24 pb-32 relative font-sans overflow-hidden">
  {/* العنوان والصورة */}
  <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">

    {/* يسار - كلمة ميراث */}
    <div className="w-1/3 flex justify-end items-start text-right pr-4">
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[80px] font-extrabold mt-[-40px]"
      >
        ميراث
      </motion.h1>
    </div>

    {/* الوسط - صورة الرجل */}
    <div className="w-1/3 flex justify-center items-center relative z-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Image src="/man.png" alt="رجل" width={240} height={360} />
      </motion.div>
    </div>

    {/* يمين - مستقبل + الأجيال */}
    <div className="w-1/3 flex flex-col justify-center items-start text-left space-y-2 pl-4">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[72px] font-extrabold leading-tight"
      >
        مستقبل
      </motion.h2>

      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-[64px] font-extrabold -mt-4 relative left-10"
      >
        الأجيال
      </motion.h2>
    </div>
  </div>

  {/* النص التوضيحي والزر */}
  <div className="mt-20 text-center">
    <p className="text-lg md:text-xl font-medium mb-6 leading-relaxed">
      بتكامل الأجيال واستدامة التنمية، نمضي معًا بطريق المستقبل
    </p>
<a href="/analyze">
  <button
    className="bg-white text-[#022A3C] px-12 py-5 rounded-lg text-2xl font-bold shadow-md 
               hover:bg-gray-100 hover:scale-105 "
  >
    ابدأ استشارتك
  </button>
</a>



  </div>
</section>




      {/* Services Section */}
      <section className="bg-[#FAF3F0] py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">   ما الذي تقدمه لك منصة ميراث؟</h2>
        <p className="text-gray-500 mb-8">تجربة استشارية مالية  سهلة، دقيقة، ومبنية على منطق عادل.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#F1ECEA] rounded-2xl p-6 transition duration-300 hover:bg-[#e7dedc] hover:shadow-md cursor-pointer"
            >
              <Image src={service.icon} alt={service.title} width={50} height={50} className="mx-auto" />
              <h3 className="mt-4 font-semibold text-[#022A3C]">{service.title}</h3>
            </motion.div>
          ))}
        </div>
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
      <ul className="space-y-1">
        <li> تحليل الورثة </li>
        <li>ربط مصرفي   </li>
        <li>تقارير موثقة   </li>
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
