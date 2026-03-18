package br.com.anaprado.nutri_api.service;

import org.springframework.stereotype.Service;

@Service
public class SanatizerService {

    // utlizado para evitar ataques XSS no código
//    public UsuarioRequestUpdateDTO sanatizarUpdateDTO(UsuarioRequestUpdateDTO dto) {
//        return new UsuarioRequestUpdateDTO(
//                HtmlSanitizer.sanitize(dto.email()),
//                dto.role(),
//                dto.ativo()
//        );
//    }

//    public DadosRequestDTO sanitizeDadosDTO(DadosRequestDTO dto) {
//        return new DadosRequestDTO(
//                HtmlSanitizer.sanitize(dto.dieta_atual()),
//                HtmlSanitizer.sanitize(dto.observacoes()),
//                dto.altura(),
//                dto.peso(),
//                dto.fuma(),
//                HtmlSanitizer.sanitize(dto.frequencia_fuma()),
//                dto.consumo_agua_dia(),
//                HtmlSanitizer.sanitize(dto.antecedentes_familiar()),
//                dto.precisa_acompanhamento_especial(),
//                dto.tem_restricoes_alimentares(),
//                dto.toma_medicamentos(),
//                dto.circ_braco(),
//                dto.circ_panturrilha(),
//                dto.circ_cintura(),
//                dto.circ_quadril(),
//                dto.dobra_cutanea_triceps(),
//                dto.dobra_cutanea_biceps(),
//                dto.dobra_cutanea_escapular(),
//                dto.dobra_cutanea_iliaca()
//        );
//    }


}
