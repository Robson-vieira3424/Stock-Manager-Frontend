"use client";
import { ReactNode, useState } from "react";
import { FiSidebar } from "react-icons/fi";
import "./HeaderGlobal.css";
import { NavHeaderConfig } from "./constants.header";
import { NavMenu } from "./nav-menu";
import { FooterMenu } from "./footer-menu";

interface HeaderGlobalProps {
  children: ReactNode;
}

export function HeaderGlobal({ children }: HeaderGlobalProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <>
      <header className={`header__global ${menuAberto ? "empurrado" : ""}`}>
        <button className="menu__btn" onClick={toggleMenu}>
          <FiSidebar fontSize={20} />
        </button>
        <h1 className="title__header__global">stock manager</h1>
      </header>
      <div style={{ display: 'flex', width: '100%' }}>
        <aside className={`sidebar ${menuAberto ? "aberto" : ""} `}>
          <NavMenu navItems={NavHeaderConfig} />
          <FooterMenu />
        </aside>

        <main className={`conteudo__pagina ${menuAberto ? "empurrado" : ""}`}>
          {children}
        </main>
      </div>

      {menuAberto && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}