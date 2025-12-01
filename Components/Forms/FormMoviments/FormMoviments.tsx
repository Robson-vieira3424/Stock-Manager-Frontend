import "./FormMoviments.css"

    interface FormMovimentsProps {
        onClose: () => void;
    }
export default function FormMoviments({ onClose }: FormMovimentsProps) {
    const PRODUTOS = [
        "Eletrônicos",
        "Alimentos",
        "Bebidas",
        "Produtos de Limpeza",
        "Higiene Pessoal",
        "Roupas",
        "Calçados",
        "Papelaria",
        "Ferramentas",
        "Móveis",
    ];

    const SECRETARIAS = [
        "Saúde",
        "Educação",
        "Assistência Social",
        "Administração",
        "Finanças",
        "Infraestrutura",
        "Urbanismo",
        "Meio Ambiente",
        "Transporte",
        "Segurança Pública",
        "Cultura",
        "Esportes",
        "Turismo",
        "Agricultura",
        "Tecnologia e Inovação",
    ];


    return (
        <>
            <form action="">
                <fieldset>
                    <legend>Nova Movimentação</legend>

                    <div className="container__label__input__form">

                        <label>Tipo de Produto</label>
                        <select className="select__item">
                            <option value="">Selecione um produto</option>
                            {PRODUTOS.map((item) => (
                                <option key={item} value={item.toLocaleLowerCase().replace("", "_")}>
                                    {item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="container__label__input__form">
                        <label htmlFor="">Categoria</label>
                        <input type="text" name="" id="" />
                    </div>

                    <div className="container__label__input__form">
                        <label htmlFor="">Tipo de Movimentação</label>
                        <select className="select__item">
                            <option value="Entrada">Entrada</option>
                            <option value="Saida">Saida</option>
                        </select>
                    </div>

                    <div className="container__label__input__form">
                        <label htmlFor="">Quantidade</label>
                        <input type="number" name="Quantidade" id="Quantidade" defaultValue={0} />
                    </div >

                    <div className="container__label__input__form">
                        <label htmlFor="">Destino/Origem</label>
                        <select className="select__item">
                            <option value="">Selecione uma Secretaria</option>
                            {SECRETARIAS.map((sec) => (
                                <option key={sec} value={sec.toLowerCase().replace(" ", "_")}>
                                    {sec}
                                </option>
                            ))}
                        </select>
                    </div >

                    <div className="container__label__input__form">
                        <label htmlFor="">Data</label>
                        <input type="date" name="Date" id="Data" />
                    </div>

                    <div className="container__label__input__form100">
                        <label htmlFor="">Observações (opcional)</label>
                        <input className="input__observação" type="text" name="" id="" placeholder="Digite algo" />
                    </div>

                    <div className="container__buttons">
                        <button className="cancelar__btn" onClick={onClose}>Cancelar</button>
                        <button className="registrar__btn">Registrar Movimentação</button>
                    </div>
                </fieldset >
            </form>
        </>
    );
}