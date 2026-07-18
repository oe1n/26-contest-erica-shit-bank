"use client";

import { MainLayout } from "@/components/MainLayout";
import { useBankStore } from "@/store/bankStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, Suspense } from "react";

function PasswordContent() {
  const { isLoggedIn, accounts } = useBankStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromId = searchParams.get("from") || "";
  const account = accounts.find((a) => a.id === fromId);

  const [pw, setPw] = useState("");
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

  if (!isLoggedIn) {
    router.push("/");
    return null;
  }

  if (!account) {
    return (
      <MainLayout>
        <div className="bg-white p-5 text-center" style={{ border: "2px ridge #808080" }}>
          <div className="text-[14px] font-bold text-red-600 mb-3">계좌를 찾을 수 없습니다</div>
          <button className="btn-submit" onClick={() => router.push("/transfer")}>다시 선택</button>
        </div>
      </MainLayout>
    );
  }

  const handleSubmit = () => {
    if (pw.length !== 4) {
      alert("비밀번호 4자리를 입력해 주세요.");
      return;
    }
    if (pw !== "4321") {
      alert("출금계좌 비밀번호가 일치하지 않습니다.");
      setPw("");
      shuffleKeypad();
      return;
    }
    router.push(`/transfer/recipient?from=${fromId}&pw=${pw}`);
  };

  return (
    <MainLayout>
      <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-[#800000] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          💸 계좌이체 — 2단계: 출금계좌 비밀번호
        </div>

        <div className="bg-blue-50 p-2 mb-3 text-[11px]" style={{ border: "1px solid #99c" }}>
          출금계좌: <b>{account.name}</b> ({account.number}) | 잔액: <b>{account.balance.toLocaleString()}원</b>
        </div>

        <div className="text-center mb-3">
          <div className="text-[11px] mb-2">출금계좌 비밀번호 4자리를 입력해 주세요</div>
          <div className="text-[24px] font-mono tracking-widest mb-3" style={{ letterSpacing: "12px" }}>
            {"●".repeat(pw.length)}{"○".repeat(4 - pw.length)}
          </div>
        </div>

        <div className="bg-[#e0e0e0] p-3 flex flex-wrap gap-1 justify-center max-w-[250px] mx-auto mb-3" style={{ border: "1px solid #999" }}>
          {keypadNumbers.map((n, i) => (
            <button
              key={`${n}-${i}`}
              className="w-[50px] h-[40px] text-[16px] font-mono cursor-pointer bg-[#d0d0d0] font-bold"
              style={{ border: "2px outset #c0c0c0" }}
              onClick={() => { if (pw.length < 4) setPw(pw + n); }}
            >
              {n}
            </button>
          ))}
          <button
            className="w-[50px] h-[40px] text-[14px] cursor-pointer bg-[#d0d0d0]"
            style={{ border: "2px outset #c0c0c0" }}
            onClick={() => setPw(pw.slice(0, -1))}
          >
            ←
          </button>
          <button
            className="w-[50px] h-[40px] text-[12px] cursor-pointer bg-[#d0d0d0]"
            style={{ border: "2px outset #c0c0c0" }}
            onClick={() => setPw("")}
          >
            지우기
          </button>
        </div>

        <div className="flex gap-2 justify-center">
          <button className="btn-submit py-2 px-8 text-[13px]" onClick={handleSubmit}>확 인</button>
          <button className="btn-90s py-2 px-5" onClick={() => router.push("/transfer")}>← 이전</button>
        </div>
      </div>
    </MainLayout>
  );
}

export default function TransferPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center p-4 text-[12px]">로딩 중...</div>}>
      <PasswordContent />
    </Suspense>
  );
}
