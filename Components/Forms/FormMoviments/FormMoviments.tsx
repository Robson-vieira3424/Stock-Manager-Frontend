"use client"
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import "./FormMoviments.css";

interface Product {
    id: number;
    name: string;
}

interface Departamento {
    id: number;
    nome: string;
}

interface Secretaria {
    id: number;
    nome: string;
    departamentos: Departamento[];
}

interface FormMovimentsProps {
    onClose: (shouldRefresh?: boolean) => void;
}

export default function FormMoviments({ onClose }: FormMovimentsProps) {

    const [productsList, setProductsList] = useState<Product[]>([]);

    const [listSecretarias, setListSecretarias] = useState<Secretaria[]>([]);

    const [departamentosOpcoes, setDepartamentosOpcoes] = useState<Departamento[]>([]);

    const [selectedSecretariaId, setSelectedSecretariaId] = useState<string>("");

    const [tipoMovimentacao, setTipoMovimentacao] = useState("INPUT");

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
        const currentCategoria = form.get("categoria") as string;

        // Campos que dependem do tipo
        const secretariaId = form.get("secretaria") as string;
        const departamentoId = form.get("departamento") as string;
        const currentObservacao = form.get("observacao") as string;

        let nomeSecretaria = "";
        let nomeDepartamento = "";

        if (currentType === "OUTPUT") {
            // Busca o objeto completo da secretaria pelo ID
            const secObj = listSecretarias.find(s => s.id.toString() === secretariaId);
            // Busca o objeto completo do departamento pelo ID (dentro da lista filtrada)
            const depObj = departamentosOpcoes.find(d => d.id.toString() === departamentoId);

            if (secObj) nomeSecretaria = secObj.nome;
            if (depObj) nomeDepartamento = depObj.nome;
        }
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
                categoria: currentCategoria,
                secretaria: nomeSecretaria,
                departamento: nomeDepartamento,
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
               
                {tipoMovimentacao === "OUTPUT" && (
                    <>
                        {/* SECRETARIA */}
                        <div className="container__label__input__form">
                            <label>Secretaria</label>
                            <select
                                className="select__item"
                                name="secretaria" // Nome do campo para o FormData
                                value={selectedSecretariaId} // Valor controlado pelo estado
                                onChange={(e) => {
                                    const novoId = e.target.value;
                                    setSelectedSecretariaId(novoId);

                                    // MÁGICA: Filtra na memória
                                    const secEncontrada = listSecretarias.find(s => s.id.toString() === novoId);
                                    
                                    if (secEncontrada) {
                                        setDepartamentosOpcoes(secEncontrada.departamentos);
                                    } else {
                                        setDepartamentosOpcoes([]);
                                    }
                                }}
                                required
                            >
                                <option value="" disabled>Selecione a Secretaria</option>
                                {/* AQUI ESTAVA O ERRO: Faltava o map */}
                                {listSecretarias.map((sec) => (
                                    <option key={sec.id} value={sec.id}>
                                        {sec.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* DEPARTAMENTO */}
                        <div className="container__label__input__form">
                            <label>Departamento</label>
                            <select 
                                className="select__item" 
                                name="departamento"
                                disabled={!selectedSecretariaId} // Desabilita se não tiver secretaria
                                defaultValue=""
                            >
                                <option value="" disabled>Selecione o Departamento</option>
                                {departamentosOpcoes.map((dep) => (
                                    <option key={dep.id} value={dep.id}>
                                        {dep.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

               
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
                    <button
                        type="button"
                        className="cancelar__btn"
                        onClick={() => onClose(false)}
                    >Cancelar</button>
                    <button type="submit" className="registrar__btn">Registrar Movimentação</button>
                </div>
            </fieldset>
        </form>
    );
}