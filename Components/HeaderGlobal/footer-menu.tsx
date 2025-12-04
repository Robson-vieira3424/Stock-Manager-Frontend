import { FiUser } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import './footer-menu.css';
export function FooterMenu() {
    return (
        <footer className="footer__nav__menu__global">
            <section className="container__info_footer_nav">
                <div className="icone__footer__nav"><FiUser fontSize={19} /></div>
                <div className="info__footer__nav">
                    <p className="email__user">emailteste@gmail.com</p>
                    <p className="role__user">administrador</p>
                </div>
            </section>
            <button className="btn__exit"><RxExit fontSize={20} />sair</button>
        </footer>
    )
}