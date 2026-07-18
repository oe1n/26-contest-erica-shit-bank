"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBankStore } from "@/store/bankStore";

export function LoginBox() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [ssn, setSsn] = useState("");
  const { login, isLoggedIn, user, logout } = useBankStore();
  const router = useRouter();

  if (isLoggedIn && user) {
    return (
      <div className="bg-[#f0f0f0] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-gradient-to-r from-[#000080] to-[#4040a0] text-white py-1 px-2 text-[12px] font-bold -m-3 mb-3">
          🔒 인터넷뱅킹
        </div>
        <div className="text-[13px] leading-7">
          <b>{user.name}</b>님 환영합니다! 😊<br />
          마지막 접속: {user.lastLogin}<br />
          <div className="flex gap-2 mt-3">
            <button className="btn-submit" onClick={() => router.push("/account")}>계좌조회</button>
            <button className="btn-submit" onClick={() => router.push("/transfer")}>자금이체</button>
            <button className="btn-90s" onClick={() => { logout(); alert("로그아웃 되었습니다."); }}>로그아웃</button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogin = () => {
    if (!id || !pw) { alert("아이디와 비밀번호를 입력해 주세요."); return; }
    if (!ssn || ssn.length !== 6) { alert("주민등록번호 앞 6자리를 입력해 주세요."); return; }

    const result = login(id, pw, ssn);
    if (result.success) {
      router.push("/account");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="bg-[#f0f0f0] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
      <div className="bg-gradient-to-r from-[#000080] to-[#4040a0] text-white py-1 px-2 text-[12px] font-bold -m-3 mb-3">
        🔒 인터넷뱅킹 로그인
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-[10px] block mb-0.5 text-gray-700">아이디 (영문+숫자 8~16자리)</label>
          <input type="text" className="w-full p-1 mb-1 text-[11px]" style={{ border: "2px inset #808080", fontFamily: "'Courier New', monospace" }} placeholder="아이디를 입력하세요" value={id} onChange={(e) => setId(e.target.value)} />

          <label className="text-[10px] block mb-0.5 text-gray-700">비밀번호 (영문대소문자+숫자+특수문자 10~20자리)</label>
          <input type="password" className="w-full p-1 mb-1 text-[11px]" style={{ border: "2px inset #808080", fontFamily: "'Courier New', monospace" }} placeholder="비밀번호를 입력하세요" value={pw} onChange={(e) => setPw(e.target.value)} />

          <label className="text-[10px] block mb-0.5 text-gray-700">주민등록번호 앞 6자리</label>
          <input type="text" className="w-full p-1 mb-1 text-[11px]" style={{ border: "2px inset #808080", fontFamily: "'Courier New', monospace" }} placeholder="생년월일 6자리" maxLength={6} value={ssn} onChange={(e) => setSsn(e.target.value.replace(/\D/g, ""))} />
        </div>

        <div className="w-[160px] text-center pt-5">
          <button className="btn-submit w-full py-2.5 text-[14px] mb-2" onClick={handleLogin}>로 그 인</button>
          <button className="btn-90s w-full mb-1 text-[10px]" onClick={() => alert("OpenRouter 키 로그인은\n준비 중입니다.\n\n(데모)")}>OpenRouter 키 로그인</button>
          <button className="btn-90s w-full mb-1 text-[10px]" onClick={() => alert("아이디 찾기는\n영업점을 방문하시거나\n1588-0000으로 전화해 주세요.")}>아이디 찾기</button>
          <button className="btn-90s w-full text-[10px]" onClick={() => alert("비밀번호 재설정은\n본인 확인 후 가능합니다.\n\n가까운 영업점을 방문해 주세요.")}>비밀번호 찾기</button>

          <div className="mt-3 text-[9px] text-gray-500 text-left">
            ※ ID/PW 5회 오류시 이용제한<br />
            <br />
            <b className="text-blue-700">테스트 계정:</b><br />
            ID: testuser<br />
            PW: Test1234!@<br />
            주민번호: 870123
          </div>
        </div>
      </div>

      <div className="terms-micro mt-2">
        본 서비스 이용약관에 동의하시는 것으로 간주됩니다. 개인정보 수집 및 이용에 관한 사항: 수집항목: 성명, 주민등록번호, 주소, 전화번호 등. 이용목적: 금융거래, 본인확인. 보유기간: 거래종료 후 5년.
      </div>
    </div>
  );
}
