"use client";

import { useState, useEffect } from "react";

function AdPopup({
  id,
  title,
  children,
  style,
  onClose,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  style: React.CSSProperties;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed z-[10000]"
      style={{ border: "3px outset #808080", boxShadow: "5px 5px 10px rgba(0,0,0,0.5)", ...style }}
    >
      <div className="win-titlebar cursor-move">
        <span>{title}</span>
        <button
          className="bg-[#c0c0c0] text-[10px] px-1 font-bold"
          style={{ border: "2px outset #fff", lineHeight: "14px" }}
          onClick={onClose}
        >
          X
        </button>
      </div>
      <div className="bg-[#e8e8e8] p-4 text-center">{children}</div>
    </div>
  );
}

export function FloatingAd() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="fixed z-[997] float-anim cursor-pointer"
      onClick={() => {
        alert("이 링크는 외부 사이트로 연결됩니다.\n\n대한신뢰은행과 무관한 페이지입니다.\n\n(연구용 데모)");
      }}
    >
      <div
        className="bg-red-600 text-white py-2 px-4 font-bold text-[13px] whitespace-nowrap"
        style={{ border: "3px outset #ff6666" }}
      >
        🎁 EVENT! 클릭하면 상품이! 🎁
        <span className="text-[8px] ml-2 text-gray-300 cursor-pointer" onClick={(e) => { e.stopPropagation(); setVisible(false); }}>
          X
        </span>
      </div>
    </div>
  );
}

export function PopupAds() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow1(true), 4000);
    const t2 = setTimeout(() => setShow2(true), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {show1 && (
        <AdPopup id="popup1" title="광고 - 건강기능식품" style={{ top: 80, left: 50, width: 250 }} onClose={() => setShow1(false)}>
          <div className="text-[14px] text-red-700 font-bold">★ 혈압에 좋은 홍삼! ★</div>
          <div className="text-[11px] mt-2 leading-relaxed">
            6년근 홍삼 정과<br />
            지금 주문하면 50% 할인!<br />
            <b className="text-red-600">89,000원 → 44,500원</b>
          </div>
          <button className="mt-2 bg-red-700 text-white border-none py-1 px-4 cursor-pointer text-[11px]">바로 구매하기</button>
          <div className="text-[8px] text-gray-400 mt-1">[오늘 하루 이 창을 열지 않음]</div>
        </AdPopup>
      )}

      {show2 && (
        <AdPopup id="popup2" title="알림" style={{ top: 150, right: 60, width: 220 }} onClose={() => setShow2(false)}>
          <div className="text-[13px] font-bold text-red-600">⚠ 컴퓨터 보안 위험!</div>
          <div className="text-[10px] mt-1">
            악성코드 <span className="text-red-600 font-bold">27개</span> 발견됨<br />
            즉시 검사가 필요합니다
          </div>
          <button
            className="mt-2 bg-red-600 text-white font-bold py-1 px-5 cursor-pointer"
            style={{ border: "2px outset #ff6666" }}
            onClick={() => alert("이것은 가짜 광고입니다.\n\n(연구용 데모)")}
          >
            무료 검사하기
          </button>
        </AdPopup>
      )}
    </>
  );
}

export function SidebarAds() {
  const adClick = () =>
    alert("이 링크는 외부 사이트로 연결됩니다.\n\n대한신뢰은행과 무관한 페이지입니다.\n\n(연구용 데모)");

  return (
    <div className="w-[200px] min-w-[200px] p-1 flex flex-col gap-2 max-lg:hidden">
      {/* 바이러스 경고 */}
      <div className="shake bg-red-600 text-white p-2 font-bold cursor-pointer" style={{ border: "3px solid #ffff00" }} onClick={adClick}>
        <div className="text-[16px] text-center">⚠ 경고!</div>
        <div className="text-[11px] mt-1 text-center">
          고객님의 컴퓨터에서<br />
          <span className="text-yellow-300">바이러스 3개</span>가<br />
          발견되었습니다!
        </div>
        <div className="mt-2 text-center">
          <button
            className="bg-yellow-300 text-red-600 font-bold py-1 px-3 cursor-pointer text-[12px]"
            style={{ border: "2px outset #ffcc00" }}
            onClick={(e) => { e.stopPropagation(); adClick(); }}
          >
            지금 치료하기
          </button>
        </div>
      </div>

      {/* 당첨 */}
      <div
        className="p-2 font-bold text-red-600 text-center cursor-pointer text-[14px]"
        style={{ background: "linear-gradient(45deg, gold, orange, gold)", border: "4px double red" }}
        onClick={adClick}
      >
        🎉 축하합니다!! 🎉<br />
        <span className="text-[18px]">1,000,000번째</span><br />
        방문자이십니다!<br />
        <div className="text-[11px] mt-1">▶ 상품을 수령하세요!</div>
      </div>

      {/* 다운로드 버튼 */}
      <div
        className="bg-green-600 text-white text-center rounded-sm py-3 font-bold text-[16px] cursor-pointer"
        style={{ border: "3px outset #00cc00" }}
        onClick={adClick}
      >
        ▶ 다운로드 ◀<br />
        <span className="text-[10px]">보안프로그램 설치</span>
      </div>

      {/* 건강 광고 */}
      <div className="bg-pink-50 p-2 text-[11px] text-pink-700 font-bold cursor-pointer" style={{ border: "2px solid #ff69b4" }} onClick={adClick}>
        ★ 당뇨에 좋은 여주 ★<br />
        하루 1포로 혈당 관리!<br />
        <span className="text-[9px]">60대 이상 필수 식품</span>
      </div>

      {/* 보험 광고 */}
      <div className="bg-orange-50 p-2 text-[11px] text-orange-700 font-bold cursor-pointer" style={{ border: "2px solid #ff8c00" }} onClick={adClick}>
        ★ 실버보험 가입 ★<br />
        80세까지 보장!<br />
        월 9,900원~<br />
        <span className="text-[9px]">▶ 무료 상담 신청</span>
      </div>

      {/* 깜빡이는 광고 */}
      <div className="ad-flash-anim p-2 text-center text-[11px] cursor-pointer" style={{ border: "3px outset #808080" }} onClick={adClick}>
        🔧 PC 속도가 느리신가요?<br />
        <span className="text-[10px]">클릭 한번으로 해결!</span>
      </div>

      {/* 로또 */}
      <div className="bg-yellow-50 p-2 text-[11px] text-yellow-800 font-bold cursor-pointer" style={{ border: "2px solid #daa520" }} onClick={adClick}>
        ★ 로또 당첨번호 예측 ★<br />
        AI가 분석한 이번주 번호!<br />
        <span className="text-[9px]">적중률 99.7%!!</span>
      </div>
    </div>
  );
}

export function InlineAdCasino() {
  return (
    <div
      className="my-3 p-2 text-center text-[12px] font-bold cursor-pointer text-yellow-400"
      style={{
        background: "linear-gradient(45deg, #1a0033, #330066, #1a0033)",
        border: "2px solid #ffd700",
        animation: "ad-pulse 1s infinite",
      }}
      onClick={() => alert("이것은 가짜 광고입니다.\n\n(연구용 데모)")}
    >
      ★★★ 라이브 바카라 ★ 첫 입금 300% 보너스!! ★ 지금 바로 시작하세요!! ★★★
    </div>
  );
}

export function InlineAdLoan() {
  return (
    <div
      className="my-3 p-2 text-center text-[12px] font-bold text-red-700 cursor-pointer bg-red-50"
      style={{ border: "3px dashed #cc0000" }}
      onClick={() => alert("이것은 가짜 광고입니다.\n\n(연구용 데모)")}
    >
      ★ 급전이 필요하신가요? 신용등급 무관! 당일 대출! 전화 한통이면 OK! ★<br />
      <span className="text-[10px]">☎ 010-XXXX-XXXX (24시간 상담)</span>
    </div>
  );
}

export function InlineAdHealth() {
  return (
    <div
      className="my-3 p-2 text-center text-[12px] font-bold text-green-700 cursor-pointer bg-green-50"
      style={{ border: "2px solid #00aa00" }}
      onClick={() => alert("이것은 가짜 광고입니다.\n\n(연구용 데모)")}
    >
      ☘ 관절에 좋은 건강식품! 지금 주문하면 1+1! 무릎 통증이 사라집니다! ☘<br />
      <span className="text-[9px]">▶ 70대 할머니도 계단을 뛰어다닙니다! [체험수기 보기]</span>
    </div>
  );
}
