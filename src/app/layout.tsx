import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { HeaderGlobal } from "../../components/HeaderGlobal/HeaderGlobal";
const inter = Inter({ subsets: ["latin"] });

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