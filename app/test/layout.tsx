import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Supply ESG Ops — 운영 대시보드",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (<div className="min-h-screen flex flex-col bg-white">
        {children}
    </div>
    );
}