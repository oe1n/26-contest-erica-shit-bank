"use client";

import { MainLayout } from "@/components/MainLayout";
import { useBankStore } from "@/store/bankStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, Suspense } from "react";

function ConfirmContent() {
  const { isLoggedIn, accounts, recipients, securityCardNumber, transfer, refreshSecurityCard } = useBankStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromId = searchParams.get("from") || "";
  const pw = searchParams.get("pw") || "";
  const toId = searchParams.get("to") || "";
  const amount = parseInt(searchParams.get("amount") || "0");

  const account = accounts.find((a) => a.id === fromId);
  const recipient = recipients.find((r) => r.id === toId);

  const [secCard1, setSecCard1] = useState("");
  const [secCard2, setSecCard2] = useState("");
  const [activeField, setActiveField] = useState<"sec1" | "sec2">("sec1");
  const [keypadNumbers, setKeypadNumbers] = useState<string[]>([]);

  const shuffleKeypad = useCallback(() => {
    const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setKeypadNumbers([...nums]);
  }, []);

  useEffect(() => { shuffleKeypad(); }, [shuffleKeypad]);

  useEffect(() => {
    refreshSecurityCard();
  }, [refreshSecurityCard]);

  if (!isLoggedIn) { router.push("/"); return null; }
  if (!account || !recipient || !amount) { router.push("/transfer"); return null; }

  const handleKeypad = (n: string) => {
    if (activeField === "sec1") {
      if (secCard1.length < 2) {
        const next = secCard1 + n;
        setSecCard1(next);
        if (next.length === 2) setActiveField("sec2");
      }
    } else {
      if (secCard2.length < 2) setSecCard2(secCard2 + n);
    }
  };

  const handleTransfer = () => {
    const result = transfer(fromId, pw, toId, amount, secCard1, secCard2);
    if (result.success) {
      router.push(`/transfer/complete?msg=${encodeURIComponent(result.message)}`);
    } else {
      alert(result.message);
      setSecCard1("");
      setSecCard2("");
      setActiveField("sec1");
      shuffleKeypad();
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-[#800000] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          💸 계좌이체 — 5단계: 이체 확인
        </div>

        <div className="bg-white p-3 mb-3 text-[12px]" style={{ border: "2px inset #808080" }}>
          <table className="w-full text-[12px]">
            <tbody>
              <tr><td className="py-1 text-gray-600 w-[100px]">출금계좌</td><td className="py-1 font-bold">{account.name} ({account.number})</td></tr>
              <tr><td className="py-1 text-gray-600">출금 후 잔액</td><td className="py-1">{(account.balance - amount).toLocaleString()}원</td></tr>
              <tr style={{ borderTop: "1px dashed #ccc" }}><td className="py-1 text-gray-600">입금은행</td><td className="py-1 font-bold">{recipient.bank}</td></tr>
              <tr><td className="py-1 text-gray-600">입금계좌</td><td className="py-1 font-mono">{recipient.account}</td></tr>
              <tr><td className="py-1 text-gray-600">받는 분</td><td className="py-1 font-bold">{recipient.name}</td></tr>
              <tr style={{ borderTop: "1px dashed #ccc" }}><td className="py-1 text-gray-600">이체금액</td><td className="py-1 font-bold text-red-600 text-[15px]">{amount.toLocaleString()}원</td></tr>
              <tr><td className="py-1 text-gray-600">수수료</td><td className="py-1">500원</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 p-3 mb-3" style={{ border: "1px solid #ffc107" }}>
          <div className="text-[11px] font-bold mb-2">보안카드 인증</div>
          <div className="text-[12px] mb-2">
            보안카드 제 <b className="text-red-600 text-[14px]">{securityCardNumber}</b> 번의 번호를 입력해 주세요
          </div>

          <div className="flex items-center gap-3 mb-3 justify-center">
            <div>
              <div className="text-[10px] text-gray-600 mb-1">앞 2자리</div>
              <div
                className={`w-[60px] h-[30px] bg-white flex items-center justify-center font-mono text-[16px] cursor-pointer ${activeField === "sec1" ? "ring-2 ring-blue-500" : ""}`}
                style={{ border: "2px inset #808080" }}
                onClick={() => setActiveField("sec1")}
              >
                {secCard1 ? "●".repeat(secCard1.length) : ""}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-600 mb-1">뒤 2자리</div>
              <div
                className={`w-[60px] h-[30px] bg-white flex items-center justify-center font-mono text-[16px] cursor-pointer ${activeField === "sec2" ? "ring-2 ring-blue-500" : ""}`}
                style={{ border: "2px inset #808080" }}
                onClick={() => setActiveField("sec2")}
              >
                {secCard2 ? "●".repeat(secCard2.length) : ""}
              </div>
            </div>
          </div>

          <div className="bg-[#e0e0e0] p-2 flex flex-wrap gap-1 justify-center max-w-[250px] mx-auto" style={{ border: "1px solid #999" }}>
            {keypadNumbers.map((n, i) => (
              <button
                key={`${n}-${i}`}
                className="w-[45px] h-[35px] text-[14px] font-mono cursor-pointer bg-[#d0d0d0] font-bold"
                style={{ border: "2px outset #c0c0c0" }}
                onClick={() => handleKeypad(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="w-[45px] h-[35px] text-[12px] cursor-pointer bg-[#d0d0d0]"
              style={{ border: "2px outset #c0c0c0" }}
              onClick={() => {
                if (activeField === "sec2" && secCard2.length > 0) setSecCard2(secCard2.slice(0, -1));
                else if (activeField === "sec2" && secCard2.length === 0) { setActiveField("sec1"); setSecCard1(secCard1.slice(0, -1)); }
                else setSecCard1(secCard1.slice(0, -1));
              }}
            >
              ←
            </button>
            <button
              className="w-[45px] h-[35px] text-[10px] cursor-pointer bg-[#d0d0d0]"
              style={{ border: "2px outset #c0c0c0" }}
              onClick={() => { setSecCard1(""); setSecCard2(""); setActiveField("sec1"); }}
            >
              지우기
            </button>
          </div>
        </div>

        <div className="text-center mb-2 text-red-600 text-[9px] font-bold blink">
          ※ 이체 실행 후에는 취소가 불가합니다!
        </div>

        <div className="flex gap-2 justify-center">
          <button className="btn-submit py-2 px-10 text-[14px]" onClick={handleTransfer}>이 체 실 행</button>
          <button className="btn-90s py-2 px-5" onClick={() => router.back()}>← 이전</button>
        </div>
      </div>
    </MainLayout>
  );
}

export default function TransferConfirmPage() {
  return (
    <Suspense fallback={<div className="text-center p-4 text-[12px]">로딩 중...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
