"use client";

import { MainLayout } from "@/components/MainLayout";
import { useBankStore } from "@/store/bankStore";
import { InlineAdLoan } from "@/components/AdBanners";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function RecipientContent() {
  const { isLoggedIn, accounts, recipients } = useBankStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromId = searchParams.get("from") || "";
  const pw = searchParams.get("pw") || "";
  const account = accounts.find((a) => a.id === fromId);

  if (!isLoggedIn) { router.push("/"); return null; }
  if (!account) { router.push("/transfer"); return null; }

  return (
    <MainLayout>
      <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-[#800000] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          💸 계좌이체 — 3단계: 받는 분 선택
        </div>

        <div className="bg-blue-50 p-2 mb-3 text-[11px]" style={{ border: "1px solid #99c" }}>
          출금계좌: <b>{account.name}</b> ({account.number}) | 잔액: <b>{account.balance.toLocaleString()}원</b>
        </div>

        <div className="text-[11px] mb-2 font-bold text-[#000080]">받는 분을 선택해 주세요</div>

        <div className="flex flex-col gap-2 mb-4">
          {recipients.map((r) => (
            <Link
              key={r.id}
              href={`/transfer/amount?from=${fromId}&pw=${pw}&to=${r.id}`}
              className="block bg-white p-3 no-underline text-[#000080] hover:bg-blue-50 transition-colors"
              style={{ border: "2px outset #c0c0c0" }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[13px] font-bold">{r.name}</div>
                  <div className="text-[10px] text-gray-600">{r.bank}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono">{r.account}</div>
                  <div className="text-[9px] text-gray-500">이 계좌로 이체 ▶</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button className="btn-90s" onClick={() => router.push("/transfer")}>← 출금계좌 다시 선택</button>
      </div>

      <InlineAdLoan />
    </MainLayout>
  );
}

export default function TransferRecipientPage() {
  return (
    <Suspense fallback={<div className="text-center p-4 text-[12px]">로딩 중...</div>}>
      <RecipientContent />
    </Suspense>
  );
}
