'use client';
import { useState, useEffect } from "react";
import { BsBoxSeam } from "react-icons/bs";
import FormProduct from "../../../components/Forms/FormProduct/FormProduct";
import Modal from "../../../components/Modal/Modal";
import PageHeader from "../../../components/PageHeader/PageHeader";
import PainelProducts from "../../../components/Painels/PainelProducts/painelProducts";
import ProductTable from "../../../components/Tables/ProducTable/ProductTable";
import "../global.css";

export default function EstoquePage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valuesCards, setValuesCards] = useState({
        totalItens: 0,
        totalUnidades: 0,
        itensDisponiveis: 0,
        estoqueBaixo: 0
    });

    const fetchValuesCards = async () => {
        try {
            const response = await axios.get("http://localhost:8080/product/infos");
            const data = response.data;

            setValuesCards({
                totalItens: data.totalItens,
                totalUnidades: data.unidadesDisponiveis,
                itensDisponiveis: data.itensDisponiveis,
                estoqueBaixo: data.estoqueBaixo
            });

        } catch (error) {
            console.error("Erro ao carregar dados do painel:", error);
        }
    };

    useEffect(() => {
        fetchValuesCards();
    }, []);

    const handleCloseModal = (shouldRefresh = false) => {
        setIsModalOpen(false);


        if (shouldRefresh === true) {
            fetchValuesCards();
        }
    };

    return (
        <>
            <PageHeader
                icon={<span className="Icone-Header"><BsBoxSeam /></span>}
                title="Estoque de Produtos"
                subtitle="Departamento de Tecnologia - Prefeitura Municipal de Penedo"
                buttonText="Adicionar Item"
                onButtonClick={() => setIsModalOpen(true)}
            />

            <PainelProducts data={valuesCards} />

            <ProductTable />

            <Modal isOpen={isModalOpen} onClose={() => handleCloseModal(false)}>
                <FormProduct onClose={handleCloseModal} />
            </Modal>
        </>
    );
}
