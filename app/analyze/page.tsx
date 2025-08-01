'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ✅ تعريف نوع الوريث
type Heir = {
  name: string;
  age: string;
  relation: string;
};

export default function SmartInputWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showWillUpload, setShowWillUpload] = useState(false);

  // ✅ تعريف formData بشكل صريح
  const [formData, setFormData] = useState<{
    companyType: string;
    capital: string;
    totalAssets: string;
    totalLiabilities: string;
    annualProfit: string;
    profit2021: string;
    profit2022: string;
    cashFlow: string;
    heirCount: string;
    hasWill: string;
    willFile: File | null;
    willExcelFile: File | null;
    heirs: Heir[];
    heirsExcelFile: File | null;
    incomeStatement: string;
    balanceSheet: string;
    financialQuestionsFile: File | null;
  }>({
    companyType: '',
    capital: '',
    totalAssets: '',
    totalLiabilities: '',
    annualProfit: '',
    profit2021: '',
    profit2022: '',
    cashFlow: '',
    heirCount: '',
    hasWill: '',
    willFile: null,
    willExcelFile: null,
    heirs: [{ name: '', age: '', relation: '' }],
    heirsExcelFile: null,
    incomeStatement: '',
    balanceSheet: '',
    financialQuestionsFile: null,
  });

  const updateHeirCount = (count: number) => {
    const heirs = Array.from({ length: count }, (_, i) => formData.heirs[i] || { name: '', age: '', relation: '' });
    setFormData({ ...formData, heirCount: count.toString(), heirs });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index?: number, field?: keyof Heir) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'willFile' && files) {
      setFormData({ ...formData, willFile: files[0] });
    } else if (name === 'willExcelFile' && files) {
      setFormData({ ...formData, willExcelFile: files[0] });
    } else if (name === 'heirsExcelFile' && files) {
      setFormData({ ...formData, heirsExcelFile: files[0] });
    } else if (name === 'financialQuestionsFile' && files) {
      setFormData({ ...formData, financialQuestionsFile: files[0] });
    } else if (name === 'hasWill') {
      setShowWillUpload(value === 'نعم');
      setFormData({ ...formData, hasWill: value });
    } else if (index !== undefined && field) {
      const updated = [...formData.heirs];
      updated[index][field] = value;
      setFormData({ ...formData, heirs: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    const profitMargin = ((+formData.annualProfit / +formData.capital) * 100).toFixed(2);
    const liquidityRatio = (+formData.totalAssets / +formData.totalLiabilities).toFixed(2);
    const debtEquity = (+formData.totalLiabilities / +formData.capital).toFixed(2);

    const data = {
      ...formData,
      profitMargin,
      liquidityRatio,
      debtEquity,
    };

    try {
      const res = await fetch('/api/gpt-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      const result = await res.json();
      if (result?.analysis) {
        localStorage.setItem('analysisResult', JSON.stringify(result));
        router.push('/results');
      } else {
        alert('فشل التحليل. حاول مجددًا.');
      }
    } catch (err) {
      console.error(err);
      alert('خطأ في الاتصال بالخادم.');
    } finally {
      setLoading(false);
    }
  };

  const renderBotButton = () => (
    <div className="text-right mt-2">
      <button
        type="button"
        className="inline-flex items-center gap-2 bg-[#E6F2F7] text-[#002F3E] px-4 py-2 rounded-lg shadow hover:bg-[#d3ecf5] transition font-medium"
        onClick={() => alert('🚧 سيتم تفعيل المساعد الذكي قريبًا')}
      >
        <Image src="/bot.png" alt="Bot" width={20} height={20} />
        <span>المساعد الذكي</span>
      </button>
    </div>
  );

  const progressPercent = (step / 3) * 100;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#FBF5F3] to-[#F0EBE9] font-sans">
      <header className="py-4 bg-white shadow-md text-center">
        <Image src="/logo12.png" alt="شعار ميراث" width={100} height={40} className="mx-auto" />
        <h1 className="text-xl font-bold text-[#002F3E] mt-2">نموذج التحليل المالي</h1>
      </header>

      <hr className="border-t border-[#002F3E] w-full" />

      <div className="w-full bg-gray-200 h-2">
        <motion.div
          className="bg-[#002F3E] h-2"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <main className="container max-w-xl mx-auto px-4 py-8 flex-grow space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center text-sm text-gray-600 mb-2">الخطوة {step} من 3</div>

          {step === 1 && (
            <div className="space-y-4 bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold text-[#002F3E] mb-2">🧾 بيانات الشركة الأساسية</h2>
              <input name="companyType" onChange={handleChange} placeholder="نوع الشركة" className="w-full border p-3 rounded bg-[#F1ECEA]" />
              <input name="capital" onChange={handleChange} placeholder="رأس المال" className="w-full border p-3 rounded bg-[#F1ECEA]" />
              <input name="totalAssets" onChange={handleChange} placeholder="إجمالي الأصول" className="w-full border p-3 rounded bg-[#F1ECEA]" />
              <input name="totalLiabilities" onChange={handleChange} placeholder="إجمالي الالتزامات" className="w-full border p-3 rounded bg-[#F1ECEA]" />
              <label className="text-sm text-gray-500">(اختياري) يمكنك رفع ملف Excel لزيادة دقة التحليل:</label>
              <input type="file" name="companyExcelFile" onChange={handleChange} className="w-full border p-2 rounded bg-white text-sm" />
              {renderBotButton()}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold text-[#002F3E] mb-2"> بيانات الورثة والوصية</h2>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => updateHeirCount(Math.max(0, (+formData.heirCount || 0) - 1))} className="px-3 py-1 bg-[#002F3E] text-white rounded hover:bg-[#01485c]">-</button>
                <input type="number" name="heirCount" value={formData.heirCount} onChange={(e) => updateHeirCount(+e.target.value)} min="0" className="w-full text-center border p-3 rounded bg-[#F1ECEA]" />
                <button type="button" onClick={() => updateHeirCount((+formData.heirCount || 0) + 1)} className="px-3 py-1 bg-[#002F3E] text-white rounded hover:bg-[#01485c]">+</button>
              </div>
              {formData.heirs.map((heir, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input placeholder={`اسم وريث ${i + 1}`} value={heir.name} onChange={(e) => handleChange(e, i, 'name')} className="border p-2 rounded bg-[#F1ECEA]" />
                  <input placeholder="العمر" value={heir.age} onChange={(e) => handleChange(e, i, 'age')} className="border p-2 rounded bg-[#F1ECEA]" />
                  <input placeholder="صلة القرابة" value={heir.relation} onChange={(e) => handleChange(e, i, 'relation')} className="border p-2 rounded bg-[#F1ECEA]" />
                </div>
              ))}
              <select name="hasWill" onChange={handleChange} className="w-full border p-3 rounded bg-[#F1ECEA]">
                <option value="">هل توجد وصية؟</option>
                <option value="نعم">نعم</option>
                <option value="لا">لا</option>
              </select>
              {showWillUpload && (
                <>
                  <input type="file" name="willExcelFile" onChange={handleChange} className="w-full border p-2 rounded bg-white text-sm" />
                </>
              )}
              {renderBotButton()}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold text-[#002F3E] mb-2">📂 القوائم المالية وتحليلها</h2>
              <textarea name="incomeStatement" onChange={handleChange} placeholder="ملخص قائمة الدخل (مثلاً: الإيرادات، المصروفات، صافي الربح)" className="w-full border p-3 rounded bg-[#F1ECEA]" />
              <textarea name="balanceSheet" onChange={handleChange} placeholder="الميزانية العمومية (مثلاً: الأصول، الالتزامات، حقوق الملكية)" className="w-full border p-3 rounded bg-[#F1ECEA]" />
              <label className="text-sm text-gray-500">(اختياري) يمكنك رفع ملف Excel للقوائم المالية لتحليل أدق:</label>
              <input type="file" name="financialQuestionsFile" onChange={handleChange} className="w-full border p-2 rounded bg-white text-sm" />
              {renderBotButton()}
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            {step > 1 ? (
              <button onClick={handleBack} className="bg-white border text-[#002F3E] px-4 py-2 rounded hover:bg-gray-100">← رجوع</button>
            ) : <div />}

            {step < 3 ? (
              <button onClick={handleNext} className="bg-[#002F3E] text-white px-6 py-2 rounded hover:bg-[#01485c]">التالي →</button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
                {loading ? 'جاري التحليل...' : 'تحليل البيانات'}
              </button>
            )}
          </div>
        </motion.div>
      </main>

      <footer className="bg-[#002F3E] text-white text-center text-sm py-4">
        © 2025 منصة ميراث. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}

