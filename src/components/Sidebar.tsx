"use client";

import Link from "next/link";
import { useBankStore } from "@/store/bankStore";

export function Sidebar() {
  const { isLoggedIn } = useBankStore();

  const requireLogin = (msg?: string) => {
    if (!isLoggedIn) {
      alert(msg || "해당 서비스는 로그인 후 이용 가능합니다.");
      return true;
    }
    return false;
  };

  const confusedMenu = () => {
    const messages = [
      "서비스 이용시간이 아닙니다.\n\n이용 가능 시간:\n평일 09:00 ~ 17:00\n(점심시간 12:00~13:00 제외)",
      "이 서비스를 이용하시려면\n보안 프로그램을 설치해야 합니다.\n\n설치 후 브라우저를 재시작해 주세요.\n\n(데모)",
      "세션이 만료되었습니다.\n다시 로그인해 주세요.\n\n보안을 위해 자동 로그아웃 되었습니다.\n\n(데모)",
      "해당 메뉴는 별도 신청이 필요합니다.\n\n가까운 영업점을 방문하시거나\n고객센터(1588-0000)로 전화해 주세요.\n\n영업시간: 평일 09:00~16:00",
    ];
    alert(messages[Math.floor(Math.random() * messages.length)]);
  };

  return (
    <div className="w-[180px] min-w-[180px] bg-[#e8e8e8] p-1 max-lg:hidden" style={{ borderRight: "3px ridge #c0c0c0" }}>
      <div className="bg-[#000080] text-white py-1 px-2 text-[12px] font-bold text-center mb-0.5">★ 개인뱅킹 ★</div>
      <ul className="list-none p-0">
        <SidebarItem href="/account" label="조회/이체" onClick={() => requireLogin()} />
        <SidebarItem label="계좌조회" onClick={() => {
          if (requireLogin()) return;
          alert("서비스 점검중입니다.\n이용 가능 시간: 평일 09:00~16:00\n(공휴일 제외)");
        }} />
        <SidebarItem href="/transfer" label="자금이체" onClick={() => requireLogin()} />
        <SidebarItem label="이체결과조회" onClick={() => {
          if (requireLogin()) return;
          alert("보안카드를 준비해 주세요.\n\n(데모)");
        }} />
        <SidebarItem label="예금/신탁" onClick={confusedMenu} />
        <SidebarItem label="적금" onClick={confusedMenu} />
        <SidebarItem label="대출" onClick={() => alert("해당 서비스는 영업점에서만 이용 가능합니다.")} />
        <SidebarItem label="외환" onClick={confusedMenu} />
        <SidebarItem label="펀드" onClick={confusedMenu} />
        <SidebarItem label="보험" onClick={confusedMenu} />
        <SidebarItem label="카드" onClick={confusedMenu} />
        <SidebarItem label="공과금" onClick={confusedMenu} />
      </ul>

      <div className="bg-[#000080] text-white py-1 px-2 text-[12px] font-bold text-center mt-3 mb-0.5">★ 전자금융 ★</div>
      <ul className="list-none p-0">
        <SidebarItem label="보안인증센터" onClick={() => alert("보안 인증서 관리 서비스입니다.\n\n인증서 발급/갱신/폐기\n\n서비스 점검 중입니다.\n(데모)")} />
        <SidebarItem label="보안프로그램" onClick={() => alert("보안프로그램을 설치해 주세요.\n\n(데모)")} />
        <SidebarItem label="OTP이용안내" onClick={() => alert("OTP 발급은 영업점을 직접 방문해 주세요.")} />
        <SidebarItem label="전화상담" onClick={() => alert("전화번호: 1588-0000\n(평일 09:00~18:00)")} />
      </ul>

      {/* 사이드바 광고 */}
      <div className="mt-4">
        <div
          className="bg-pink-50 p-2 text-[11px] text-pink-700 font-bold cursor-pointer"
          style={{ border: "2px solid #ff69b4" }}
          onClick={() => alert("이것은 가짜 광고입니다.\n\n(연구용 데모)")}
        >
          ★ 무료 운세 보기 ★<br />
          오늘의 금전운은?<br />
          <span className="text-[9px]">▶ 클릭하세요!</span>
        </div>
      </div>

      <div className="mt-2">
        <div
          className="bg-blue-50 p-2 text-[11px] text-blue-800 font-bold cursor-pointer"
          style={{ border: "2px solid #0000ff" }}
          onClick={() => alert("이것은 가짜 광고입니다.\n\n(연구용 데모)")}
        >
          ★ 저금리 대출 ★<br />
          연 2.9%~<br />
          <span className="text-[9px]">▶ 5초만에 한도조회!</span>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ href, label, onClick }: { href?: string; label: string; onClick?: () => void }) {
  const content = (
    <span
      className="block py-1.5 px-2 text-[#000080] text-[11px] no-underline cursor-pointer hover:bg-[#000080] hover:text-yellow-300"
      onClick={(e) => {
        if (onClick) {
          onClick();
          if (!href) e.preventDefault();
        }
      }}
    >
      {label}
    </span>
  );

  if (href) {
    return (
      <li style={{ borderBottom: "1px dotted #808080" }}>
        <Link href={href} className="no-underline">
          {content}
        </Link>
      </li>
    );
  }

  return <li style={{ borderBottom: "1px dotted #808080" }}>{content}</li>;
}
