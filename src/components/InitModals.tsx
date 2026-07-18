"use client";

import { useState, useEffect } from "react";

export function InitModals() {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    setShowFirst(true);
  }, []);

  if (!showFirst && !showSecond) return null;

  return (
    <>
      {showFirst && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
          <div className="bg-[#c0c0c0] w-[420px] max-w-[90vw]" style={{ border: "3px outset #fff" }}>
            <div className="win-titlebar">
              <span>⚠ 대한신뢰은행 - 보안 알림</span>
              <button
                className="bg-[#c0c0c0] text-[10px] px-1 font-bold"
                style={{ border: "2px outset #fff" }}
                onClick={() => { setShowFirst(false); setShowSecond(true); }}
              >
                X
              </button>
            </div>
            <div className="p-5 text-center text-[13px] leading-7">
              <div className="text-[40px] mb-3">⚠️</div>
              <b>
                안전한 인터넷뱅킹을 위해<br />
                보안 프로그램 업데이트가 필요합니다.
              </b>
              <br /><br />
              <span className="text-[11px]">
                업데이트하지 않으면 서비스 이용이<br />
                제한될 수 있습니다.
              </span>
            </div>
            <div className="flex gap-3 justify-center pb-4 px-5">
              <button className="btn-submit" onClick={() => { setShowFirst(false); setShowSecond(true); }}>설치하기</button>
              <button className="btn-90s" onClick={() => { setShowFirst(false); setShowSecond(true); }}>나중에</button>
              <button className="btn-90s" onClick={() => { setShowFirst(false); setShowSecond(true); }}>취소</button>
            </div>
          </div>
        </div>
      )}

      {showSecond && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
          <div className="bg-[#c0c0c0] w-[420px] max-w-[90vw]" style={{ border: "3px outset #fff" }}>
            <div className="win-titlebar">
              <span>📢 대한신뢰은행 - 이벤트 안내</span>
              <button
                className="bg-[#c0c0c0] text-[10px] px-1 font-bold"
                style={{ border: "2px outset #fff" }}
                onClick={() => setShowSecond(false)}
              >
                X
              </button>
            </div>
            <div className="p-5 text-center">
              <div className="text-[15px] text-red-600 font-bold">🎊 연말 특별 이벤트! 🎊</div>
              <div className="text-[12px] mt-3 leading-7">
                정기예금 가입 시<br />
                <b className="text-[16px] text-red-600">연 5.0% 특별금리</b><br />
                적용해 드립니다!<br /><br />
                <span className="text-[9px] text-gray-400">
                  (선착순 100명, 1인 1회, 최소 1억원 이상,<br />
                  급여이체+카드결제+보험가입 동시 조건 충족 시)
                </span>
              </div>
            </div>
            <div className="flex gap-3 justify-center pb-4 px-5">
              <button className="btn-submit" onClick={() => setShowSecond(false)}>자세히 보기</button>
              <button className="btn-90s" onClick={() => setShowSecond(false)}>오늘 하루 안보기</button>
              <button className="btn-90s" onClick={() => setShowSecond(false)}>1주일 안보기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
