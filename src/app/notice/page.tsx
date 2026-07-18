"use client";

import { MainLayout } from "@/components/MainLayout";
import { useBankStore } from "@/store/bankStore";
import { InlineAdHealth } from "@/components/AdBanners";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function NoticeContent() {
  const notices = useBankStore((s) => s.notices);
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");
  const [openNotice, setOpenNotice] = useState<number | null>(
    selectedId ? parseInt(selectedId) : null
  );

  const selected = notices.find((n) => n.id === openNotice);

  return (
    <>
      {selected && (
        <div className="bg-white p-3 mb-4" style={{ border: "2px ridge #808080" }}>
          <div className="bg-[#800000] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
            📄 {selected.title}
          </div>
          <div className="text-[10px] text-gray-500 mb-3">
            작성일: {selected.date} | 조회수: {selected.views.toLocaleString()}
          </div>
          <div className="text-[12px] leading-7 whitespace-pre-line">{selected.content}</div>
          <div className="text-center mt-4">
            <button className="btn-90s" onClick={() => setOpenNotice(null)}>목록으로</button>
          </div>
        </div>
      )}

      <div className="bg-white mb-4" style={{ border: "2px inset #808080" }}>
        <div className="bg-[#000080] text-white py-1 px-3 text-[13px] font-bold flex justify-between">
          <span>📋 공지사항 전체목록</span>
        </div>
        <table className="w-full text-[11px]" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="bg-[#d0d0d0] p-1 text-[10px] w-[30px]" style={{ border: "1px solid #808080" }}>번호</th>
              <th className="bg-[#d0d0d0] p-1 text-[10px]" style={{ border: "1px solid #808080" }}>제목</th>
              <th className="bg-[#d0d0d0] p-1 text-[10px] w-[70px]" style={{ border: "1px solid #808080" }}>작성일</th>
              <th className="bg-[#d0d0d0] p-1 text-[10px] w-[40px]" style={{ border: "1px solid #808080" }}>조회</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n.id} className={openNotice === n.id ? "bg-blue-50" : ""}>
                <td className="text-center p-1" style={{ border: "1px solid #d0d0d0" }}>{n.id}</td>
                <td className="p-1" style={{ border: "1px solid #d0d0d0" }}>
                  <span
                    className="text-[#000080] cursor-pointer hover:underline"
                    onClick={() => setOpenNotice(n.id)}
                  >
                    {n.important && <span className="text-red-600">[중요] </span>}
                    {n.title.replace("[중요] ", "").replace("[필수] ", "")}
                  </span>
                </td>
                <td className="text-center p-1" style={{ border: "1px solid #d0d0d0" }}>{n.date}</td>
                <td className="text-center p-1" style={{ border: "1px solid #d0d0d0" }}>{n.views.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center py-2 text-[11px]">
          <span className="mx-1 cursor-pointer">◀◀</span>
          <span className="mx-1 cursor-pointer">◀</span>
          <b className="text-red-600 mx-1">1</b>
          <span className="mx-1 cursor-pointer text-[#000080]">2</span>
          <span className="mx-1 cursor-pointer text-[#000080]">3</span>
          <span className="mx-1 cursor-pointer">▶</span>
          <span className="mx-1 cursor-pointer">▶▶</span>
        </div>
      </div>

      <InlineAdHealth />
    </>
  );
}

export default function NoticePage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="text-center p-4 text-[12px]">로딩 중...</div>}>
        <NoticeContent />
      </Suspense>
    </MainLayout>
  );
}
