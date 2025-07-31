'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AnalyzePage() {
  const [step, setStep] = useState(1);

  const [heirs, setHeirs] = useState([
    {
      name: '',
      age: '',
      type: '',
      wantsInheritance: '',
      cvFile: null,
      jobTitle: '',
      isEmployee: '',
      salary: '',
      responsibilities: '',
    },
  ]);
  const [partners, setPartners] = useState([{ name: '', share: '' }]);
  const [companyName, setCompanyName] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [partnerCount, setPartnerCount] = useState('');
  const [fullOwnership, setFullOwnership] = useState('');
  const [willInstructions, setWillInstructions] = useState('');
  const [capital, setCapital] = useState('');
  const [annualProfit, setAnnualProfit] = useState('');
  const [expenses, setExpenses] = useState('');
  const [isListed, setIsListed] = useState('');
  const [ceo, setCeo] = useState('');
  const [boardMembers, setBoardMembers] = useState('');

  const router = useRouter();

  const handleAnalysis = async () => {
    const userData = {
      heirs,
      companyName,
      industryType,
      partnerCount,
      fullOwnership,
      partners,
      willInstructions,
      capital,
      annualProfit,
      expenses,
      isListed,
      ceo,
      boardMembers,
      cvFiles: heirs.map((h) => h.cvFile?.name || null),
    };

    const prompt = '...'; // skipped for brevity

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('فشل الاتصال بالـ API');

      const data = await res.json();
      localStorage.setItem('analysisResult', JSON.stringify(data.result));
      router.push('/results');
    } catch (error) {
      console.error('فشل التحليل:', error);
      alert('فشل التحليل. تأكد من الاتصال بالإنترنت أو إعدادات الخادم.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F1ECEA] px-6 py-10 font-sans text-right text-black">
      <div className="flex justify-center mb-6">
        <Image src="/logo.png" alt="شعار ميراث" width={120} height={60} />
      </div>

      <h1 className="text-center font-bold mb-8 text-4xl">نموذج إدخال بيانات التحليل</h1>

      {step === 1 && (
        <div className="mb-6 border p-4 rounded bg-white text-black animate-fade-in">
          <h3 className="font-bold mb-4 text-lg">بيانات الشركة:</h3>
          <input className="w-full mb-2 border p-2 rounded" placeholder="اسم الشركة/المؤسسة" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          <input className="w-full mb-2 border p-2 rounded" placeholder="نوع النشاط" value={industryType} onChange={(e) => setIndustryType(e.target.value)} />
          <input className="w-full mb-2 border p-2 rounded" placeholder="عدد الشركاء الحاليين" type="number" value={partnerCount} onChange={(e) => setPartnerCount(e.target.value)} />
          <select className="w-full mb-2 border p-2 rounded" value={fullOwnership} onChange={(e) => setFullOwnership(e.target.value)}>
            <option value="">هل الشركة مملوكة 100% للمؤسس؟</option>
            <option value="yes">نعم</option>
            <option value="no">لا</option>
          </select>
          <input className="w-full mb-2 border p-2 rounded" placeholder="رأس مال الشركة" value={capital} onChange={(e) => setCapital(e.target.value)} />
          <input className="w-full mb-2 border p-2 rounded" placeholder="الأرباح السنوية" value={annualProfit} onChange={(e) => setAnnualProfit(e.target.value)} />
          <input className="w-full mb-2 border p-2 rounded" placeholder="المصروفات السنوية" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
          <input className="w-full mb-2 border p-2 rounded" placeholder="هل الشركة مدرجة في السوق؟" value={isListed} onChange={(e) => setIsListed(e.target.value)} />
          <input className="w-full mb-2 border p-2 rounded" placeholder="اسم الرئيس التنفيذي الحالي" value={ceo} onChange={(e) => setCeo(e.target.value)} />
          <textarea className="w-full mb-2 border p-2 rounded" placeholder="أسماء أعضاء مجلس الإدارة" value={boardMembers} onChange={(e) => setBoardMembers(e.target.value)} />

          <div className="text-center mt-4">
            <button onClick={() => setStep(2)} className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800">
              التالي
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          {heirs.map((heir, index) => (
            <div key={index} className="mb-4 border p-4 rounded bg-white text-black">
              <h3 className="font-bold mb-2">بيانات الوريث {index + 1}:</h3>
              <input className="w-full mb-2 border p-2 rounded" placeholder="اسم الوريث" value={heir.name} onChange={(e) => { const newHeirs = [...heirs]; newHeirs[index].name = e.target.value; setHeirs(newHeirs); }} />
              <input className="w-full mb-2 border p-2 rounded" placeholder="العمر" type="number" value={heir.age} onChange={(e) => { const newHeirs = [...heirs]; newHeirs[index].age = e.target.value; setHeirs(newHeirs); }} />
              <input className="w-full mb-2 border p-2 rounded" placeholder="نوع القرابة" value={heir.type} onChange={(e) => { const newHeirs = [...heirs]; newHeirs[index].type = e.target.value; setHeirs(newHeirs); }} />
              <select className="w-full mb-2 border p-2 rounded" value={heir.wantsInheritance} onChange={(e) => { const newHeirs = [...heirs]; newHeirs[index].wantsInheritance = e.target.value; setHeirs(newHeirs); }}>
                <option value="">هل يرغب في الاستمرار في الشركة؟</option>
                <option value="yes">نعم</option>
                <option value="no">لا</option>
              </select>
              <input className="w-full mb-2 border p-2 rounded" placeholder="المنصب الحالي" value={heir.jobTitle} onChange={(e) => { const newHeirs = [...heirs]; newHeirs[index].jobTitle = e.target.value; setHeirs(newHeirs); }} />
              <input className="w-full mb-2 border p-2 rounded" placeholder="هل هو موظف؟ (نعم / لا)" value={heir.isEmployee} onChange={(e) => { const newHeirs = [...heirs]; newHeirs[index].isEmployee = e.target.value; setHeirs(newHeirs); }} />
              <input className="w-full mb-2 border p-2 rounded" placeholder="الراتب الشهري" value={heir.salary} onChange={(e) => { const newHeirs = [...heirs]; newHeirs[index].salary = e.target.value; setHeirs(newHeirs); }} />
              <textarea className="w-full mb-2 border p-2 rounded" placeholder="المسؤوليات الحالية" value={heir.responsibilities} onChange={(e) => { const newHeirs = [...heirs]; newHeirs[index].responsibilities = e.target.value; setHeirs(newHeirs); }} />
              <input type="file" accept=".pdf,.doc,.docx" className="w-full mt-2 border p-2 rounded" onChange={(e) => { const newHeirs = [...heirs]; newHeirs[index].cvFile = e.target.files?.[0] || null; setHeirs(newHeirs); }} />
              <p className="text-sm text-gray-600 mt-1">يمكنك إرفاق السيرة الذاتية (PDF أو Word)</p>
            </div>
          ))}

          <div className="text-center mt-4">
            <button onClick={() => setHeirs([...heirs, {
              name: '', age: '', type: '', wantsInheritance: '', cvFile: null, jobTitle: '', isEmployee: '', salary: '', responsibilities: ''
            }])} className="mb-6 bg-gray-200 px-4 py-1 rounded hover:bg-gray-300">
              + إضافة وريث آخر
            </button>
          </div>

          <div className="text-center mt-8">
            <button onClick={handleAnalysis} className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800">
              بدء التحليل
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
