package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.Categoria.CadastrarCategoriaAlimentoDTO;
import br.com.anaprado.nutri_api.controller.dto.Categoria.EditarCategoriaAlimentoDTO;
import br.com.anaprado.nutri_api.controller.dto.Categoria.ObterAposEnviarCategoriaDTO;
import br.com.anaprado.nutri_api.model.Categoria;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.*;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface CategoriaMapper {

    @Mapping(target = "categoria_id", ignore = true)
    @Mapping(target = "descricao", expression = "java(HtmlSanitizer.sanitize(cadastrarCategoriaAlimentoDTO.descricao()))")
    @Mapping(target = "ativo", source = "ativo")
    Categoria cadastrarToEntity(CadastrarCategoriaAlimentoDTO cadastrarCategoriaAlimentoDTO);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "categoria_id", ignore = true)
    @Mapping(target = "descricao", expression = "java(HtmlSanitizer.sanitize(editarCategoriaAlimentoDTO.descricao()))")
    @Mapping(target = "ativo", source = "ativo")
    Categoria editarToEntity(EditarCategoriaAlimentoDTO editarCategoriaAlimentoDTO, @MappingTarget Categoria categoria);


    ObterAposEnviarCategoriaDTO obterAposEnviar(Categoria categoria);

}
