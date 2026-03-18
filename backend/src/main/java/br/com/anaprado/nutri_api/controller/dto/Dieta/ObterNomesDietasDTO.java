package br.com.anaprado.nutri_api.controller.dto.Dieta;

import java.util.UUID;

public record ObterNomesDietasDTO(

        UUID dieta_id,

        String nome_dieta

) {
}
