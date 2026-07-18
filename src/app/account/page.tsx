"use client";

import { MainLayout } from "@/components/MainLayout";
import { useBankStore } from "@/store/bankStore";
import { InlineAdCasino, InlineAdHealth } from "@/components/AdBanners";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
  const { isLoggedIn, accounts, user } = useBankStore();
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
        <div className="bg-gradient-to-r from-[#000080] to-[#4040a0] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          📊 계좌 조회
        </div>

        <div className="text-[12px] mb-3 font-bold text-[#000080]">
          {user?.name}님의 계좌 목록 — 조회할 계좌를 선택하세요
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {accounts.map((a) => (
            <Link
              key={a.id}
              href={`/account/detail?id=${a.id}`}
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
                  <div className="text-[9px] text-gray-500">클릭하여 상세조회 ▶</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-right mb-3">
          <span className="text-[11px] font-bold">
            총 자산: <span className="text-red-600 text-[14px]">{accounts.reduce((sum, a) => sum + a.balance, 0).toLocaleString()}</span>원
          </span>
        </div>

        <div className="flex gap-2">
          <button className="btn-submit" onClick={() => router.push("/transfer")}>이체하기</button>
          <button className="btn-90s" onClick={() => router.push("/")}>메인으로</button>
        </div>
      </div>

      <InlineAdCasino />
      <InlineAdHealth />
    </MainLayout>
  );
}
