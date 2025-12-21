"use client";
import { ChevronLeft, ChevronRight, CpuIcon } from "lucide-react";
import "./TableComputador.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiCpu } from "react-icons/fi";
import { BiMap } from "react-icons/bi";
import { FaMemory } from "react-icons/fa";
import { MdStorage } from "react-icons/md";
import { EstacaoTrabalhoDTO } from "../../../types/EstacaoTrabalho";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TableComputadorProps {
  data: EstacaoTrabalhoDTO[];
}

export default function ({ data }: TableComputadorProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; 

 
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
    <Table className="table__computadores">
      <TableCaption></TableCaption>

      <TableHeader>
        <TableRow className="Header__Table">
          <TableHead className="Table__Head">Patrimônio</TableHead>
          <TableHead className="Table__Head">Equipamento</TableHead>
          <TableHead className="Table__Head">Tipo</TableHead>
          <TableHead className="Table__Head">Componentes</TableHead>
          <TableHead className="Table__Head">Localização</TableHead>
          <TableHead className="Table__Head">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {currentData.map((estacao) => {
          const pc = estacao.computador;
          if (!pc) return null;

          const tipoPc = (() => {
            const modelo = pc.modelo?.toLowerCase() ?? "";
            console.log(pc.nome)
            if (modelo.includes("xps")) return "Dell XPS";
            if (modelo.includes("all-in-one")) return "All-in-One";
            if (modelo.includes("thinkcenter")) return "ThinkCentre";
            if (modelo.includes("")) return "Genérico";
          })();
          return (
            <TableRow key={estacao.id}>
              <TableCell className="patrimonio__linha">
                {pc.patrimonio}
              </TableCell>

              <TableCell className="equipamento">
               {}
                <div className="nome__equipamento">{pc.nome}</div>
                <div className="modelo__equipamento">{pc.modelo}</div>
              </TableCell>

              <TableCell>
                <section className="align__tipo">
                  <section
                    className={
                      tipoPc === "Dell XPS"
                        ? "style__type__xps"
                        : tipoPc === "All-in-One"
                        ? "style__type__allinone"
                        : tipoPc === "ThinkCentre"
                        ? "style__type__lenovo"
                        : "style__type__generico"
                    }
                  >
                    {tipoPc}
                  </section>
                </section>
              </TableCell>

              <TableCell>
                <section className="info__componentes">
                  <section className="info__processador">
                    <FiCpu fontSize={15} color="rgba(0, 0, 0, 0.5)" />
                    {pc.processador}
                  </section>
                  <section className="container__memoria__armazenamento">
                    <section className="info__memoria">
                      <FaMemory color="rgba(0, 0, 0, 0.5)" />
                      {pc.memoria}

                      <MdStorage color="rgba(0, 0, 0, 0.5)" />
                      {pc.armazenamento}
                    </section>
                  </section>
                </section>
              </TableCell>

              <TableCell>
                <section className="info__localizacao">
                  <div className="container__icon__localizacao">
                    <BiMap fontSize={24} color=" #00000099" />
                  </div>
                  <section className="container__secretaria__setor">
                    <section className="container__secretaria__localizacao">
                      {estacao.secretaria}
                    </section>
                    <section className="container__setor__localizacao">
                      {estacao.setor}
                    </section>
                  </section>
                </section>
              </TableCell>

              <TableCell className="status___computador">
                    <div
                className={
                  pc.statusEquipamento === "EM__USO"
                    ? "style__type__uso"
                    : pc.statusEquipamento === "  MANUTENCAO"
                    ? "style__type__manutencao"
                    : pc.statusEquipamento === "DEFEITO"
                    ? "style__type__defeito"
                    : "style__type__disponivel"
                }
              >
                {pc.statusEquipamento === "EM_USO" || pc.statusEquipamento === "EM__USO"
                      ? "Em Uso"
                      : pc.statusEquipamento?.trim() === "MANUTENCAO"
                      ? "Manutenção"
                      : pc.statusEquipamento === "DEFEITO"
                      ? "Defeito"
                      : "Disponível"}
                  </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
    
    <div className="flex items-center justify-end space-x-2 py-4 px-2">
        <div className="text-sm text-muted-foreground flex-1">
          Página {currentPage} de {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Próximo
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    
    </>    
  );
}
