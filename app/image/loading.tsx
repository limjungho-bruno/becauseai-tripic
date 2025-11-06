
// components/ImagePageLoading.tsx (클라이언트 컴포넌트 또는 단순 HTML)
"use client"; // CSS 애니메이션이나 훅을 사용한다면 필요

import { Loader2 } from 'lucide-react'; // 로딩 아이콘 예시

export default function ImagePageLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
      <p className="text-lg text-slate-600 dark:text-slate-400">여행 경험 데이터를 불러오는 중...</p>
    </div>
  );
}