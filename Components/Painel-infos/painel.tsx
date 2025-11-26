import { BsBoxSeam } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";

import "./painel.css"
import Card from "../Card/Card";

export default function(){
    return(
        <section className="painel">
            <section className="container__cards">
            <Card icon={<BsBoxSeam/>} title="Total de Itens" quantity="5" subtitle="itens cadastrados" />

            <Card icon={<FiTrendingUp/>} title="Unidades Disponíveis" quantity="79" subtitle="unidades em estoque"/>
            
            <Card icon={<FaRegFileAlt/>} title="Itens Disponíveis" quantity="4" subtitle="com estoque > 0" />
            
            <Card icon={<IoWarningOutline/>} title="Estoque Baixo" quantity="2" subtitle="itens com estoque baixo"/>
            </section>
        </section>
    );
}