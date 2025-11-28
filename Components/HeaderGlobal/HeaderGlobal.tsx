"use client";
import { ReactNode, useState } from "react";
import { IoMenu } from "react-icons/io5";
import "./HeaderGlobal.css"
import { BsBoxSeam } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuArrowLeftRight } from "react-icons/lu";
import { FaWrench } from "react-icons/fa";
import { PiClipboardTextBold } from "react-icons/pi";
import { BsFileEarmarkText } from "react-icons/bs";
import { GrConfigure } from "react-icons/gr";
import { FaGear } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { RxExit } from "react-icons/rx";



interface HeaderGlobalProps {
    children: ReactNode;
}

export function HeaderGlobal({ children }: HeaderGlobalProps) {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
      <div className="container__global">
        <header className={`header__global ${menuAberto ? "empurrado" : ""}`}>
          <button className="menu__btn" onClick={toggleMenu}>
            <IoMenu />
          </button>
          <h1 className="title__header__global">stock manager</h1>
        </header>

        <aside className={`sidebar ${menuAberto ? "aberto" : ""} `}>
          <nav className="nav__menu__global">
            <header className="header__nav__menu__global">
              <div className="icon__header__nav__global">
                <BsBoxSeam />
              </div>

              <div className="container__title__header__nav__global">
                <h1 className="title__header__nav__global">
                  Departamento de Tecnologia
                </h1>
                <p className="subtile__header__nav__global">
                  Prefeitura Municipal de Penedo
                </p>
              </div>
            </header>
            <ul className="lista__nav__menu__global">
              <li className="item__nav__menu__global">
                <a className="link__nav__menu__global" href="">
                  <LuLayoutDashboard fontSize={20} />
                  dashboard
                </a>
              </li>
              <li className="item__nav__menu__global">
                <a className="link__nav__menu__global" href="">
                  <BsBoxSeam fontSize={18} />
                  estoque
                </a>
              </li>
              <li className="item__nav__menu__global">
                <a className="link__nav__menu__global" href="">
                  <LuArrowLeftRight fontSize={18} />
                  movimentações
                </a>
              </li>
              <li className="item__nav__menu__global">
                <a className="link__nav__menu__global" href="">
                  <GrConfigure fontSize={18} />
                  manutenção
                </a>
              </li>
              <li className="item__nav__menu__global">
                <a className="link__nav__menu__global" href="">
                  <PiClipboardTextBold fontSize={20} />
                  levantamento
                </a>
              </li>
              <li className="item__nav__menu__global">
                <a className="link__nav__menu__global" href="">
                  <BsFileEarmarkText fontSize={20} /> relatórios
                </a>
              </li>
              <li className="item__nav__menu__global">
                <a className="link__nav__menu__global" href="">
                  <FaGear fontSize={19} /> configurações
                </a>
              </li>
            </ul>
          </nav>

          <footer className="footer__nav__menu__global">
            <section className="container__info_footer_nav">
                
                <div className="icone__footer__nav"><FiUser fontSize={25}/></div> 
                <div className="info__footer__nav"> 
                    <p className="email__user">emailteste@gmail.com</p> 
                    <p className="role__user">administrador</p>
                </div>
                </section>
            <button className="btn__exit"><RxExit/></button>
          </footer>
        </aside>

        <main className={`conteudo__pagina ${menuAberto ? "empurrado" : ""}`}>
          {children}
        </main>

        {menuAberto && <div className="overlay" onClick={toggleMenu}></div>}
      </div>
    );
}