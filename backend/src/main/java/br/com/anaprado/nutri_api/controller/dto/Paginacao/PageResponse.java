package br.com.anaprado.nutri_api.controller.dto.Paginacao;

import java.util.List;

public record PageResponse<T>(
        List<T> content,
        int currentPage,
        long totalItems,
        int totalPages,
        int pageSize
) {
}
