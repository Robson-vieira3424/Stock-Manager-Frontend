import { useState, useEffect } from "react";
import axios from "axios";
import "./FormMoviments.css";

// Interface para tipar o objeto de produto que virá do banco
interface Product {
    id: number;
    name: string;
}

interface FormMovimentsProps {
    onClose: (shouldRefresh?: boolean) => void;
}

export default function FormMoviments({ onClose }: FormMovimentsProps) {
    // Estados do Formulário
    
    const [productsList, setProductsList] = useState<Product[]>([]);
    
    const [formData, setFormData] = useState({
        productId: "",
        type: "INPUT", // Valor padrão compatível com Java (INPUT/OUTPUT)
        amount: 0,
        date: new Date().toISOString().split('T')[0], // Data de hoje
        // Campos visuais (não salvos no banco ainda pois faltam no DTO)
        categoria: "", 
        secretaria: "",
        observacao: "" 
    });

    // Listas estáticas (apenas visuais por enquanto)
    const SECRETARIAS = [
        "Saúde", "Educação", "Assistência Social", "Administração", 
        "Finanças", "Infraestrutura", "Urbanismo", "Meio Ambiente", 
        "Transporte", "Segurança Pública", "Cultura", "Esportes", 
        "Turismo", "Agricultura", "Tecnologia e Inovação",
    ];

    // 1. Buscar os produtos reais para pegar o ID correto
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Ajuste a URL se seu endpoint de listar produtos for diferente
                const response = await axios.get("http://localhost:8080/productg");
                setProductsList(response.data); 
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchProducts();
    }, []);

    // 2. Atualiza o estado conforme o usuário digita
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Envia para o Backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação básica
        if (!formData.productId || !formData.amount) {
            alert("Por favor, selecione um produto e informe a quantidade.");
            return;
        }

        try {
            // Montando o DTO exato que o Java espera
            const payload = {
                productId: Number(formData.productId),
                type: formData.type, // Já está como INPUT ou OUTPUT
                amount: Number(formData.amount),
                // Nota: O Java está sobrescrevendo a data com "new Date()" no Service,
                // mas enviamos aqui caso você mude a lógica no futuro.
                moveDate: formData.date 
            };

            await axios.post("http://localhost:8080/moviments", payload);
            
            // SUCESSO: Fecha o modal e avisa para atualizar a tabela (true)
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
                        value={formData.productId} 
                        onChange={handleChange}
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
                        value={formData.categoria} 
                        onChange={handleChange} 
                    />
                </div>

                {/* TIPO DE MOVIMENTAÇÃO */}
                <div className="container__label__input__form">
                    <label>Tipo de Movimentação</label>
                    <select 
                        className="select__item" 
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange}
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
                        value={formData.amount} 
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                {/* DESTINO/ORIGEM (Visual apenas) */}
                <div className="container__label__input__form">
                    <label>Destino/Origem</label>
                    <select 
                        className="select__item"
                        name="secretaria"
                        value={formData.secretaria}
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma Secretaria</option>
                        {SECRETARIAS.map((sec) => (
                            <option key={sec} value={sec}>
                                {sec}
                            </option>
                        ))}
                    </select>
                </div>

                {/* DATA */}
                <div className="container__label__input__form">
                    <label>Data</label>
                    <input 
                        type="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                    />
                </div>

                {/* OBSERVAÇÕES (Visual apenas) */}
                <div className="container__label__input__form100">
                    <label>Observações (opcional)</label>
                    <input 
                        className="input__observação" 
                        type="text" 
                        name="observacao" 
                        value={formData.observacao}
                        onChange={handleChange}
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