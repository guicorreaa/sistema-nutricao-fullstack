package br.com.anaprado.nutri_api.controller.dto.Subcategoria;

// Usado após cadastrar | editar informações do usaurio, onde ele retorna completo
public record ObterAposEnviarSubcategoriaDTO(
        Integer subcategoria_id, String descricao
) {
}
