"use client";

import { MainLayout } from "@/components/MainLayout";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function CompleteContent() {
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg") || "이체가 완료되었습니다.";

  return (
    <MainLayout>
      <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-[#006600] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          ✅ 이체 완료
        </div>

        <div className="bg-green-50 p-4 mb-4 text-center" style={{ border: "2px inset #808080" }}>
          <div className="text-[30px] mb-2">✅</div>
          <div className="text-[13px] whitespace-pre-line leading-7">{msg}</div>
        </div>

        <div className="flex gap-2 justify-center">
          <Link href="/account"><button className="btn-submit py-2 px-6 text-[13px]">계좌조회</button></Link>
          <Link href="/transfer"><button className="btn-submit py-2 px-6 text-[13px]">추가이체</button></Link>
          <Link href="/"><button className="btn-90s py-2 px-5">메인으로</button></Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default function TransferCompletePage() {
  return (
    <Suspense fallback={<div className="text-center p-4 text-[12px]">로딩 중...</div>}>
      <CompleteContent />
    </Suspense>
  );
}
