import { create } from "zustand";

export interface Transaction {
  id: string;
  date: string;
  type: "입금" | "출금" | "이체";
  amount: number;
  balance: number;
  memo: string;
  target?: string;
}

export interface Account {
  id: string;
  number: string;
  name: string;
  type: string;
  balance: number;
  transactions: Transaction[];
}

export interface Notice {
  id: number;
  title: string;
  date: string;
  views: number;
  content: string;
  important: boolean;
}

export interface Recipient {
  id: string;
  name: string;
  bank: string;
  account: string;
}

interface BankState {
  isLoggedIn: boolean;
  user: { name: string; id: string; lastLogin: string } | null;
  accounts: Account[];
  notices: Notice[];
  recipients: Recipient[];
  loginAttempts: number;
  sessionTimeLeft: number;
  securityCardNumber: number;
  visitorCount: number;

  login: (id: string, pw: string, ssn: string) => { success: boolean; message: string };
  logout: () => void;
  transfer: (
    fromAccountId: string,
    accountPw: string,
    recipientId: string,
    amount: number,
    secCard1: string,
    secCard2: string
  ) => { success: boolean; message: string };
  decrementTimer: () => void;
  resetTimer: () => void;
  refreshSecurityCard: () => number;
  incrementVisitor: () => void;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

const initialAccounts: Account[] = [
  {
    id: "acc1",
    number: "110-234-567890",
    name: "자유입출금통장",
    type: "보통예금",
    balance: 3_247_830,
    transactions: [
      { id: "t1", date: "2024.11.14", type: "입금", amount: 2_500_000, balance: 3_247_830, memo: "11월 급여" },
      { id: "t2", date: "2024.11.13", type: "출금", amount: 50_000, balance: 747_830, memo: "ATM 출금" },
      { id: "t3", date: "2024.11.12", type: "출금", amount: 128_400, balance: 797_830, memo: "카드대금" },
      { id: "t4", date: "2024.11.10", type: "이체", amount: 300_000, balance: 926_230, memo: "월세", target: "김철수" },
      { id: "t5", date: "2024.11.08", type: "입금", amount: 100_000, balance: 1_226_230, memo: "용돈" },
      { id: "t6", date: "2024.11.05", type: "출금", amount: 89_000, balance: 1_126_230, memo: "마트 결제" },
      { id: "t7", date: "2024.11.01", type: "출금", amount: 45_200, balance: 1_215_230, memo: "통신비" },
    ],
  },
  {
    id: "acc2",
    number: "110-987-654321",
    name: "비상금통장",
    type: "저축예금",
    balance: 15_820_000,
    transactions: [
      { id: "t8", date: "2024.11.01", type: "입금", amount: 500_000, balance: 15_820_000, memo: "적금이체" },
      { id: "t9", date: "2024.10.01", type: "입금", amount: 500_000, balance: 15_320_000, memo: "적금이체" },
      { id: "t10", date: "2024.09.01", type: "입금", amount: 500_000, balance: 14_820_000, memo: "적금이체" },
    ],
  },
  {
    id: "acc3",
    number: "110-456-789012",
    name: "신뢰정기적금",
    type: "정기적금",
    balance: 6_000_000,
    transactions: [
      { id: "t11", date: "2024.11.15", type: "입금", amount: 500_000, balance: 6_000_000, memo: "12회차 납입" },
    ],
  },
];

const initialRecipients: Recipient[] = [
  { id: "r1", name: "김철수", bank: "국민은행", account: "123-456-789012" },
  { id: "r2", name: "이영희", bank: "신한은행", account: "987-654-321098" },
  { id: "r3", name: "박민수", bank: "하나은행", account: "456-789-012345" },
  { id: "r4", name: "최지은", bank: "우리은행", account: "321-098-765432" },
  { id: "r5", name: "정대한", bank: "농협은행", account: "789-012-345678" },
];

const initialNotices: Notice[] = [
  {
    id: 152, title: "[중요] OpenRouter API 키 갱신 안내", date: "2024.11.15", views: 3241,
    content: "고객님의 안전한 인터넷뱅킹 이용을 위해 OpenRouter API 키 갱신이 필요합니다.\n\n갱신 방법:\n1. OpenRouter 키 관리 접속\n2. 기존 키 삭제\n3. 최신 키 등록\n4. 브라우저 재시작\n\n※ 갱신하지 않으면 일부 서비스 이용이 제한될 수 있습니다.",
    important: true,
  },
  {
    id: 151, title: "[필수] 전자금융사기 예방 안내", date: "2024.11.10", views: 2187,
    content: "최근 전자금융사기(피싱, 스미싱)가 증가하고 있습니다.\n\n주의사항:\n- 은행 직원은 절대 전화로 비밀번호를 묻지 않습니다\n- 출처 불명의 링크를 클릭하지 마세요\n- 보안카드 전체 번호를 요구하면 100% 사기입니다",
    important: true,
  },
  {
    id: 150, title: "시스템 정기점검 안내 (매주 일요일)", date: "2024.11.01", views: 1892,
    content: "시스템 정기점검 안내\n\n점검일시: 매주 일요일 00:00~06:00\n점검내용: 서버 정기점검\n\n점검 중에는 모든 서비스 이용이 불가합니다.\n불편을 드려 죄송합니다.",
    important: false,
  },
  {
    id: 149, title: "1일 이체한도 변경 안내 (영업점 방문 필수)", date: "2024.10.25", views: 4521,
    content: "이체한도 변경 안내\n\n온라인 변경 불가\n반드시 영업점 방문\n\n지참 서류:\n1. 신분증\n2. 통장\n3. 도장\n\n처리시간: 약 30분~1시간",
    important: false,
  },
  { id: 148, title: "전자금융사기 예방 수칙 안내", date: "2024.10.20", views: 1234, content: "전자금융사기 예방을 위한 10가지 수칙을 안내드립니다.", important: false },
  { id: 147, title: "개인정보처리방침 변경 안내", date: "2024.10.15", views: 987, content: "개인정보처리방침이 2024년 11월 1일부로 변경됩니다.", important: false },
  { id: 146, title: "추석 연휴 영업시간 안내", date: "2024.09.10", views: 2345, content: "추석 연휴 기간 영업시간을 안내드립니다.", important: false },
  { id: 145, title: "인터넷뱅킹 이용약관 변경", date: "2024.09.01", views: 876, content: "인터넷뱅킹 이용약관이 변경되었습니다.", important: false },
];

export const useBankStore = create<BankState>((set, get) => ({
  isLoggedIn: false,
  user: null,
  accounts: initialAccounts,
  notices: initialNotices,
  recipients: initialRecipients,
  loginAttempts: 0,
  sessionTimeLeft: 120,
  securityCardNumber: Math.floor(Math.random() * 35) + 1,
  visitorCount: 1_247_891,

  login: (id, pw, ssn) => {
    const state = get();

    if (state.loginAttempts >= 5) {
      return { success: false, message: "로그인 5회 실패로 이용이 제한되었습니다.\n\n해제 방법:\n영업점 방문 또는 고객센터(1588-0000) 전화\n\n(이 메시지는 데모입니다)" };
    }

    if (ssn !== "870123") {
      set((s) => ({ loginAttempts: s.loginAttempts + 1 }));
      return { success: false, message: `주민등록번호가 일치하지 않습니다.\n\n(오류횟수: ${state.loginAttempts + 1}/5)` };
    }

    if (id === "testuser" && pw === "Test1234!@") {
      set({
        isLoggedIn: true,
        user: { name: "홍길동", id: "testuser", lastLogin: "2024.11.14 14:23" },
        loginAttempts: 0,
        sessionTimeLeft: 120,
      });
      return { success: true, message: "" };
    }

    set((s) => ({ loginAttempts: s.loginAttempts + 1 }));
    return { success: false, message: `로그인에 실패했습니다.\n\n아이디 또는 비밀번호를 확인해 주세요.\n\n(오류횟수: ${state.loginAttempts + 1}/5)\n\n※ 테스트 계정: testuser / Test1234!@` };
  },

  logout: () => {
    set({ isLoggedIn: false, user: null, sessionTimeLeft: 120, loginAttempts: 0 });
  },

  transfer: (fromAccountId, accountPw, recipientId, amount, secCard1, secCard2) => {
    const state = get();
    if (!state.isLoggedIn) return { success: false, message: "로그인이 필요합니다." };
    if (accountPw !== "4321") return { success: false, message: "출금계좌 비밀번호가 일치하지 않습니다." };

    const account = state.accounts.find((a) => a.id === fromAccountId);
    if (!account) return { success: false, message: "출금계좌를 선택해 주세요." };

    const recipient = state.recipients.find((r) => r.id === recipientId);
    if (!recipient) return { success: false, message: "수신인을 선택해 주세요." };

    if (amount <= 0) return { success: false, message: "이체금액을 입력해 주세요." };
    if (amount > account.balance) return { success: false, message: `잔액이 부족합니다.\n\n출금가능액: ${account.balance.toLocaleString()}원\n이체요청액: ${amount.toLocaleString()}원` };
    if (amount > 1_000_000) return { success: false, message: "1일 이체한도를 초과했습니다.\n\n현재 한도: 1,000,000원\n요청 금액: " + amount.toLocaleString() + "원\n\n한도 변경은 영업점 방문이 필요합니다." };
    if (!secCard1 || !secCard2 || secCard1.length !== 2 || secCard2.length !== 2) return { success: false, message: "보안카드 번호를 정확히 입력해 주세요.\n(앞 2자리, 뒤 2자리)" };

    const newTransaction: Transaction = {
      id: generateId(),
      date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
      type: "이체",
      amount,
      balance: account.balance - amount,
      memo: recipient.name,
      target: recipient.account,
    };

    set((s) => ({
      accounts: s.accounts.map((a) =>
        a.id === fromAccountId
          ? { ...a, balance: a.balance - amount, transactions: [newTransaction, ...a.transactions] }
          : a
      ),
      securityCardNumber: Math.floor(Math.random() * 35) + 1,
    }));

    return {
      success: true,
      message: `이체가 완료되었습니다.\n\n출금계좌: ${account.number}\n입금은행: ${recipient.bank}\n입금계좌: ${recipient.account}\n받는분: ${recipient.name}\n이체금액: ${amount.toLocaleString()}원\n수수료: 500원\n\n잔액: ${(account.balance - amount).toLocaleString()}원`,
    };
  },

  decrementTimer: () => {
    set((s) => {
      if (s.sessionTimeLeft <= 0) return { sessionTimeLeft: 120 };
      return { sessionTimeLeft: s.sessionTimeLeft - 1 };
    });
  },

  resetTimer: () => set({ sessionTimeLeft: 120 }),

  refreshSecurityCard: () => {
    const num = Math.floor(Math.random() * 35) + 1;
    set({ securityCardNumber: num });
    return num;
  },

  incrementVisitor: () => {
    set((s) => ({ visitorCount: s.visitorCount + Math.floor(Math.random() * 3) + 1 }));
  },
}));
