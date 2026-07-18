"use client";

import { MainLayout } from "@/components/MainLayout";
import { useBankStore } from "@/store/bankStore";
import { InlineAdCasino, InlineAdHealth } from "@/components/AdBanners";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountPage() {
  const { isLoggedIn, accounts, user } = useBankStore();
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  if (!isLoggedIn) {
    return (
      <MainLayout>
        <div className="bg-white p-5 text-center" style={{ border: "2px ridge #808080" }}>
          <div className="text-[40px] mb-3">🔒</div>
          <div className="text-[14px] font-bold text-[#000080] mb-3">로그인이 필요한 서비스입니다</div>
          <p className="text-[11px] text-gray-600 mb-4">
            계좌조회는 로그인 후 이용 가능합니다.<br />
            보안을 위해 로그인 후 이용해 주세요.
          </p>
          <button className="btn-submit py-2 px-6 text-[13px]" onClick={() => router.push("/")}>
            로그인 페이지로 이동
          </button>
        </div>
      </MainLayout>
    );
  }

  const selected = accounts.find((a) => a.id === selectedAccount);

  return (
    <MainLayout>
      <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-gradient-to-r from-[#000080] to-[#4040a0] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          📊 계좌 조회
        </div>

        <div className="bg-yellow-50 p-2 mb-3 text-[10px] text-yellow-800" style={{ border: "1px solid #ffc107" }}>
          ⚠ <b>안내:</b> 계좌 조회 내역은 최근 3개월까지만 조회 가능합니다.
          이전 내역은 영업점에서 거래내역 증명서를 발급받으세요.
        </div>

        <div className="text-[12px] mb-2 font-bold text-[#000080]">
          {user?.name}님의 계좌 목록
        </div>

        <table className="w-full bg-white text-[11px] mb-3" style={{ border: "2px inset #808080", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>선택</th>
              <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>계좌번호</th>
              <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>계좌명</th>
              <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>종류</th>
              <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>잔액</th>
              <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>조회</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.id} className={selectedAccount === a.id ? "bg-blue-50" : ""}>
                <td className="text-center p-1" style={{ border: "1px solid #d0d0d0" }}>
                  <input
                    type="radio"
                    name="account"
                    checked={selectedAccount === a.id}
                    onChange={() => setSelectedAccount(a.id)}
                  />
                </td>
                <td className="p-1 font-mono text-[10px]" style={{ border: "1px solid #d0d0d0" }}>{a.number}</td>
                <td className="p-1" style={{ border: "1px solid #d0d0d0" }}>{a.name}</td>
                <td className="p-1 text-center" style={{ border: "1px solid #d0d0d0" }}>{a.type}</td>
                <td className="p-1 text-right font-bold" style={{ border: "1px solid #d0d0d0" }}>
                  {a.balance.toLocaleString()}원
                </td>
                <td className="text-center p-1" style={{ border: "1px solid #d0d0d0" }}>
                  <button className="btn-90s text-[9px]" onClick={() => setSelectedAccount(a.id)}>
                    상세조회
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mb-3">
          <span className="text-[11px] font-bold">
            총 자산: <span className="text-red-600 text-[14px]">{accounts.reduce((sum, a) => sum + a.balance, 0).toLocaleString()}</span>원
          </span>
        </div>
      </div>

      <InlineAdCasino />

      {selected && (
        <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
          <div className="bg-[#800000] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
            📋 거래 내역 - {selected.name} ({selected.number})
          </div>

          <div className="bg-blue-50 p-2 mb-2 text-[10px]" style={{ border: "1px solid #99c" }}>
            현재 잔액: <b className="text-[13px] text-red-600">{selected.balance.toLocaleString()}</b>원
          </div>

          <table className="w-full bg-white text-[11px]" style={{ border: "2px inset #808080", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>날짜</th>
                <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>구분</th>
                <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>금액</th>
                <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>잔액</th>
                <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>적요</th>
              </tr>
            </thead>
            <tbody>
              {selected.transactions.map((t) => (
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
                  <td className="p-1 text-right font-mono" style={{ border: "1px solid #d0d0d0" }}>
                    {t.balance.toLocaleString()}
                  </td>
                  <td className="p-1" style={{ border: "1px solid #d0d0d0" }}>
                    {t.memo}{t.target ? ` (${t.target})` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center mt-3">
            <button className="btn-90s mr-2" onClick={() => alert("인쇄 기능은 지원되지 않습니다.\n\n거래내역 증명서는\n영업점에서 발급받으세요.")}>
              인쇄
            </button>
            <button className="btn-90s mr-2" onClick={() => alert("엑셀 다운로드는\n보안 프로그램 설치 후\n이용 가능합니다.\n\n(데모)")}>
              엑셀 저장
            </button>
            <button className="btn-submit" onClick={() => router.push("/transfer")}>
              이체하기
            </button>
          </div>
        </div>
      )}

      <InlineAdHealth />
    </MainLayout>
  );
}
