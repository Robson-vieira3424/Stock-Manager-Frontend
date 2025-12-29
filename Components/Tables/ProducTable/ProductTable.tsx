"use client"
import "./ProductTable.css";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold
import { useEffect, useState } from "react";
import axios from "axios";

type Produto = {
  id?: number;
  name: string;
  quantity: number;
  min: number;
  ultimaAtualizacao: string;
  status?: string;
  categoria?: string;
};

export default function ProductTable() {

  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const PAGE_SIZE = 15;

  useEffect(() => {
    fetchProdutos();
  }, [pagina]);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product", {
        params: {
          page: pagina,
          size: PAGE_SIZE
        }
      });

      setListaProdutos(response.data.content);
      setTotalPaginas(response.data.totalPages);

    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusLabel = (qtd: number, min: number, statusBackend?: string) => {

    if (statusBackend) return statusBackend.replace("_", " ");

    if (qtd === 0) return "Sem Estoque";
    if (qtd <= min) return "Estoque Baixo";
    return "Em Estoque";
  };

  if (isLoading) {
    return <div className="container__table"><p style={{ padding: 20 }}>Carregando...</p></div>;
  }

  if (listaProdutos.length === 0) {
    return (
      <section className="container__table">
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
          <h3>Nenhum produto encontrado.</h3>
        </div>
      </section>
    )
  }

  return (
    <section className="container__table__maior">
      <section className="container__header__table">
        <h1 className="title__table_products">controle de Estoque</h1>
        <input className="bucar__products__table" type="text" placeholder="Buscar produtos" />
      </section>
      
      <section className="container__table">
        <table className="table__products">
          <thead className="header__table__products">
            <tr className="theader__row">
              <th className="th__theader">Item</th>
              <th className="th__theader">Categoria</th>
              <th className="th__theader">Quantidade</th>
              <th className="th__theader">Estoque Min</th>
              <th className="th__theader">Status</th>

              <th className="th__theader">Ultima Atualização</th>
              <th className="th__theader">Ações</th>
            </tr>
          </thead>

          <tbody>
            {
              listaProdutos.map((item, index) => {
                const currentStatus = getStatusLabel(item.quantity, item.min, item.status);
                return (
                  <tr key={item.id || index} className="row__body">

                    <td className="Title__item">{item.name}</td>


                    <td className="texto__table__generico">{item.categoria || "Geral"}</td>


                    <td className="texto__table__generico">{item.quantity}</td>


                    <td className="texto__table__generico">{item.min}</td>

                    <td>
                      <span
                        className={`status 
                      ${currentStatus === "Em Estoque" ? "status--alta" : ""}
                      ${currentStatus === "Estoque Baixo" ? "status--baixa" : ""}
                      ${currentStatus === "Sem Estoque" ? "status--zero" : ""}
                    `}
                      >
                        {currentStatus}
                      </span>
                    </td>

                    <td className="data__atualização">
                      {item.ultimaAtualizacao}
                    </td>

                    <td>
                      <div className="acoes">
                        <button className="btn-edit">
                          <FiEdit />
                        </button>
                        <button className="btn-delete">
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
      <div className="pagination">
        <button
          disabled={pagina === 0}
          onClick={() => setPagina(pagina - 1)}
          className="anterior__botao"
        >
          Anterior
        </button>

        <span className="info__qtd__paginas">
          {pagina + 1} / {totalPaginas}
        </span>

        <button
          disabled={pagina + 1 >= totalPaginas}
          onClick={() => setPagina(pagina + 1)}
          className="proxima__botao"
        >
          Próxima
        </button>
      </div>
    </section>
  );
}