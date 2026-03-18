package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.Subcategoria.CadastrarSubcategoriaDTO;
import br.com.anaprado.nutri_api.controller.dto.Subcategoria.EditarSubcategoriaDTO;
import br.com.anaprado.nutri_api.controller.dto.Subcategoria.ObterAposEnviarSubcategoriaDTO;
import br.com.anaprado.nutri_api.model.Subcategoria;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.*;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface SubcategoriaMapper {

    @Mapping(target = "subcategoria_id", ignore = true)
    @Mapping(target = "descricao", expression = "java(HtmlSanitizer.sanitize(cadastrarSubcategoriaDTO.descricao()))")
    @Mapping(target = "ativo", source = "ativo")
    @Mapping(target = "categoria.categoria_id", source = "categoria_id")
    Subcategoria cadastrarToEntity(CadastrarSubcategoriaDTO cadastrarSubcategoriaDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "subcategoria_id", ignore = true)
    @Mapping(target = "descricao", expression = "java(HtmlSanitizer.sanitize(editarSubcategoriaDTO.descricao()))")
    @Mapping(target = "ativo", source = "ativo")
    Subcategoria editarToEntity(EditarSubcategoriaDTO editarSubcategoriaDTO, @MappingTarget Subcategoria subcategoria);

    ObterAposEnviarSubcategoriaDTO obterAposEnviar(Subcategoria subcategoria);

}
