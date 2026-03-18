import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";

// 1. Defina o tipo para o Status (evita o erro 'any')
interface StatusIMC {
    label: string;
    id: string;
}

// 2. Defina o valor padrão (resolve o erro 'statusDefault')
const statusDefault: StatusIMC = { label: "--", id: "default" };

import * as Calc from "@/service/calculosRelatorio";

interface CalculosProps {
    dados: RelatorioCompletoDTO | null;
    deficit?: number;
    superavit?: number;
}

export default function useRelatorioCalculos({ dados, deficit = 0, superavit = 0 }: CalculosProps) {

    // Se os dados forem nulos, estrutura idêntica à do retorno final
    if (!dados) {
        return {
            resultadoIMC: "--",
            pesoIdeal: "--",
            getStatusMetaPeso: statusDefault,
            composicao: {
                somaDobras: "--",
                percentualGordura: "--",
                percentualMassaMagra: "--",
                massaGorda: "--",
                massaMagra: "--"
            },
            calorias: { basal: "--", total: "--" },
            deficitCalorico: 0,
            superavitCalorico: 0,
            statusPeso: statusDefault, // Objeto em vez de string
            saudeCardiovascular: { rcq: "--", risco: "--" },
            hidratacao: { ideal: "--", falta: "--" }
        };
    }

    // 1. Cálculos de Massa e Gordura
    const somaDobras = Calc.somaDasDobras(
        dados.dobra_cutanea_triceps,
        dados.dobra_cutanea_biceps,
        dados.dobra_cutanea_escapular,
        dados.dobra_cutanea_iliaca
    );

    const densidade = Calc.densidadeCorporal(
        somaDobras,
        dados.sexo,
        dados.idade
    );

    const percentualGordura = Calc.percentualMassaGorda(
        dados.peso,
        densidade
    );

    const percentualMagra = Calc.percentualMassaMagra(
        percentualGordura,
    );

    const massaGorda = Calc.massaGordaKg(
        dados.peso,
        percentualGordura
    );

    const massaMagra = Calc.massaMagraKg(
        dados.peso,
        massaGorda
    );

    // 2. Cálculos Metabólicos e IMC
    const imc = Calc.calcularImc(
        dados.peso,
        dados.altura
    );

    const tmb = Calc.gastoEnergeticoBasal(
        dados.sexo,
        dados.peso,
        dados.altura,
        dados.idade
    );

    const get = Calc.gastoEnergeticoTotal(
        tmb,
        dados.fator_atividade_fisica?.valor
    );

    const pesoIdeal = Calc.pesoIdeal(
        dados.altura,
        dados.idade
    );

    // 1. Cálculo de Hidratação (Padrão: 35ml por kg)
    const aguaIdeal = dados?.peso ? (dados.peso * 35) / 1000 : 0;

    // 2. Relação Cintura-Quadril (RCQ)
    const rcq = dados?.circ_cintura && dados?.circ_quadril
        ? (dados.circ_cintura / dados.circ_quadril).toFixed(2)
        : "--";

    // 3. Classificação do risco RCQ (simplificado)
    const getRiscoRCQ = () => {
        if (rcq === "--") return "Não calculado";
        const v = parseFloat(rcq);

        // Agora aceitando exatamente o que vem do seu JSON ("M" ou "F")
        if (dados.sexo === "M") {
            return v > 0.95 ? "Risco Alto" : "Risco Baixo";
        } else {
            return v > 0.85 ? "Risco Alto" : "Risco Baixo";
        }
    };

    // DÉFICIT CALÓRICO
    const defCalorico = Calc.calcularMetaDeficit(get ?? 0, deficit);
    const superCalorico = Calc.calcularMetaSuperavit(get ?? 0, superavit);

    return {
        // Básicos
        resultadoIMC: imc ? imc.toFixed(2) : "--",
        pesoIdeal: pesoIdeal ? pesoIdeal.toFixed(2) : "--",
        getStatusMetaPeso: pesoIdeal ? Calc.getStatusMetaPeso(dados.peso, pesoIdeal) : statusDefault,
        densidadeCorporal: somaDobras ? `${densidade?.toFixed(2)} g/mL` : "--",

        // Composição Corporal
        composicao: {
            somaDobras: somaDobras ? `${somaDobras} mm` : "--",
            percentualGordura: percentualGordura ? `${percentualGordura.toFixed(2)} %` : "--",
            percentualMassaMagra: percentualMagra ? `${percentualMagra.toFixed(2)} %` : "--",
            massaGorda: massaGorda ? `${massaGorda.toFixed(2)} Kg` : "--",
            massaMagra: massaMagra ? `${massaMagra.toFixed(2)} Kg` : "--"
        },

        calorias: {
            basal: tmb ? `${Math.round(tmb)} Kcal` : "--",
            total: get ? `${Math.round(get)} Kcal` : "--"
        },

        deficitCalorico: defCalorico,
        superavitCalorico: superCalorico,
        statusPeso: imc ? Calc.getDescricaoIMC(imc) : statusDefault,

        saudeCardiovascular: {
            rcq,
            risco: getRiscoRCQ()
        },

        hidratacao: {
            ideal: `${aguaIdeal.toFixed(1)}L`,
            falta: dados?.consumo_agua_dia ? (aguaIdeal - dados.consumo_agua_dia).toFixed(1) : "0"
        }

    }
}



