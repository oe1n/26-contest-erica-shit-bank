"use client";

import { MainLayout } from "@/components/MainLayout";
import { useBankStore } from "@/store/bankStore";
import { InlineAdLoan } from "@/components/AdBanners";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function DetailContent() {
  const { isLoggedIn, accounts } = useBankStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountId = searchParams.get("id") || "";
  const account = accounts.find((a) => a.id === accountId);

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

  if (!account) {
    return (
      <MainLayout>
        <div className="bg-white p-5 text-center" style={{ border: "2px ridge #808080" }}>
          <div className="text-[14px] font-bold text-red-600 mb-3">계좌를 찾을 수 없습니다</div>
          <button className="btn-submit" onClick={() => router.push("/account")}>계좌 목록으로</button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-[#800000] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          📋 거래 내역 — {account.name} ({account.number})
        </div>

        <div className="bg-blue-50 p-2 mb-3 text-[11px]" style={{ border: "1px solid #99c" }}>
          계좌종류: {account.type} | 현재 잔액: <b className="text-[14px] text-red-600">{account.balance.toLocaleString()}</b>원
        </div>

        <table className="w-full bg-white text-[11px] mb-3" style={{ border: "2px inset #808080", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["날짜", "구분", "금액", "잔액", "적요"].map((h) => (
                <th key={h} className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {account.transactions.map((t) => (
              <tr key={t.id}>
                <td className="p-1 text-center" style={{ border: "1px solid #d0d0d0" }}>{t.date}</td>
                <td className="p-1 text-center" style={{ border: "1px solid #d0d0d0" }}>
                  <span className={t.type === "입금" ? "text-blue-600" : "text-red-600"}>{t.type}</span>
                </td>
                <td className="p-1 text-right" style={{ border: "1px solid #d0d0d0" }}>
                  <span className={t.type === "입금" ? "text-blue-600" : "text-red-600"}>
                    {t.type === "입금" ? "+" : "-"}{t.amount.toLocaleString()}
                  </span>
                </td>
                <td className="p-1 text-right font-mono" style={{ border: "1px solid #d0d0d0" }}>{t.balance.toLocaleString()}</td>
                <td className="p-1" style={{ border: "1px solid #d0d0d0" }}>{t.memo}{t.target ? ` (${t.target})` : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-2">
          <Link href="/account"><button className="btn-90s">← 계좌 목록</button></Link>
          <Link href="/transfer"><button className="btn-submit">이체하기</button></Link>
          <Link href="/"><button className="btn-90s">메인으로</button></Link>
        </div>
      </div>

      <InlineAdLoan />
    </MainLayout>
  );
}

export default function AccountDetailPage() {
  return (
    <Suspense fallback={<div className="text-center p-4 text-[12px]">로딩 중...</div>}>
      <DetailContent />
    </Suspense>
  );
}
