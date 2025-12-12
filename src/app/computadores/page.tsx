"use client";
import PageHeader from "../../../Components/PageHeader/PageHeader";
import { LuMonitor } from "react-icons/lu";
import PainelComputadores from "../../../Components/Painels/PainelComputadores/PainelComputadores";
import CardComputador from "../../../Components/Card/CardComputador";
import FormComputadores from "../../../Components/Forms/FormComputadores/FormComputadores";
import Modal from "../../../Components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import TableComputadores from "../../../Components/Tables/TableComputadores/TableComputadores";
import { EstacaoTrabalhoDTO } from "../../../types/EstacaoTrabalho";

export default function ComputadoresPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valuesCards, setValuesCards] = useState({
    totalComputadores: 0,
    totalAtivos: 0,
    totalManutencao: 0,
    totalInativos: 0,
  });

  const [estacoes, setEstacoes] = useState<EstacaoTrabalhoDTO[]>([]);

  const fetchValuesCards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/computador/infos"
      );
      const data = response.data;

      setValuesCards({
        totalComputadores: data.totalComputadores,
        totalAtivos: data.totalAtivos,
        totalManutencao: data.totalManutencao,
        totalInativos: data.totalInativos,
      });
    } catch (error) {
      console.error("Erro ao carregar dados do painel:", error);
    }
  };

  useEffect(() => {
    fetchValuesCards();
  }, []);

 

  const fetchTableData = async () => {
    try {
      // ATENÇÃO: Verifique se essa é a rota correta no seu Controller Java que retorna List<EstacaoTrabalhoDTO>
      const responseTable = await axios.get("http://localhost:8080/estacao");
      setEstacoes(responseTable.data);
    } catch (error) {
      console.error("Erro ao carregar lista de computadores:", error);
    }
  };
  // 4. Carregar tudo quando a página abrir
  useEffect(() => {
    fetchValuesCards();
    fetchTableData();
  }, []);

  // 5. Atualizar os dados quando fechar o modal (se algo foi salvo)
  const handleCloseModal = (shouldRefresh = false) => {
    setIsModalOpen(false);
    if (shouldRefresh) {
      fetchValuesCards();
      fetchTableData();
    }
  };

  return (
    <>
      <PageHeader
        icon={
          <span className="Icone-Header">
            <LuMonitor />
          </span>
        }
        title="Cadastro de Computadores"
        subtitle="Gerencie o inventario de computadores e suas localizações"
        buttonText="Adicionar Item"
        onButtonClick={() => setIsModalOpen(true)}
      />
      <PainelComputadores data={valuesCards} />

      <Modal isOpen={isModalOpen} onClose={() => handleCloseModal(false)}>
        <FormComputadores onClose={handleCloseModal} />
      </Modal>

      <TableComputadores data={estacoes} />
    </>
  );
}
