"use client";

import { MainLayout } from "@/components/MainLayout";
import { useBankStore } from "@/store/bankStore";
import { InlineAdCasino, InlineAdLoan } from "@/components/AdBanners";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const BANKS = [
  "-- 은행을 선택하세요 --",
  "ㄱ) 국민은행", "ㄱ) 기업은행", "ㄱ) 광주은행", "ㄱ) 경남은행",
  "ㄴ) 농협은행", "ㄴ) 농협중앙회",
  "ㄷ) 대구은행",
  "ㅂ) 부산은행",
  "ㅅ) 산업은행", "ㅅ) 수협은행", "ㅅ) 신한은행", "ㅅ) SC제일은행", "ㅅ) 새마을금고", "ㅅ) 신협",
  "ㅇ) 우리은행",
  "ㅈ) 전북은행", "ㅈ) 제주은행", "ㅈ) 저축은행",
  "ㅋ) 카카오뱅크", "ㅋ) 케이뱅크",
  "ㅌ) 토스뱅크",
  "ㅎ) 하나은행", "ㅎ) HSBC",
  "ㅇ) 우체국",
  "기타) 산림조합", "기타) 상호저축은행",
];

export default function TransferPage() {
  const { isLoggedIn, accounts, securityCardNumber, transfer, refreshSecurityCard } = useBankStore();
  const router = useRouter();

  const [fromAccount, setFromAccount] = useState("");
  const [toBank, setToBank] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [senderMemo, setSenderMemo] = useState("");
  const [receiverMemo, setReceiverMemo] = useState("");
  const [accountPw, setAccountPw] = useState("");
  const [secCard1, setSecCard1] = useState("");
  const [secCard2, setSecCard2] = useState("");
  const [keypadNumbers, setKeypadNumbers] = useState<string[]>([]);

  const shuffleKeypad = useCallback(() => {
    const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setKeypadNumbers([...nums]);
  }, []);

  useEffect(() => {
    shuffleKeypad();
    const interval = setInterval(shuffleKeypad, 5000);
    return () => clearInterval(interval);
  }, [shuffleKeypad]);

  useEffect(() => {
    const interval = setInterval(() => refreshSecurityCard(), 10000);
    return () => clearInterval(interval);
  }, [refreshSecurityCard]);

  if (!isLoggedIn) {
    return (
      <MainLayout>
        <div className="bg-white p-5 text-center" style={{ border: "2px ridge #808080" }}>
          <div className="text-[40px] mb-3">🔒</div>
          <div className="text-[14px] font-bold text-[#000080] mb-3">로그인이 필요한 서비스입니다</div>
          <p className="text-[11px] text-gray-600 mb-4">자금이체는 로그인 후 이용 가능합니다.</p>
          <button className="btn-submit py-2 px-6 text-[13px]" onClick={() => router.push("/")}>
            로그인 페이지로 이동
          </button>
        </div>
      </MainLayout>
    );
  }

  const handleTransfer = () => {
    if (!accountPw || accountPw.length !== 4) {
      alert("출금계좌 비밀번호(4자리)를 입력해 주세요.");
      return;
    }

    const result = transfer(
      fromAccount,
      accountPw,
      toBank,
      toAccount,
      parseInt(amount) || 0,
      senderMemo,
      receiverMemo,
      secCard1,
      secCard2
    );

    alert(result.message);

    if (result.success) {
      setToAccount("");
      setAmount("");
      setSenderMemo("");
      setReceiverMemo("");
      setAccountPw("");
      setSecCard1("");
      setSecCard2("");
    }
  };

  const handleKeypadClick = (num: string) => {
    if (accountPw.length < 4) {
      setAccountPw(accountPw + num);
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-[#800000] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          💸 계좌이체 (타행이체)
        </div>

        <div className="bg-red-50 p-2 mb-3 text-[10px] text-red-700" style={{ border: "1px solid #ff0000" }}>
          <b>⚠ 주의사항:</b> 이체 전 반드시 보안카드를 준비해 주세요.
          1일 이체한도(100만원)를 초과할 수 없습니다. 수수료(500원)가 발생합니다.
        </div>

        {/* 출금계좌 */}
        <FormRow label="출금계좌번호:">
          <select
            className="text-[11px] p-1 w-[250px]"
            style={{ border: "2px inset #808080" }}
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
          >
            <option value="">-- 계좌를 선택하세요 --</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.number} ({a.type}) - 잔액: {a.balance.toLocaleString()}원
              </option>
            ))}
          </select>
          <button
            className="btn-90s ml-1"
            onClick={() => {
              const acc = accounts.find((a) => a.id === fromAccount);
              if (acc) alert(`잔액: ${acc.balance.toLocaleString()}원`);
              else alert("계좌를 먼저 선택해 주세요.");
            }}
          >
            잔액조회
          </button>
        </FormRow>

        {/* 비밀번호 */}
        <FormRow label="출금계좌 비밀번호:">
          <input
            type="password"
            className="text-[11px] p-1 w-[120px] font-mono"
            style={{ border: "2px inset #808080" }}
            maxLength={4}
            value={accountPw}
            readOnly
            placeholder="보안키패드 사용"
          />
          <button className="btn-90s ml-1" onClick={() => setAccountPw("")}>지우기</button>
          <span className="text-[9px] text-red-600 ml-2">※ 보안키패드를 사용해 주세요 ↓</span>
        </FormRow>

        {/* 보안 키패드 */}
        <div className="bg-[#e0e0e0] p-2 my-2 flex flex-wrap gap-0.5 justify-center" style={{ border: "1px solid #999" }}>
          <div className="w-full text-[9px] text-gray-500 mb-1 text-center">※ 보안을 위해 숫자 배열이 매번 변경됩니다</div>
          {keypadNumbers.map((n, i) => (
            <button
              key={`${n}-${i}`}
              className="w-[28px] h-[28px] text-[12px] font-mono cursor-pointer bg-[#d0d0d0]"
              style={{ border: "2px outset #c0c0c0" }}
              onClick={() => handleKeypadClick(n)}
            >
              {n}
            </button>
          ))}
          <button
            className="w-[45px] h-[28px] text-[12px] font-mono cursor-pointer bg-[#d0d0d0]"
            style={{ border: "2px outset #c0c0c0" }}
            onClick={() => setAccountPw(accountPw.slice(0, -1))}
          >
            ←
          </button>
        </div>

        {/* 입금은행 */}
        <FormRow label="입금은행:">
          <select
            className="text-[11px] p-1 w-[250px]"
            style={{ border: "2px inset #808080" }}
            value={toBank}
            onChange={(e) => setToBank(e.target.value)}
          >
            {BANKS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </FormRow>

        {/* 입금계좌 */}
        <FormRow label="입금계좌번호:">
          <input
            type="text"
            className="text-[11px] p-1 w-[200px] font-mono"
            style={{ border: "2px inset #808080" }}
            placeholder="'-' 없이 입력"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value.replace(/\D/g, ""))}
          />
        </FormRow>

        {/* 금액 */}
        <FormRow label="이체금액:">
          <input
            type="text"
            className="text-[11px] p-1 w-[150px] font-mono"
            style={{ border: "2px inset #808080" }}
            placeholder="금액 입력"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
          />
          <span className="text-[9px] ml-1">원</span>
          {[10000, 50000, 100000, 500000].map((v) => (
            <button key={v} className="btn-90s ml-1" onClick={() => setAmount(String(v))}>
              {v >= 10000 ? `${v / 10000}만` : v.toLocaleString()}
            </button>
          ))}
        </FormRow>

        {amount && (
          <div className="text-[10px] text-gray-600 ml-[120px] mb-1">
            = {parseInt(amount).toLocaleString()}원 (수수료 500원 별도)
          </div>
        )}

        {/* 메모 */}
        <FormRow label="받는 분 통장표시:">
          <input
            type="text"
            className="text-[11px] p-1 w-[150px]"
            style={{ border: "2px inset #808080" }}
            placeholder="최대 7자"
            maxLength={7}
            value={receiverMemo}
            onChange={(e) => setReceiverMemo(e.target.value)}
          />
        </FormRow>

        <FormRow label="내 통장 표시:">
          <input
            type="text"
            className="text-[11px] p-1 w-[150px]"
            style={{ border: "2px inset #808080" }}
            placeholder="최대 7자"
            maxLength={7}
            value={senderMemo}
            onChange={(e) => setSenderMemo(e.target.value)}
          />
        </FormRow>

        {/* 보안카드 */}
        <div className="mt-4 pt-3" style={{ borderTop: "1px dashed #999" }}>
          <div className="text-[11px] font-bold mb-2">보안카드 인증</div>
          <FormRow label="보안카드 번호:">
            <span className="text-[11px]">
              제 <b className="text-red-600">{securityCardNumber}</b> 번
            </span>
          </FormRow>
          <FormRow label="앞 2자리:">
            <input
              type="password"
              className="text-[11px] p-1 w-[50px] font-mono"
              style={{ border: "2px inset #808080" }}
              maxLength={2}
              value={secCard1}
              onChange={(e) => setSecCard1(e.target.value)}
            />
            <span className="text-[11px] ml-3 mr-1">뒤 2자리:</span>
            <input
              type="password"
              className="text-[11px] p-1 w-[50px] font-mono"
              style={{ border: "2px inset #808080" }}
              maxLength={2}
              value={secCard2}
              onChange={(e) => setSecCard2(e.target.value)}
            />
          </FormRow>
        </div>

        {/* 버튼 */}
        <div className="text-center mt-4">
          <button className="btn-submit py-2 px-10 text-[14px]" onClick={handleTransfer}>
            이 체 실 행
          </button>
          <button className="btn-90s py-2 px-5 ml-3" onClick={() => router.push("/account")}>
            취 소
          </button>
        </div>

        <div className="text-center mt-2 text-red-600 text-[9px] font-bold blink">
          ※ 이체 실행 후에는 취소가 불가합니다. 입금정보를 반드시 확인해 주세요!
        </div>
      </div>

      <InlineAdCasino />
      <InlineAdLoan />
    </MainLayout>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center mb-1.5 text-[11px]">
      <label className="w-[120px] text-right pr-2 text-[10px] text-gray-700 shrink-0">{label}</label>
      {children}
    </div>
  );
}
