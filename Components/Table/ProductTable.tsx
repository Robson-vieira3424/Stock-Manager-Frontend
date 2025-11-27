import "./ProductTable.css"
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold

export default function ProductTable() {
    type Produto = {
        id: string; // Ou number, mas string é comum para IDs
        nome: string;
        Categoria: string;
        quantidade: number;
        estoqueMin: number;
        status: "Em Estoque" | "Estoque Baixo" | "Sem Estoque"; // Assumi um enum/literal
        Fonernecedor: string;
        atualização: string; // Assumi uma data em formato string (YYYY-MM-DD)
    };

    const produto: Produto[] = [
        {
            id: "1001",
            nome: "Teclado Mecânico RGB",
            Categoria: "Periféricos",
            quantidade: 150,
            estoqueMin: 50,
            status: "Em Estoque",
            Fonernecedor: "TechSupply Ltda",
            atualização: "2025-11-20"
        },
        {
            id: "1002",
            nome: "Mouse Sem Fio Ergonômico",
            Categoria: "Periféricos",
            quantidade: 45,
            estoqueMin: 50,
            status: "Estoque Baixo",
            Fonernecedor: "Mundo Digital S/A",
            atualização: "2025-11-25"
        },
        {
            id: "2003",
            nome: "Monitor LED 27 polegadas",
            Categoria: "Hardware",
            quantidade: 70,
            estoqueMin: 20,
            status: "Em Estoque",
            Fonernecedor: "HardCore Dist.",
            atualização: "2025-11-18"
        },
        {
            id: "3004",
            nome: "Cabo HDMI 2.1 - 2 metros",
            Categoria: "Acessórios",
            quantidade: 300,
            estoqueMin: 100,
            status: "Em Estoque",
            Fonernecedor: "Cabos & Conectores",
            atualização: "2025-11-26"
        },
        {
            id: "4005",
            nome: "Notebook Gamer i7",
            Categoria: "Computadores",
            quantidade: 10,
            estoqueMin: 5,
            status: "Em Estoque",
            Fonernecedor: "TechSupply Ltda",
            atualização: "2025-11-21"
        },
        {
            id: "1006",
            nome: "Webcam Full HD",
            Categoria: "Periféricos",
            quantidade: 5,
            estoqueMin: 15,
            status: "Sem Estoque",
            Fonernecedor: "Mundo Digital S/A",
            atualização: "2025-11-24"
        },
        {
            id: "5007",
            nome: "Cartucho de Tinta Preto",
            Categoria: "Suprimentos",
            quantidade: 90,
            estoqueMin: 50,
            status: "Em Estoque",
            Fonernecedor: "Imprime Já",
            atualização: "2025-11-19"
        },
        {
            id: "6008",
            nome: "Licença Antivírus Anual",
            Categoria: "Software",
            quantidade: 250,
            estoqueMin: 200,
            status: "Em Estoque",
            Fonernecedor: "SoftKey Parceria",
            atualização: "2025-11-01"
        },
        {
            id: "2009",
            nome: "Placa de Vídeo RTX 4080",
            Categoria: "Hardware",
            quantidade: 18,
            estoqueMin: 10,
            status: "Em Estoque",
            Fonernecedor: "HardCore Dist.",
            atualização: "2025-11-23"
        },
        {
            id: "3010",
            nome: "Pendrive 64GB USB 3.0",
            Categoria: "Acessórios",
            quantidade: 80,
            estoqueMin: 150,
            status: "Estoque Baixo",
            Fonernecedor: "Cabos & Conectores",
            atualização: "2025-11-22"
        }
    ];
    return (

        <section className="container__table">
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Categoria</th>
                        <th>Quantidade</th>
                        <th>Estoque Min</th>
                        <th>Status</th>
                        <th>Fornecedor</th>
                        <th>Ultima Atualização</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        produto.map((item) =>
                            <tr key={item.id}>
                                <td className="Title__item">{item.nome}</td>
                                <td className="texto__table__generico">{item.Categoria}</td>
                                <td className="texto__table__generico">{item.quantidade}</td>
                                <td className="texto__table__generico">{item.estoqueMin}</td>
                                <td>
                                    <span
                                        className={`status 
                        ${item.status === "Em Estoque" ? "status--alta" : ""}
                        ${item.status === "Estoque Baixo" ? "status--baixa" : ""}
                        ${item.status === "Sem Estoque" ? "status--zero" : ""}
                    `}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="texto__table__generico">{item.Fonernecedor}</td>
                                <td className="data__atualização">{item.atualização}</td>
                                <td>
                                    <div className="acoes">
                                        <button className="btn-edit"><FiEdit/></button>
                                        <button className="btn-delete"><RiDeleteBin6Line/></button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </section>
    );
}