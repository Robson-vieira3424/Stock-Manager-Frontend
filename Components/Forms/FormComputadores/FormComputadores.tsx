// src/components/forms/formulario-equipamento.tsx

"use client";
import "./FormComputer.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FiCpu } from "react-icons/fi";
import { LuBox } from "react-icons/lu";
import { LuMonitor } from "react-icons/lu";
import { FaRegHdd } from "react-icons/fa";
import "../../../src/app/global.css";
import { Button } from "@/components/ui/button";
import { IoFlashOutline } from "react-icons/io5";
import { BiMap } from "react-icons/bi";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { use, useEffect, useState } from "react";
import { CpuIcon, Flashlight } from "lucide-react";
import { closeSync } from "fs";


const PRESETS = {
  allinone: {
    Marca: "Dell",
    Modelo: "All-in-One", // Exemplo
    MarcaMonitor: "Dell", // Mesmo que não apareça no form, deixamos salvo
    Processador: "Intel Core I5-10400",
    Tamanho: "Integrado",
    Memoria: "8Gb DDR4",
    ModeloMonitor: "Integrado",
  },
  lenovo: {
    Marca: "Lenovo",
    Modelo: "ThinkCenter",
    MarcaMonitor: "Lenovo",
    ModeloMonitor: "ThinkVision",
    Tamanho: "24´",
    Processador: "Ryzen 5 5650G",
  },
  dell: {
    Marca: "Dell",
    Modelo: "XPS",
    MarcaMonitor: "Dell",
    ModeloMonitor: "XPS",
    Processador: "NAO SEI",
    Tamanho: "24´",
  },
  generico: {
    Marca: "",
    Modelo: "",
    MarcaMonitor: "",
    Tamanho: "",
    MarcaEsatbilizador: "",
    Processador: "",
    ModeloMonitor: "",
  },
};

// 1. Definição do Schema (Regras de validação)
const formSchema = z.object({
  Patrimonio: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  Nome: z.string().min(1, "Nome/Identificação é obrigatório"),
  Marca: z.string().min(3, "A mArca do gabinete é obrigatória"),
  Modelo: z.string().min(3, "Insira o modelo do gabinete"),
  Processador: z.string().min(4, "Insira o modelo do processador"),
  Memoria: z.string().min(6, "Digite as informações da memoria"),
  Armazenamento: z.string().min(4, "Insira a quantidade do Armazenamento"),
  tipoArmazenamento: z.enum(["HD", "SSD", "Nvme"]),
  sistemaOperacional: z.string().optional(),

  PatrimonioMonitor: z.string().optional(),
  MarcaMonitor: z.string().optional(),
  ModeloMonitor: z.string().optional(),
  TamanhoMonitor: z.string().optional(),

  // --- Dados do Estabilizador (Opcionais) ---
  PatrimonioEstabilizador: z.string().optional(),
  MarcaEsatbilizador: z.string().optional(), // Mantive o typo do seu JSX
  ModeloEstabilizador: z.string().optional(),
  Potencia: z.string().optional(),

  // --- Localização ---
  secretaria: z.string({ required_error: "Selecione uma secretaria" }),
  Setor: z.string({ required_error: "Selecione um setor" }),

  // O tipo vem do cardSelecionado, mas podemos validar se quiser
  tipo: z.string().optional(),
});

// Tipo inferido a partir do schema (para TypeScript)
type FormValues = z.infer<typeof formSchema>;

export default function FormComputadores({ onClose }: { onClose: () => void }) {
  const [cardSelecionado, setCardSelecionado] = useState<string | null>(null);
  const [secretarias, setSecretarias] = useState<any[]>([]);
  const [setores, setSetores] = useState<any[]>([]);

  const mostrarPerifiericos =
    cardSelecionado !== null && cardSelecionado !== "allinone";

  // 2. Inicialização do Hook
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Patrimonio: "",
      Nome: "",
      Marca: "",
      Modelo: "",
      Processador: "",
      Memoria: "",
      Armazenamento: "",
      tipoArmazenamento: undefined,
      sistemaOperacional: undefined,
      secretaria: "",
      Setor: "",
      PatrimonioMonitor: "",
      MarcaMonitor: "",
      ModeloMonitor: "",
      TamanhoMonitor: "",
      PatrimonioEstabilizador: "",
      MarcaEsatbilizador: "",
      ModeloEstabilizador: "",
      Potencia: "",
      tipo: "",
    },
  });

  useEffect(() => {
    async function carregarSecretarias() {
      try {
        const response = await axios.get("http://localhost:8080/secretaria");
        setSecretarias(response.data);
      } catch (error) {
        console.error("Erro ao carregar secretarias", error);
      }
    }

    carregarSecretarias();
  }, []);

  function handleSecretariaChange(secretariaNome: string) {
    form.setValue("secretaria", secretariaNome);

    const secretariaSelecionada = secretarias.find(
      (s) => s.nome === secretariaNome
    );

    setSetores(secretariaSelecionada?.departamentos || []);

    // limpa setor anterior
    form.setValue("Setor", "");
  }

  useEffect(() => {
    if (cardSelecionado && PRESETS[cardSelecionado as keyof typeof PRESETS]) {
      const preset = PRESETS[cardSelecionado as keyof typeof PRESETS];

      // Atualiza os campos do Gabinete
      form.setValue("Marca", preset.Marca);
      form.setValue("Modelo", preset.Modelo);
      form.setValue("Processador", preset.Processador);
      form.setValue("Modelo", preset.Modelo);

      // Se não for All-in-one, preenche monitor e estabilizador também
      if (cardSelecionado !== "allinone") {
        form.setValue("MarcaMonitor", preset.MarcaMonitor);
        form.setValue("TamanhoMonitor", preset.Tamanho);
        form.setValue("ModeloMonitor", preset.ModeloMonitor);
      }

      // (Opcional) Sincroniza o campo 'tipo' do form com o estado visual
      form.setValue("tipo", cardSelecionado);
    }
  }, [cardSelecionado, form.setValue]);
  // Monitora o valor do campo 'tipo' em tempo real para renderização condicional
  const tipoSelecionado = form.watch("tipo");

  async function onSubmit(values: FormValues) {
    // Verifica se o usuário selecionou um card (tipo de máquina)
    if (!cardSelecionado) {
      alert("Por favor, selecione o tipo de equipamento (Card) no topo.");
      return;
    }

    // Se for All-in-One ou Genérico (que talvez não tenha), manda vazio/N/A para não ir null.
    const usarEstabilizador = cardSelecionado !== "allinone";

    const estabilizadorPayload = usarEstabilizador
      ? {
        patrimonio: values.PatrimonioEstabilizador || "",
        marca: values.MarcaEsatbilizador || "",
        modelo: values.ModeloEstabilizador || "",
        potencia: values.Potencia || "",
      }
      : {
        // Objeto "vazio" para satisfazer o Backend
        patrimonio: "N/A",
        marca: "N/A",
        modelo: "N/A",
        potencia: "",
      };

    const monitorPayload =
      cardSelecionado === "allinone"
        ? {
          patrimonio: "Integrado", // Ou deixe string vazia "" se preferir
          marca: "Dell", // Reaproveita a marca do PC
          modelo: "Monitor Integrado",
          tamanho: "24'", // Caso tenha capturado ou string vazia
        }
        : {
          patrimonio: values.PatrimonioMonitor || "",
          marca: values.MarcaMonitor || "",
          modelo: values.ModeloMonitor || "",
          tamanho: values.TamanhoMonitor || "",
        };

    // Montagem do Payload para a API
    // Dica: Estou padronizando para camelCase para o Java
    const payload = {
      computador: {
        tipoEquipamento: cardSelecionado, // 'lenovo', 'dell', 'allinone', etc.
        patrimonio: values.Patrimonio,
        nome: values.Nome,
        marca: values.Marca,
        modelo: values.Modelo,
        processador: values.Processador,
        memoria: values.Memoria,
        armazenamento: values.Armazenamento,
        tipoArmazenamento: values.tipoArmazenamento, // HD, SSD, NVMe
        sistemaOperacional: values.sistemaOperacional,
      },

      secretaria: values.secretaria,
      setor: values.Setor,

      // Lógica Condicional: Só envia monitor se NÃO for All-in-One
      monitor: monitorPayload,
      // Lógica Condicional: Só envia estabilizador se for os combos
      estabilizador: estabilizadorPayload,
    };

    console.log("Payload pronto para envio:", payload);

    try {
      const response = await axios.post(
        "http://localhost:8080/estacao",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        alert("Eqipamento cadastrado com sucesso!");
        form.reset();
        onClose();
      }
    } catch (error) {
      console.error("Erro ao cadastrar", error);
      alert("Erro ao conectar com o servidor. Verifique o console.");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form__computer">
        <header className="header__form__computer">
          <h2 className="title__form__computer">Cadastrar Novo Computador</h2>
        </header>

        <section className="container__button__type__computer">
          <section className="title__container__cards">
            Tipo de equipamento *
          </section>
          <section
            className={`card__form__computer ${cardSelecionado === "allinone" ? "card-selecionado" : ""
              }`}
            onClick={() => setCardSelecionado("allinone")}
          >
            <section className="icon__card__form__computer">
              <LuMonitor fontSize={25} />
            </section>
            <section className="infos__card__form__computer">
              <h3 className="title__card__form__computer">Dell All-in-one</h3>
              <p className="description__card__form__computer">
                Computador com monitor embutido
              </p>
            </section>
          </section>

          <section
            className={`card__form__computer ${cardSelecionado === "lenovo" ? "card-selecionado" : ""
              }`}
            onClick={() => setCardSelecionado("lenovo")}
          >
            <section className="icon__card__form__computer">
              <LuBox fontSize={27} />
            </section>
            <section className="infos__card__form__computer">
              <h3 className="title__card__form__computer">
                Lenovo (Combo Padronizado)
              </h3>
              <p className="description__card__form__computer">
                Computador + Monitor + Estabilizador
              </p>
            </section>
          </section>

          <section
            className={`card__form__computer ${cardSelecionado === "dell" ? "card-selecionado" : ""
              }`}
            onClick={() => setCardSelecionado("dell")}
          >
            <section className="icon__card__form__computer">
              <FiCpu fontSize={25} />
            </section>
            <section className="infos__card__form__computer">
              <h3 className="title__card__form__computer">
                Dell (Combo Padronizado)
              </h3>
              <p className="description__card__form__computer">
                Computador + Monitor + Estabilizador
              </p>
            </section>
          </section>

          <section
            className={`card__form__computer ${cardSelecionado === "generico" ? "card-selecionado" : ""
              }`}
            onClick={() => setCardSelecionado("generico")}
          >
            <section className="icon__card__form__computer">
              <FaRegHdd fontSize={25} />
            </section>
            <section className="infos__card__form__computer">
              <h3 className="title__card__form__computer">
                Genérico (Marcas Diversas)
              </h3>
              <p className="description__card__form__computer">
                Computador + Monitor + Estabilizador
              </p>
            </section>
          </section>
        </section>

        {/* Acima disso é card !!! */}

        {/* Só mostra os formulários se algum card for selecionado */}
        {cardSelecionado && (
          <>
            <section className="body__info__gabinete">
              <section className="header__body__info__gabinete">
                <CpuIcon fontSize={20} />
                <h2 className="title__container__cards">
                  {cardSelecionado === "allinone"
                    ? "Dados do All-in-One"
                    : "Dados do Gabinete"}
                </h2>
              </section>
              <section className="container__inputs__align__row">
                {/* Form Field de patrimonio !!! */}
                <FormField
                  control={form.control}
                  name="Patrimonio"
                  render={({ field }) => (
                    <FormItem className="container__item__form__computer">
                      <FormLabel>Patrimônio *</FormLabel>
                      <FormControl>
                        <Input
                          className="input__computer"
                          placeholder="Ex: 093744"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form Field de nome da maquina !!! */}
                <FormField
                  control={form.control}
                  name="Nome"
                  render={({ field }) => (
                    <FormItem className="container__item__form__computer">
                      <FormLabel>Nome/Identificação *</FormLabel>
                      <FormControl>
                        <Input
                          className="input__computer"
                          placeholder="Ex: PC-SETOR-01"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form Field de nome MARCA!!! */}
                <FormField
                  control={form.control}
                  name="Marca"
                  render={({ field }) => (
                    <FormItem className="container__item__form__computer">
                      <FormLabel>Marca</FormLabel>
                      <FormControl>
                        <Input
                          className="input__computer"
                          placeholder="Ex: Dell"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form Field de nome da MODELO !!! */}
                <FormField
                  control={form.control}
                  name="Modelo"
                  render={({ field }) => (
                    <FormItem className="container__item__form__computer">
                      <FormLabel>Modelo</FormLabel>
                      <FormControl>
                        <Input
                          className="input__computer"
                          placeholder="Ex: Desktop Normal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form Field de nome da PROCESSADOR !!! */}

                <FormField
                  control={form.control}
                  name="Processador"
                  render={({ field }) => (
                    <FormItem className="container__item__form__computer">
                      <FormLabel>Processador</FormLabel>
                      <FormControl>
                        <Input
                          className="input__computer"
                          placeholder="Ex: Intel Core I5-10400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form Field de nome da memoria ram !!! */}
                <FormField
                  control={form.control}
                  name="Memoria"
                  render={({ field }) => (
                    <FormItem className="container__item__form__computer">
                      <FormLabel>Memoria Ram</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="select-trigger-computer">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          className="z-[9999] bg-white max-h-60"
                          position="popper"
                          sideOffset={5}
                        >
                          <SelectItem value="2GB DDR4">2GB DDR4</SelectItem>
                          <SelectItem value="2GB DDR3">2GB DDR3</SelectItem>
                          <SelectItem value="4GB DDR4">4GB DDR4</SelectItem>
                          <SelectItem value="4GB DDR3">4GB DDR3</SelectItem>
                          <SelectItem value="8GB DDR4">8GB DDR4</SelectItem>
                          <SelectItem value="8GB DDR3">8GB DDR3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <section className="container__interno__form__computadores">
                  {/* Form Field de nome da Armazenamento !!! */}

                  <FormField
                    control={form.control}
                    name="Armazenamento"
                    render={({ field }) => (
                      <FormItem className="container__item__form__computer__small">
                        <FormLabel>Armazenamento</FormLabel>
                        <FormControl>
                          <Input
                            className="input__computer"
                            placeholder="Ex: 256 GB"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Form Field de nome da TIPO !!! */}

                  <FormField
                    control={form.control}
                    name="tipoArmazenamento"
                    render={({ field }) => (
                      <FormItem className="container__item__form__computer__small">
                        <FormLabel>Tipo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="select-trigger-computer">
                              <SelectValue placeholder="Selecione um tipo " />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className="z-[9999] bg-white max-h-60"
                            position="popper"
                            sideOffset={5}
                          >
                            <SelectItem value="HD">HD</SelectItem>
                            <SelectItem value="SSD">SSD</SelectItem>
                            <SelectItem value="Nvme">Nvme</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Form Field de nome da Sistema !!! */}

                  <FormField
                    control={form.control}
                    name="sistemaOperacional"
                    render={({ field }) => (
                      <FormItem className="container__item__form__computer__small">
                        <FormLabel>Sistema</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="select-trigger-computer">
                              <SelectValue placeholder="Selecione um Sistema" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className="z-[9999] bg-white max-h-60"
                            position="popper"
                            sideOffset={5}
                          >
                            <SelectItem value="Windows 11 Home">
                              Windows 11 Home
                            </SelectItem>
                            <SelectItem value="Windows 11 Pro">
                              Windows 11 Pro
                            </SelectItem>
                            <SelectItem value="Windows 10 Home">
                              Windows 10 Home
                            </SelectItem>
                            <SelectItem value="Windows 10 Pro">
                              Windows 10 Pro
                            </SelectItem>
                            <SelectItem value="Windows 7">Windows 7</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
              </section>
            </section>
          </>
        )}

        {mostrarPerifiericos && (
          <>
            {/*Seção do Monitor*/}
            <section className="body__info__monitor">
              <section className="header__body__info__monitor">
                <LuMonitor fontSize={20} />
                <h2 className="title__container__cards">Dados do Monitor</h2>
              </section>
            </section>
            <section className="container__inputs__align__row">
              {/* Form Field de nome do Patrimonio do Monitor !!! */}

              <FormField
                control={form.control}
                name="PatrimonioMonitor"
                render={({ field }) => (
                  <FormItem className="container__item__form__computer">
                    <FormLabel>Patrimonio do Monitor</FormLabel>
                    <FormControl>
                      <Input
                        className="input__computer"
                        placeholder="Ex: 363828"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Field da Marca do Monitor !!! */}

              <FormField
                control={form.control}
                name="MarcaMonitor"
                render={({ field }) => (
                  <FormItem className="container__item__form__computer">
                    <FormLabel>Marca do Monitor</FormLabel>
                    <FormControl>
                      <Input
                        className="input__computer"
                        placeholder="Ex: Dell, Samsung, Lenovo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Field de nome da Modelo do Monitor !!! */}

              <FormField
                control={form.control}
                name="ModeloMonitor"
                render={({ field }) => (
                  <FormItem className="container__item__form__computer">
                    <FormLabel>Modelo do Monitor</FormLabel>
                    <FormControl>
                      <Input
                        className="input__computer"
                        placeholder="Ex: 256 GB"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Field de Tamanho !!! */}

              <FormField
                control={form.control}
                name="TamanhoMonitor"
                render={({ field }) => (
                  <FormItem className="container__item__form__computer">
                    <FormLabel>Tamanho</FormLabel>
                    <FormControl>
                      <Input
                        className="input__computer"
                        placeholder="Ex: 256 GB"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="body__info__estabilizador">
              <section className="header__body__info__estabilizador">
                <IoFlashOutline fontSize={20} />
                <h2 className="title__container__cards">
                  Dados do Estabilizador
                </h2>
              </section>
            </section>
            <section className="container__inputs__align__row">
              {/* Form Field de nome do Patrimonio do Estabilizador !!! */}

              <FormField
                control={form.control}
                name="PatrimonioEstabilizador"
                render={({ field }) => (
                  <FormItem className="container__item__form__computer">
                    <FormLabel>Patrimonio do Estabilizador</FormLabel>
                    <FormControl>
                      <Input
                        className="input__computer"
                        placeholder="Ex: 363828"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Field da Marca do Estabilizador !!! */}

              <FormField
                control={form.control}
                name="MarcaEsatbilizador"
                render={({ field }) => (
                  <FormItem className="container__item__form__computer">
                    <FormLabel>Marca do Estabilizador</FormLabel>
                    <FormControl>
                      <Input
                        className="input__computer"
                        placeholder="Ex: MSI, TSSHARA, SMS"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Field de nome da Modelo do Estabilizador !!! */}

              <FormField
                control={form.control}
                name="ModeloEstabilizador"
                render={({ field }) => (
                  <FormItem className="container__item__form__computer">
                    <FormLabel>Modelo do Estabilizador</FormLabel>
                    <FormControl>
                      <Input
                        className="input__computer"
                        placeholder="Ex: TSHARA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Field de Tamanho !!! */}

              <FormField
                control={form.control}
                name="Potencia"
                render={({ field }) => (
                  <FormItem className="container__item__form__computer">
                    <FormLabel>Potência</FormLabel>
                    <FormControl>
                      <Input
                        className="input__computer"
                        placeholder="600VA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          </>
        )}

        <section className="body__info__localizacao">
          <section className="header__body__info__localizacao">
            <BiMap fontSize={20} />
            <h2 className="title__container__cards">Localização</h2>
          </section>
        </section>
        <section className="container__inputs__align__row__licalização">
          {/* Form Field de Local */}

          <FormField
            control={form.control}
            name="secretaria"
            render={({ field }) => (
              <FormItem className="container__item__form__computer">
                <FormLabel>Secretaria*</FormLabel>
                <Select onValueChange={handleSecretariaChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="select-trigger-computer">
                      <SelectValue placeholder="Selecione uma Secretaria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className="z-[9999] bg-white max-h-60"
                    position="popper"
                    sideOffset={5}
                  > {secretarias.map((secretaria) => (
                    <SelectItem key={secretaria.id} value={secretaria.nome}>
                      {secretaria.nome}
                    </SelectItem>
                  ))}

                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Field do setor!!! */}

          <FormField
            control={form.control}
            name="Setor"
            render={({ field }) => (
              <FormItem className="container__item__form__computer">
                <FormLabel>Setor*</FormLabel>
                <Select
                  disabled={!setores.length}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="select-trigger-computer">
                      <SelectValue placeholder="Selecione um setor" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="z-[9999] bg-white max-h-60">
                    {setores.map((setor) => (
                      <SelectItem key={setor.id} value={setor.nome}>
                        {setor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="container__align__buttons">
          <button
            type="button"
            onClick={onClose}
            className="btn__cancelar__computer"
          >
            cancelar
          </button>
          <button type="submit" className="btn__cadastrar__computer">
            cadastrar
          </button>
        </section>
      </form>
    </Form>
  );
}
