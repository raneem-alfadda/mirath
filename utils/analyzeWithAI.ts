export async function analyzeWithAI(prompt: string) {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error('فشل التحليل، تأكد من إعدادات الخادم');
  }

  const data = await res.json();
  return data.result;
}
