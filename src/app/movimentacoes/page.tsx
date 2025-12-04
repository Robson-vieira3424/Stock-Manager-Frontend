"use client";
import { LuActivity } from "react-icons/lu";
import PageHeader from "../../../components/PageHeader/PageHeader";
import "../global.css";
import PainelMovimentacoes from "../../../components/Painels/PainelMovimentacoes/painelMovimentacoes";
import MovimentsTable from "../../../components/Tables/MovimentsTable/MovimentsTable";
import { useEffect, useState } from "react";
import { Moviments } from "../../../types/Moviments";
import axios from "axios";
import Modal from "../../../components/Modal/Modal";
import FormMoviments from "../../../components/Forms/FormMoviments/FormMoviments";

export default function MovimentacoesPage() {
  const [listMoviments, setListMoviments] = useState<Moviments[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getListMoviments = async () => {
    const res = await axios.get("http://localhost:8080/moviments");
    const lista = res.data as Moviments[];
    setListMoviments(lista);
  };

  useEffect(() => {
    getListMoviments();
  }, []);

  /* const criarMoviment = (e) =>{
     
     } */

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PageHeader
        icon={
          <span className="Icone-Header">
            <LuActivity color="white" />
          </span>
        }
        title="Movimentações"
        subtitle="Histórico de entradas e saídas - Prefeitura Municipal de Penedo"
        buttonText="Nova Movimentação"
        onButtonClick={() => setIsModalOpen(true)}
      />

      <PainelMovimentacoes />
      <MovimentsTable movimentacao={listMoviments} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormMoviments onClose={handleCloseModal} />
      </Modal>
    </>
  );
}
