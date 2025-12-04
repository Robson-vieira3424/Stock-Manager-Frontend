import { FaBox } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { CgDanger } from "react-icons/cg";
import { IoTrendingUpSharp } from "react-icons/io5";
import { CardProps } from "./Card-Dashboard";

export const dashboardCardsConfig: CardProps[] = [
    {
        icon: (
            <div className="icon" style={{ backgroundColor: "#007BFF", }}>
                <FaBox color="white" />
            </div>
        ),
        quantity: "15",
        title: "Total de Itens",
        subtitle: "12",
    },
    {
        icon: (
            <div
                className="icon"
                style={{
                    backgroundColor: "#007BFF", // Fundo azul
                }}
            >
                <GoArrowSwitch color="white" />
            </div>
        ),
        quantity: "45",
        title: "Movimentações Hoje",
        subtitle: "8",
    },
    {
        icon: (
            <div
                className="icon"
                style={{
                    backgroundColor: "#FF5733", // Fundo vermelho
                }}
            >
                <CgDanger color="white" />
            </div>
        ),
        quantity: "12",
        title: "Itens em Estoque Baixo",
        subtitle: "-3",
    },
    {
        icon: (
            <div
                className="icon"
                style={{
                    backgroundColor: "#28A745", // Fundo verde
                }}
            >
                <IoTrendingUpSharp color="white" />
            </div>
        ),
        quantity: "R$ 2.5M",
        title: "Valor Estimado",
        subtitle: "15",
    },
];