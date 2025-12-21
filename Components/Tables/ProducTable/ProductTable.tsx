import "./ProductTable.css"
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
  
  
  status?: string;   
  categoria?: string;
};

export default function ProductTable() {

    const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProdutos();           
    },[]);

    const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product");
      setListaProdutos(response.data);
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
    return <div className="container__table"><p style={{padding: 20}}>Carregando...</p></div>;
  }

  if (listaProdutos.length === 0) {
     return (
        <section className="container__table">
            <div style={{padding: "40px", textAlign: "center", color: "#666"}}>
                <h3>Nenhum produto encontrado.</h3>
            </div>
        </section>
     )
  }

    return (

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
                        <th  className="th__theader">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        listaProdutos.map((item, index) =>{
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
                    
                    {new Date().toLocaleDateString()}
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
    );
}