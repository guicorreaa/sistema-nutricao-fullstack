package br.com.anaprado.nutri_api.controller.dto.erro;


public record ErroResponse(
        String erro,
        String mensagem
) {}