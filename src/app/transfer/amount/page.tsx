"use client";

import { MainLayout } from "@/components/MainLayout";
import { useBankStore } from "@/store/bankStore";
import { InlineAdHealth } from "@/components/AdBanners";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const AMOUNTS = [
  { value: 10000, label: "1만원" },
  { value: 30000, label: "3만원" },
  { value: 50000, label: "5만원" },
  { value: 100000, label: "10만원" },
  { value: 300000, label: "30만원" },
  { value: 500000, label: "50만원" },
  { value: 1000000, label: "100만원" },
];

function AmountContent() {
  const { isLoggedIn, accounts, recipients } = useBankStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromId = searchParams.get("from") || "";
  const pw = searchParams.get("pw") || "";
  const toId = searchParams.get("to") || "";

  const account = accounts.find((a) => a.id === fromId);
  const recipient = recipients.find((r) => r.id === toId);

  if (!isLoggedIn) { router.push("/"); return null; }
  if (!account || !recipient) { router.push("/transfer"); return null; }

  return (
    <MainLayout>
      <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-[#800000] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          💸 계좌이체 — 4단계: 이체금액 선택
        </div>

        <div className="bg-blue-50 p-2 mb-3 text-[11px]" style={{ border: "1px solid #99c" }}>
          출금: <b>{account.name}</b> ({account.number}) | 잔액: <b>{account.balance.toLocaleString()}원</b><br />
          입금: <b>{recipient.name}</b> ({recipient.bank} {recipient.account})
        </div>

        <div className="text-[11px] mb-2 font-bold text-[#000080]">이체할 금액을 선택해 주세요</div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {AMOUNTS.filter((a) => a.value <= account.balance).map((a) => (
            <Link
              key={a.value}
              href={`/transfer/confirm?from=${fromId}&pw=${pw}&to=${toId}&amount=${a.value}`}
              className="block bg-white p-3 text-center no-underline text-[#000080] hover:bg-blue-50 transition-colors"
              style={{ border: "2px outset #c0c0c0" }}
            >
              <div className="text-[16px] font-bold">{a.label}</div>
              <div className="text-[10px] text-gray-500">{a.value.toLocaleString()}원 이체 ▶</div>
            </Link>
          ))}
        </div>

        <div className="text-[9px] text-red-600 mb-3">
          ※ 1일 이체한도: 1,000,000원 | 수수료: 500원
        </div>

        <button className="btn-90s" onClick={() => router.back()}>← 이전</button>
      </div>

      <InlineAdHealth />
    </MainLayout>
  );
}

export default function TransferAmountPage() {
  return (
    <Suspense fallback={<div className="text-center p-4 text-[12px]">로딩 중...</div>}>
      <AmountContent />
    </Suspense>
  );
}
