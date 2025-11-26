'use client'; 


import PageHeader from "../../../Components/PageHeader/PageHeader";

export default function EstoquePage() {
    return (
        <>
            <PageHeader
                icon={<span></span>}
                title="Estoque de Produtos"
                subtitle="Departamento de Tecnologia - Prefeitura Municipal de Penedo"
                buttonText="Adicionar Item"
                onButtonClick={() => alert("Adicionar item")}
            />
        </>
    );
}