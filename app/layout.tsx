import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import SideNav from "@/components/side-nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Credit App",
  description: "Credit App is a web application for managing loans and repayments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen w-full flex-col">
          <TooltipProvider>
            <Header />
            <div className="flex">
              <SideNav />
              <div className="ml-10 flex-1"> {children}</div>
            </div>
            <Toaster />
          </TooltipProvider>
        </div>
      </body>
    </html>
  );
}
