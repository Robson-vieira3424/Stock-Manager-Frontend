import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios"
import "./FormProduct.css"


interface FormProductProps {
  onClose: () => void;
  onSuccess?: () => void;
}

interface ProdutoData {
  nome: string;
  min: number | string;
  quantidade: number | string;
}

export default function FormProduct({ onSuccess, onClose }: FormProductProps) {
 
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

  const [formData, setFormData] = useState<ProdutoData>({
    nome: "",
    min: "",       
    quantidade:""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.nome || formData.quantidade === "" || formData.min === "") {
        alert("Preencha todos os campos!");
        setIsLoading(false);
        return;
    }

    const productPayload = {
      name: formData.nome,           
      quantity: Number(formData.quantidade),
      min: Number(formData.min)      
    };

    console.log("Enviando JSON:", productPayload);

    try {

     await axios.post("http://localhost:8080/product", productPayload);

      alert("Produto cadastrado com sucesso!");


      if (onSuccess) onSuccess();


      onClose();

    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar produto. Verifique o console.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} >
        <fieldset>
          <legend>Novo Produto</legend>

          <div className="input__form__producs">
            <label htmlFor="nome">Produto</label>
            <select
              className="select__item"
              name="nome"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
            >
             <option value="">Selecione um produto</option>
                            {PRODUTOS.map((item) => (
                                <option key={item} value={item.toLocaleLowerCase().replace("", "_")}>
                                    {item}</option>
                            ))}
            </select>
          </div>

          <div className="container__inputs__menores">
            <div className="input__menor">
              <label htmlFor="">Quantidade</label>
              <input type="number"
                name="quantidade"
                id="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
                min={0} />
            </div>

            <div className="input__menor">
              <label htmlFor="">Estoque Min</label>
              <input type="number"
                name="min"
                id="min"
                value={formData.min}
                onChange={handleChange}
                min={1} />
            </div>
          </div>

          <div className="box__buttons" >
            <button type="button" className="btn__cancelar">Cancelar</button>
            <button type="submit" className="btn__adicionar">{isLoading ? "Enviando..." : "Adicionar Item"}</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
