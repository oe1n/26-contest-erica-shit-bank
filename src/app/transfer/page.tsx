"use client";

import { MainLayout } from "@/components/MainLayout";
import { useBankStore } from "@/store/bankStore";
import { InlineAdCasino } from "@/components/AdBanners";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TransferSelectAccountPage() {
  const { isLoggedIn, accounts } = useBankStore();
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <MainLayout>
        <div className="bg-white p-5 text-center" style={{ border: "2px ridge #808080" }}>
          <div className="text-[40px] mb-3">🔒</div>
          <div className="text-[14px] font-bold text-[#000080] mb-3">로그인이 필요한 서비스입니다</div>
          <button className="btn-submit py-2 px-6 text-[13px]" onClick={() => router.push("/")}>로그인 페이지로 이동</button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-[#800000] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          💸 계좌이체 — 1단계: 출금계좌 선택
        </div>

        <div className="bg-yellow-50 p-2 mb-3 text-[10px] text-yellow-800" style={{ border: "1px solid #ffc107" }}>
          ⚠ 이체할 출금계좌를 선택해 주세요.
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {accounts.map((a) => (
            <Link
              key={a.id}
              href={`/transfer/password?from=${a.id}`}
              className="block bg-white p-3 no-underline text-[#000080] hover:bg-blue-50 transition-colors"
              style={{ border: "2px outset #c0c0c0" }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[13px] font-bold">{a.name}</div>
                  <div className="text-[10px] text-gray-600 font-mono">{a.number} ({a.type})</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-bold">{a.balance.toLocaleString()}원</div>
                  <div className="text-[9px] text-gray-500">이 계좌에서 출금 ▶</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/"><button className="btn-90s">← 메인으로</button></Link>
      </div>

      <InlineAdCasino />
    </MainLayout>
  );
}
