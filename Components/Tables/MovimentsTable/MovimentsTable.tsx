"use client";
import "./MovimentsTable.css"

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Moviments } from "../../../types/Moviments";
import { useState, useEffect } from "react";
import axios from "axios";
type Movimentacao = {
    id: number;
    moveDate: string;
    type: string;
    productName: number;
    categoria: string;
    amount: string;
    departamentoId:number;
    observacao: string;
    termo: string;

}

export default function MovimentsTable() {
    const [listaMovimentacoes, setListaMovimentacoes] = useState<Movimentacao[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchMoviemtacoes = async () => {
        try {
            const response = await axios.get("http://localhost:8080/moviments");
            setListaMovimentacoes(response.data)
            
            const departamento = await axios.get("http://localhost:8080/sec/")
        } catch (error) {
            console.error("Erro ao buscar movimentacoes:", error);
        }finally {
    setLoading(false);
  }
};
    useEffect(() => {
        fetchMoviemtacoes();
    }, [])


    return (
        <section className="container__maior__table">
            <section className="container__header__table">
                <h1 className="title__table__moviments">histórico de movimentações</h1>
                <input type="text" className="input__find__moviments" placeholder="Buscar movimentações" />
            </section>

            <section className="container__table">
                <table className="table__moviments">
                    <thead className="header__table__moviments">
                        <tr className="theader__row">
                            <th className="th__theader">Data</th>
                            <th className="th__theader">Item</th>
                            <th className="th__theader">Categoria</th>
                            <th className="th__theader">Tipo</th>
                            <th className="th__theader">Quantidade</th>
                            <th className="th__theader">Destino/Origem</th>
                            <th className="th__theader">Observações</th>
                            <th className="th__theader">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaMovimentacoes.length === 0 && (
                            <tr>
                                <td colSpan={8} style={{ textAlign: "center" }}>
                                    Não há movimentações cadastradas!
                                </td>
                            </tr>
                        )}

                        {listaMovimentacoes.map((item) => (
                            <tr key={item.id} className="row__body">
                                <td>{item.moveDate}</td>
                                <td>{item.productName}</td>
                                <td>{item.categoria}</td>
                                <td>
                                    <span
                                        className={`tipo ${item.type === "Entrada" ? "entrada" : "saida"
                                            }`}
                                    >
                                        {item.type}
                                    </span>
                                </td>
                                <td>{item.amount}</td>
                                <td>{item.destino}</td>
                                <td>{item.observacao}</td>
                                <td>
                                    <div className="acoes">
                                        <button className="btn-edit"><FiEdit /></button>
                                        <button className="btn-delete"><RiDeleteBin6Line /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </section >
        </section>
    );
}