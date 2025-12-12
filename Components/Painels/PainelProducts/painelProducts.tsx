import { BsBoxSeam } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";

import "../painel.css";
import Card from "../../Card/Card";

export default function ({ data }) {
    const {
        totalItens = 0,
        totalUnidades = 0,
        itensDisponiveis = 0,
        estoqueBaixo = 0
    } = data || {};
    return (
        <section className="painel">
            <section className="container__cards">
                <Card icon={<BsBoxSeam />} title="Total de Itens" quantity={totalItens} subtitle="itens cadastrados" cor="black" />

                <Card icon={<FiTrendingUp />} title="Unidades Disponíveis" quantity={totalUnidades} subtitle="unidades em estoque" cor="black"/>

                <Card icon={<FaRegFileAlt />} title="Itens Disponíveis" quantity={itensDisponiveis} subtitle="com estoque > 0" cor="#21C45D" />

                <Card icon={<IoWarningOutline />} title="Estoque Baixo" quantity={estoqueBaixo} subtitle="itens com estoque baixo" cor="#F59F0A"/>
            </section>
        </section>
    );
}