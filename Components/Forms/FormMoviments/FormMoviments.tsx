"use client"
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import "./FormMoviments.css";

// Interface para tipar o objeto de produto que virá do banco
interface Product {
    id: number;
    name: string;
}
interface Secretaria {
    id: number;
    nome: string;
    departamentos: any[]; 
}
interface FormMovimentsProps {
    onClose: (shouldRefresh?: boolean) => void;
}

export default function FormMoviments({ onClose }: FormMovimentsProps) {
    // Estados do Formulário

    const [productsList, setProductsList] = useState<Product[]>([]);

    const [listSecretarias, setListSecretarias] = useState<Secretaria[]>([]);

    const [tipoMovimentacao, setTipoMovimentacao] = useState("INPUT");

    const [formData, setFormData] = useState({
        productId: "",
        type: "INPUT", // Valor padrão compatível com Java (INPUT/OUTPUT)
        amount: 0,
        date: "", // Data de hoje
        departamento: "",
        categoria: "",
        secretaria: "",
        observacao: ""
    });


    // 1. Buscar os produtos reais para pegar o ID correto
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Ajuste a URL se seu endpoint de listar produtos for diferente
                // Buscando Produtos
                const responseProd = await axios.get("http://localhost:8080/product/select");
                setProductsList(responseProd.data as Product[]);
                // Buscando Secretarias
                const responseSec = await axios.get("http://localhost:8080/secretaria");
                // Garante que é um array, senão passa array vazio para evitar erro no map
               console.log("Secretarias backend:", responseSec.data);
                setListSecretarias(Array.isArray(responseSec.data) ? responseSec.data : []);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchProducts();
    }, []);



    // 3. Envia para o Backend
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(productsList)

        const form = new FormData(e.currentTarget)

        const currentProductId = form.get("productId") as string;
        const currentAmount = Number(form.get("amount"));
        const currentType = form.get("type") as string;
        const currentDate = form.get("date") as string;
        const currentCategoria = form.get("categoria") as string;

        // Campos que dependem do tipo
        const currentSecretaria = form.get("secretaria") as string || "";
        const currentDepartamento = form.get("departamento") as string || "";
        const currentObservacao = form.get("observacao") as string;

        // Validação básica
        if (!currentProductId || !currentAmount) {
            alert("Por favor, selecione um produto e informe a quantidade.");
            return;
        }

        try {
            // Montando o DTO
            const payload = {
                productId: Number(currentProductId),
                type: currentType,
                amount: currentAmount,
                moveDate: currentDate,
                categoria: currentCategoria,

                secretaria: currentSecretaria,
                departamento: currentDepartamento,
                observacao: currentObservacao
            };
            // console.log("Enviando:", payload); // Debug
            await axios.post("http://localhost:8080/moviments", payload);

            onClose(true);
        } catch (error) {
            console.error("Erro ao registrar movimentação:", error);
            alert("Erro ao registrar. Verifique se há estoque suficiente para saídas.");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Nova Movimentação</legend>

                {/* PRODUTO (Agora busca do banco) */}
                <div className="container__label__input__form">
                    <label>Produto</label>
                    <select
                        className="select__item"
                        name="productId"

                        required
                    >
                        <option value="">Selecione um produto</option>
                        {productsList.map((prod) => (
                            <option key={prod.id} value={prod.id}>
                                {prod.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* CATEGORIA (Visual apenas) */}
                <div className="container__label__input__form">
                    <label>Categoria</label>
                    <input
                        type="text"
                        name="categoria"

                    />
                </div>

                {/* TIPO DE MOVIMENTAÇÃO */}
                <div className="container__label__input__form">
                    <label>Tipo de Movimentação</label>
                    <select
                        className="select__item"
                        name="type"
                        value={tipoMovimentacao}
                        onChange={(e) => setTipoMovimentacao(e.target.value)}

                    >
                        <option value="INPUT">Entrada</option>
                        <option value="OUTPUT">Saída</option>
                    </select>
                </div>

                {/* QUANTIDADE */}
                <div className="container__label__input__form">
                    <label>Quantidade</label>
                    <input
                        type="number"
                        name="amount"
                        min="1"
                        required
                    />
                </div>
               {/* RENDERIZAÇÃO CONDICIONAL */}
                {tipoMovimentacao === "OUTPUT" && (
                    <>
                        {/* DESTINO (Secretaria) */}
                        <div className="container__label__input__form">
                            <label>Secretaria (Destino)</label>
                            <select
                                className="select__item"
                                name="secretaria"
                                defaultValue=""
                            >
                                <option value="" disabled>Selecione uma Secretaria</option>
                                
                                {/* MUDANÇA 3: Usando sec.id na key e sec.nome no texto */}
                                {listSecretarias.map((sec) => (
                                    <option key={sec.id} value={sec.nome}>
                                        {sec.nome}
                                    </option>
                                ))}

                            </select>
                        </div>

                        {/* DEPARTAMENTO */}
                        <div className="container__label__input__form">
                            <label>Departamento</label>
                            <input
                                type="text"
                                name="departamento"
                                placeholder="Ex: RH, Almoxarifado..."
                            />
                        </div>
                    </>
                )}

                {/* OBSERVAÇÕES (Visual apenas) */}
                <div className="container__label__input__form100">
                    <label>Observações (opcional)</label>
                    <input
                        className="input__observação"
                        type="text"
                        name="observacao"
                        placeholder="Digite algo"
                    />
                </div>

                <div className="container__buttons">
                    {/* Botão Cancelar não recarrega a página (type button) */}
                    <button
                        type="button"
                        className="cancelar__btn"
                        onClick={() => onClose(false)}
                    >
                        Cancelar
                    </button>
                    <button type="submit" className="registrar__btn">
                        Registrar Movimentação
                    </button>
                </div>
            </fieldset>
        </form>
    );
}