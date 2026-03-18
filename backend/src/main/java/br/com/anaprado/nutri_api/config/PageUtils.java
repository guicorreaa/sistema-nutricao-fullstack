package br.com.anaprado.nutri_api.config;
import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import org.springframework.data.domain.Page;

public class PageUtils {

    public static <T> PageResponse<T> from(Page<T> page) {
        return new PageResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.getSize()
        );
    }

}
