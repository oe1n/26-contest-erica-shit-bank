"use client";

import { MainLayout } from "@/components/MainLayout";
import { InlineAdLoan, InlineAdHealth } from "@/components/AdBanners";

const products = [
  {
    name: "신뢰 정기예금",
    rate: "연 3.5% (12개월 기준, 세전)",
    target: "개인 (1인 1계좌)",
    minAmount: "100만원",
    features: ["중도해지시 금리 우대 불가", "만기 자동 연장 가능", "비대면 가입 불가"],
  },
  {
    name: "행복 자유적금",
    rate: "연 4.0% (우대금리 포함, 세전)",
    target: "개인",
    minAmount: "월 100만원",
    features: ["우대금리 조건: 급여이체 + 카드결제 3건 이상", "중도인출 불가", "비대면 가입 불가"],
  },
  {
    name: "주택담보대출",
    rate: "연 4.2%~ (변동금리)",
    target: "담보가의 최대 70%",
    minAmount: "-",
    features: ["중도상환수수료 2%", "상환방식: 원리금균등, 원금균등, 만기일시"],
  },
  {
    name: "신용대출",
    rate: "연 5.5%~ (신용등급에 따라 변동)",
    target: "재직 1년 이상 직장인",
    minAmount: "최소 100만원",
    features: ["한도: 최대 연소득의 200%", "서류 심사 3~5일 소요"],
  },
];

export default function ProductsPage() {
  return (
    <MainLayout>
      <div className="bg-[#f8f8f8] p-3 mb-4" style={{ border: "2px ridge #808080" }}>
        <div className="bg-gradient-to-r from-[#000080] to-[#4040a0] text-white py-1 px-3 text-[13px] font-bold -m-3 mb-3">
          🏦 금융상품 안내
        </div>

        <div className="text-[11px] leading-relaxed">
          {products.map((p, i) => (
            <div key={p.name}>
              <div className="bg-white p-3 mb-2" style={{ border: "1px solid #ccc" }}>
                <b className="text-[13px] text-[#000080]">★ {p.name}</b><br />
                <div className="mt-1 space-y-0.5">
                  <div>금리: {p.rate}</div>
                  <div>가입대상: {p.target}</div>
                  <div>최소 가입금액: {p.minAmount}</div>
                  {p.features.map((f) => (
                    <div key={f} className="text-[10px] text-gray-600">• {f}</div>
                  ))}
                </div>
                <div className="mt-2">
                  <button
                    className="btn-90s"
                    onClick={() =>
                      alert(
                        "가입 신청은 영업점을 방문하시거나\n전화(1588-0000)로 문의해 주세요.\n\n필요 서류:\n1. 신분증\n2. 인감도장\n3. 기본증명서"
                      )
                    }
                  >
                    가입신청
                  </button>
                  <button
                    className="btn-90s ml-1"
                    onClick={() =>
                      alert(
                        "오류가 발생했습니다.\n\n에러코드: ERR_SEC_0x80072F8F\n\n고객센터(1588-0000)로 문의해 주세요.\n\n(데모)"
                      )
                    }
                  >
                    상세보기
                  </button>
                </div>
              </div>

              {i === 1 && <InlineAdLoan />}
            </div>
          ))}
        </div>
      </div>

      <InlineAdHealth />
    </MainLayout>
  );
}
