'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/"); // ينقلك لصفحة البداية
  };

  return (
    <div className="font-sans min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#022A3C] to-[#398282] text-white">
      <header className="px-6 py-4 flex items-center justify-between">
        <Image src="/logo.png" alt="ميراث" width={160} height={60} />
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="bg-white text-[#022A3C] rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">التسجيل في ميراث</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-semibold">رقم الهوية</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#398282]"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">كلمة المرور</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#398282]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#398282] text-white py-2 rounded font-semibold hover:bg-[#2e6d6d] transition"
            >
              تسجيل
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="mb-2">أو</p>
            <a
              href="https://www.iam.gov.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-[#398282] text-[#398282] py-2 rounded font-semibold hover:bg-[#e5f5f5] transition"
            >
              التسجيل عبر نفاذ
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
   <footer className="bg-[#022A3C] text-white py-10 px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:flex sm:flex-row-reverse items-start justify-between">
    {/* Logo Section - جهة اليمين */}
    <div className="flex flex-col items-start sm:items-end">
      <Image src="/logo.png" alt="ميراث" width={350} height={5} />
      <span className="text-sm mt-1 text-gray-300">alinma</span>
    </div>

    {/* Services */}
    <div className="text-sm space-y-1">
      <h4 className="font-bold mb-2 text-base">الخدمات</h4>
      <ul className="space-y-1">
        <li>تحليل ورثة ذكي</li>
        <li>مراجعة سيناريوهات التوزيع</li>
        <li>تقارير نهائية جاهز للطباعة</li>
      </ul>
    </div>

    {/* About */}
    <div className="text-sm space-y-1">
      <h4 className="font-bold mb-2 text-base">عن ميراث</h4>
      <ul className="space-y-1">
        <li>الرؤية والرسالة</li>
        <li>الأثر</li>
        <li>خدمة ذوي الورثة وكبار السن</li>
        <li>حماية العملاء</li>
      </ul>
    </div>

    {/* Contact */}
    <div className="text-sm space-y-2">
      <h4 className="font-bold mb-2 text-base">تواصل معنا</h4>
      <p>8001208000</p>
      <div className="flex gap-4 text-white text-xl">
        <a href="https://www.linkedin.com" target="_blank"><Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} /></a>
        <a href="https://x.com" target="_blank"><Image src="/twitter.png" alt="X" width={20} height={20} /></a>
        <a href="https://www.instagram.com" target="_blank"><Image src="/instagram.png" alt="Instagram" width={20} height={20} /></a>
      </div>
    </div>
  </div>

  {/* Bottom Text */}
  <div className="text-xs text-center mt-10 text-gray-300 leading-relaxed">
    مصرف الإنماء | شركة مساهمة سعودية | خاضعة لرقابة وإشراف البنك المركزي السعودي | سجل 1010250808<br />
    رأس مال 25,000,000,000 ريال | العنوان: الرياض 8/أ حي العليا | الهاتف: +966112185555 | الفاكس: +966112185555
  </div>
</footer>

    </div>
  );
}
