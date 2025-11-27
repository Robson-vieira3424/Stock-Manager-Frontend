'use client'; 

import { BsBoxSeam } from "react-icons/bs";
import PageHeader from "../../../Components/PageHeader/PageHeader";
import Painel from "../../../Components/Painel-infos/painel";
import ProductTable from "../../../Components/Table/ProductTable";
import "../global.css"

export default function EstoquePage() {
    return (
        <>
            <PageHeader
                icon={<span className="Icone-Header"><BsBoxSeam/></span>}
                title="Estoque de Produtos"
                subtitle="Departamento de Tecnologia - Prefeitura Municipal de Penedo"
                buttonText="Adicionar Item"
                onButtonClick={() => alert("Adicionar item")}
            />
            <Painel/>
            <ProductTable/>
        </>
    );
}