"use client";

import { MainLayout } from "@/components/MainLayout";
import { LoginBox } from "@/components/LoginBox";
import { InlineAdCasino, InlineAdLoan, InlineAdHealth } from "@/components/AdBanners";
import { useBankStore } from "@/store/bankStore";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <CertWarning />
      <InlineAdCasino />
      <LoginBox />

      <ServiceGrid />

      <InlineAdLoan />

      <NoticePreview />

      <RateTable />

      <InlineAdHealth />
    </MainLayout>
  );
}

function CertWarning() {
  return (
    <div className="bg-yellow-50 p-3 mb-3 text-[11px] text-yellow-800" style={{ border: "2px solid #ffc107" }}>
      ⚠ <b>보안 알림:</b> 안전한 인터넷뱅킹을 위해 아래 프로그램을 모두 설치해 주세요.<br />
      <span className="text-blue-600 font-bold cursor-pointer" onClick={() => alert("보안 프로그램 설치 페이지로 이동합니다.\n\n(데모)")}>
        [1] 키보드보안 프로그램 설치
      </span> |{" "}
      <span className="text-blue-600 font-bold cursor-pointer" onClick={() => alert("방화벽 설치가 필요합니다.\n\n(데모)")}>
        [2] 개인방화벽 설치
      </span> |{" "}
      <span className="text-blue-600 font-bold cursor-pointer" onClick={() => alert("설치 중 오류가 발생했습니다.\n에러코드: 0x80072F8F\n\n고객센터(1588-0000)로 문의해 주세요.\n\n(데모)")}>
        [3] 보안인증 프로그램
      </span> |{" "}
      <span className="text-blue-600 font-bold cursor-pointer" onClick={() => alert("호환되지 않는 브라우저입니다.\n\n(데모)")}>
        [4] 통합보안 모듈
      </span>
      <br />
      <span className="text-[9px] text-red-600">※ 설치가 안 될 경우, 브라우저 설정 확인 후 재시도해 주세요.</span>
    </div>
  );
}

function ServiceGrid() {
  const showError = () =>
    alert("오류가 발생했습니다.\n\n에러코드: ERR_SEC_0x80072F8F\n\n고객센터(1588-0000)로 문의해 주세요.\n\n(데모)");

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {[
        { icon: "💰", title: "예금/적금", desc: "연 3.5% 특판 정기예금", link: "/products" },
        { icon: "🏠", title: "주택담보대출", desc: "연 4.2%~ 최저금리", link: "/products" },
        { icon: "💳", title: "신용카드", desc: "최대 5만 포인트 적립", link: "/products" },
        { icon: "📈", title: "펀드/투자", desc: "AI 추천 포트폴리오", link: "/products" },
      ].map((s) => (
        <div key={s.title} className="bg-white text-center p-3 w-[calc(50%-4px)] text-[11px]" style={{ border: "2px ridge #808080" }}>
          <div className="text-[30px] mb-1">{s.icon}</div>
          <h4 className="text-[#000080] text-[12px] font-bold mb-1">{s.title}</h4>
          <p className="text-[10px]">{s.desc}</p>
          <Link href={s.link} className="text-blue-600 text-[10px]">자세히 보기 ▶</Link>
        </div>
      ))}
    </div>
  );
}

function NoticePreview() {
  const allNotices = useBankStore((s) => s.notices);
  const notices = allNotices.slice(0, 4);

  return (
    <div className="mb-4 bg-white" style={{ border: "2px inset #808080" }}>
      <div className="bg-[#000080] text-white py-1 px-3 text-[13px] font-bold flex justify-between">
        <span>📋 공지사항</span>
        <Link href="/notice" className="text-[10px] text-white no-underline">더보기 ▶</Link>
      </div>
      <table className="w-full text-[11px]" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th className="bg-[#d0d0d0] text-[10px] text-gray-700 p-1 w-[30px]" style={{ border: "1px solid #808080" }}>번호</th>
            <th className="bg-[#d0d0d0] text-[10px] text-gray-700 p-1" style={{ border: "1px solid #808080" }}>제목</th>
            <th className="bg-[#d0d0d0] text-[10px] text-gray-700 p-1 w-[70px]" style={{ border: "1px solid #808080" }}>작성일</th>
            <th className="bg-[#d0d0d0] text-[10px] text-gray-700 p-1 w-[40px]" style={{ border: "1px solid #808080" }}>조회</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((n) => (
            <tr key={n.id}>
              <td className="text-center p-1" style={{ border: "1px solid #d0d0d0" }}>{n.id}</td>
              <td className="p-1" style={{ border: "1px solid #d0d0d0" }}>
                <Link href={`/notice?id=${n.id}`} className="text-[#000080] no-underline hover:underline">
                  {n.title}
                </Link>
              </td>
              <td className="text-center p-1" style={{ border: "1px solid #d0d0d0" }}>{n.date}</td>
              <td className="text-center p-1" style={{ border: "1px solid #d0d0d0" }}>{n.views.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RateTable() {
  return (
    <table className="w-full bg-white text-[10px] mb-4" style={{ border: "2px inset #808080", borderCollapse: "collapse" }}>
      <caption className="bg-[#000080] text-white p-1 font-bold text-[12px] text-left">
        주요 금리 안내 (2024.11.15 기준)
      </caption>
      <thead>
        <tr>
          {["상품명", "6개월", "12개월", "24개월", "36개월", "비고"].map((h) => (
            <th key={h} className="bg-[#d0d0d0] p-1 text-[9px]" style={{ border: "1px solid #808080" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[
          ["정기예금", "3.20%", "3.50%", "3.40%", "3.30%", "세전, 1억 이상 우대"],
          ["자유적금", "-", "3.80%", "3.60%", "3.50%", "월 50만원 이상"],
          ["주택청약", "-", "2.80%", "2.80%", "2.80%", "무주택세대주"],
          ["신뢰정기적금", "-", "4.00%", "3.90%", "3.80%", "신규 고객 전용"],
        ].map((row) => (
          <tr key={row[0]}>
            {row.map((cell, i) => (
              <td key={i} className="p-1 text-center" style={{ border: "1px solid #c0c0c0", fontSize: i === 5 ? "8px" : undefined }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
