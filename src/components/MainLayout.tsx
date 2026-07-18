"use client";

import {
  SessionTimer,
  VisitorCounter,
  TopBanner,
  MarqueeBar,
  ExchangeBar,
  SiteHeader,
  UnderConstruction,
  Toolbar,
  StatusBar,
  Footer,
  HelperCharacter,
} from "./Header";
import { Sidebar } from "./Sidebar";
import { SidebarAds, FloatingAd, PopupAds } from "./AdBanners";
import { InitModals } from "./InitModals";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionTimer />
      <VisitorCounter />
      <FloatingAd />
      <PopupAds />
      <InitModals />
      <HelperCharacter />

      <TopBanner />
      <MarqueeBar />
      <ExchangeBar />
      <SiteHeader />
      <UnderConstruction />
      <Toolbar />

      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-3 min-w-0">{children}</div>
        <SidebarAds />
      </div>

      <StatusBar />
      <Footer />
    </>
  );
}
