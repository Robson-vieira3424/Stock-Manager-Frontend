'use client';

import { BsBoxSeam } from "react-icons/bs";
import PageHeader from "../../../Components/PageHeader/PageHeader";
import ProductTable from "../../../Components/Tables/ProducTable/ProductTable";
import "../global.css";
import PainelProducts from "../../../Components/Painels/PainelProducts/painelProducts";
import { useState, useEffect } from "react";
import Modal from "../../../Components/Modal/Modal";
import FormProduct from "../../../Components/Forms/FormProduct/FormProduct";
import axios from "axios";

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
