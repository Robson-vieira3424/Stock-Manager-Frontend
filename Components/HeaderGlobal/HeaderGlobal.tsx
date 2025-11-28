"use client";
import { ReactNode, useState } from "react";
import { IoMenu } from "react-icons/io5";
import "./HeaderGlobal.css"
import { BsBoxSeam } from "react-icons/bs";
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
            <header className={`header__global ${menuAberto ? 'empurrado' : ''}`}>
                <button className="menu__btn" onClick={toggleMenu}><IoMenu /></button>
                <h1 className="title__header__global">stock manager</h1>
            </header>

            <aside className={`sidebar ${menuAberto ? 'aberto' : ''} `}>
                <nav className="nav__menu__global">
                    <header className="header__nav__menu__global">
                        <div className="icon__header__nav__global"><BsBoxSeam/></div>
                        
                        <div className="container__title__header__nav__global">
                            <h1 className="title__header__nav__global">Departamento de Tecnologia</h1>
                            <p className="subtile__header__nav__global">Prefeitura Municipal de Penedo</p>
                        </div>

                    </header>
                    <ul className="lista__nav__menu__global">
                        <li className="item__nav__menu__global"><a className="link__nav__menu__global" href="">dashboard</a></li>
                        <li className="item__nav__menu__global"><a className="link__nav__menu__global" href="">estoque</a></li>
                        <li className="item__nav__menu__global"><a className="link__nav__menu__global" href="">movimentações</a></li>
                        <li className="item__nav__menu__global"><a className="link__nav__menu__global" href="">manutenção</a></li>
                        <li className="item__nav__menu__global"><a className="link__nav__menu__global" href="">levantamento</a></li>
                        <li className="item__nav__menu__global"><a className="link__nav__menu__global" href="">relatórios</a></li>
                        <li className="item__nav__menu__global"><a className="link__nav__menu__global" href="">configurações</a></li>
                    </ul>
                </nav>
            </aside>

            <main className={`conteudo__pagina ${menuAberto ? 'empurrado' : ''}`}>
                {children}
            </main>

            {menuAberto && <div className="overlay" onClick={toggleMenu}></div>}
        </div>
    )
}