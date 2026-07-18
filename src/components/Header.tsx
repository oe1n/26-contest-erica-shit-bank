"use client";

import { useEffect } from "react";
import { useBankStore } from "@/store/bankStore";

export function SessionTimer() {
  const { sessionTimeLeft, decrementTimer, isLoggedIn, logout } = useBankStore();

  useEffect(() => {
    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [decrementTimer]);

  useEffect(() => {
    if (sessionTimeLeft <= 0) {
      // 타이머가 0이 되면 다시 리셋 (실제 로그아웃은 하지 않음)
      decrementTimer();
    }
  }, [sessionTimeLeft, decrementTimer]);

  const min = Math.floor(sessionTimeLeft / 60);
  const sec = sessionTimeLeft % 60;

  return (
    <div className="fixed top-1 right-1 bg-red-600 text-white px-2 py-1 text-[10px] font-bold z-[1000] blink" style={{ border: "2px outset #ff6666" }}>
      자동 로그아웃: {String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}
    </div>
  );
}

export function VisitorCounter() {
  const { visitorCount, incrementVisitor } = useBankStore();

  useEffect(() => {
    const interval = setInterval(incrementVisitor, 3000);
    return () => clearInterval(interval);
  }, [incrementVisitor]);

  return (
    <div
      className="fixed bottom-1 right-1 bg-black text-green-400 px-2 py-1 text-[11px] z-[999]"
      style={{ fontFamily: "'Courier New', monospace", border: "2px inset #808080" }}
    >
      방문자: {visitorCount.toLocaleString()}
    </div>
  );
}

export function TopBanner() {
  return (
    <div className="rainbow-bg text-center py-2 text-[13px] font-bold text-white" style={{ textShadow: "2px 2px #000", borderBottom: "3px ridge #808080" }}>
      ★ 대한신뢰은행에 오신 것을 환영합니다! 고객님의 소중한 자산을 지켜드립니다 ★
    </div>
  );
}

export function MarqueeBar() {
  return (
    <div className="bg-[#000080] text-yellow-300 py-1.5 text-[14px] font-bold overflow-hidden whitespace-nowrap" style={{ border: "2px ridge #808080" }}>
      <span className="marquee-scroll">
        ★★★ [긴급공지] 보안프로그램을 반드시 업데이트해 주세요! ★★★ 이체한도 변경시 영업점 방문 필수 ★★★ 전자금융사기 주의보 발령 ★★★ 개인정보 유효기간제 시행 안내 ★★★ 보안 인증서 갱신 안내 ★★★
      </span>
    </div>
  );
}

export function ExchangeBar() {
  return (
    <div className="bg-[#002200] text-green-400 py-1 text-[11px] overflow-hidden whitespace-nowrap" style={{ fontFamily: "'Courier New', monospace", border: "2px inset #808080" }}>
      <span className="marquee-scroll-slow">
        USD/KRW 1,328.50 ▲12.30 | EUR/KRW 1,445.20 ▼3.10 | JPY/KRW 9.12 ▲0.05 | GBP/KRW 1,682.30 ▲8.40 | CNY/KRW 183.20 ▼1.20 | KOSPI 2,547.82 ▲15.23 | KOSDAQ 842.15 ▼3.82 |
      </span>
    </div>
  );
}

export function SiteHeader() {
  return (
    <div className="text-center py-4" style={{ background: "linear-gradient(to bottom, #000080, #0000aa)", borderBottom: "4px ridge #c0c0c0" }}>
      <h1 className="text-yellow-300 text-[28px] font-bold blink" style={{ textShadow: "3px 3px #ff0000" }}>
        ★ 대한신뢰은행 인터넷뱅킹 ★
      </h1>
      <div className="text-cyan-300 text-[11px] mt-1">
        | 개인뱅킹 | 기업뱅킹 | 외환 | 펀드 | 대출 | 카드 | 보험 | 퇴직연금 | 전자금융 |
      </div>
    </div>
  );
}

export function UnderConstruction() {
  return (
    <div className="text-center py-1 bg-yellow-300 text-[11px] text-red-600 font-bold blink">
      ⚠ 현재 일부 서비스가 점검 중입니다. 불편을 드려 죄송합니다. (점검시간: 미정) ⚠
    </div>
  );
}

export function Toolbar() {
  const showError = () =>
    alert("오류가 발생했습니다.\n\n에러코드: ERR_SEC_0x80072F8F\n\n해결 방법:\n1. 브라우저 캐시 삭제\n2. 보안 프로그램 재설치\n3. PC 재부팅\n\n고객센터(1588-0000)로 문의해 주세요.\n\n(데모)");

  return (
    <div className="bg-[#e8e8e8] py-1 px-1 flex gap-1 flex-wrap" style={{ borderBottom: "2px ridge #c0c0c0" }}>
      <button className="btn-90s" onClick={() => alert("보안센터 서비스 점검 중입니다.")}>보안센터</button>
      <button className="btn-90s" onClick={() => alert("보안프로그램 업데이트가 필요합니다.\n\n확인을 누르시면 설치가 진행됩니다.\n\n(데모)")}>보안프로그램</button>
      <button className="btn-90s" onClick={() => alert("인증서 발급/갱신/폐기\n\n인증센터 서비스는 점검 중입니다.\n\n(데모)")}>인증센터</button>
      <button className="btn-90s" onClick={showError}>금융계산기</button>
      <button className="btn-90s" onClick={() => alert("서비스 준비중입니다.")}>환율조회</button>
      <button className="btn-90s" onClick={() => alert("전화번호: 1588-0000\n(평일 09:00~18:00)\n\n※ 온라인 문의는 지원하지 않습니다.")}>고객센터</button>
      <button className="btn-90s" onClick={() => alert("팩스: 02-1234-5678\n우편: 서울시 중구 을지로 000\n\n※ 온라인 문의는 지원하지 않습니다.")}>문의하기</button>
      <button className="btn-90s" onClick={() => alert("준비중")}>사이트맵</button>
    </div>
  );
}

export function StatusBar() {
  return (
    <div className="bg-[#c0c0c0] py-0.5 px-2 text-[10px] flex justify-between text-gray-700" style={{ borderTop: "2px ridge #fff" }}>
      <div style={{ border: "1px inset #808080", padding: "1px 8px" }}>보안등급: <span className="text-green-600">안전</span></div>
      <div style={{ border: "1px inset #808080", padding: "1px 8px" }}>접속IP: 192.168.xxx.xxx</div>
      <div style={{ border: "1px inset #808080", padding: "1px 8px" }}>마지막 접속: 2024.11.14 14:23</div>
      <div style={{ border: "1px inset #808080", padding: "1px 8px" }}>인증서 상태: <span className="text-red-600">만료됨</span></div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="bg-[#000080] text-[#c0c0c0] text-center py-4 text-[9px] leading-7" style={{ borderTop: "3px ridge #808080" }}>
      대한신뢰은행 | 서울시 중구 을지로 000 | 대표전화: 1588-0000 | 팩스: 02-1234-5678<br />
      사업자등록번호: 000-00-00000 | 통신판매업: 제2024-서울중구-0000호<br />
      <span className="text-cyan-300 cursor-pointer">개인정보처리방침</span> |{" "}
      <span className="text-cyan-300 cursor-pointer">이용약관</span> |{" "}
      <span className="text-cyan-300 cursor-pointer">전자금융거래약관</span> |{" "}
      <span className="text-cyan-300 cursor-pointer">보안정책</span> |{" "}
      <span className="text-cyan-300 cursor-pointer">고객센터</span>
      <div className="text-yellow-300 text-[10px] mt-2">
        ※ 본 사이트는 화면해상도 1024x768에 최적화되어 있습니다.
      </div>
      <div className="text-[8px] mt-1">
        Copyright &copy; 2003-2024 대한신뢰은행. All rights reserved. (이것은 연구용 데모 사이트입니다)
      </div>
    </div>
  );
}

export function HelperCharacter() {
  return (
    <div className="fixed bottom-10 left-3 z-[998] bg-yellow-100 border-2 border-gray-700 rounded-lg p-3 text-[11px] w-[180px] shadow-lg">
      <div className="text-[28px] text-center mb-1">🧑‍💼</div>
      <div className="leading-relaxed">
        안녕하세요! 뱅킹도우미입니다~<br />
        도움이 필요하시면{" "}
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={() => alert("도움말 서비스는 현재 점검 중입니다.\n\n전화 상담: 1588-0000\n(평일 09:00~16:00)")}
        >
          여기를 클릭
        </span>
        하세요! 😊
      </div>
    </div>
  );
}
