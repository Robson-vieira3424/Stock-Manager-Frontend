import { BsBoxSeam } from "react-icons/bs"
import { NavHeaderItem } from "./constants.header"
import './nav-menu.css'

type NavMenuProps = {
    navItems: NavHeaderItem[]
}

export function NavMenu({ navItems }: NavMenuProps) {
    return (
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
                {navItems.map((element, idx) => (
                    <li key={idx} className="item__nav__menu__global">
                        <a className="link__nav__menu__global" href={element.href}>
                            {element.icon}
                            {element.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}