package br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos;

import java.util.UUID;

public record DadosResponseTabelaInformacoesDTO(UUID dadosID, String nomeCliente, String email) {
}
