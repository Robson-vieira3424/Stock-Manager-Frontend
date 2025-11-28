import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./global.css"
import "../../Components/HeaderGlobal/HeaderGlobal"
import { HeaderGlobal } from "../../Components/HeaderGlobal/HeaderGlobal";
const inter = Inter({ subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stock Manager",
  description: "Sistema de Estoque",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <HeaderGlobal>
          {children}
        </HeaderGlobal>
      </body>
    </html>
  );
}
