package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.Alimento.CadastrarAlimentoDTO;
import br.com.anaprado.nutri_api.controller.dto.Alimento.EditarAlimentosDTO;
import br.com.anaprado.nutri_api.controller.dto.Alimento.ObterAlimentoEspecificoDTO;
import br.com.anaprado.nutri_api.model.Alimentos;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.*;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface AlimentoMapper {

    @Mapping(target = "alimento_id", ignore = true)
    @Mapping(target = "categoria", ignore = true)
    @Mapping(target = "subcategoria", ignore = true)
    @Mapping(target = "criado_por_usuario", ignore = true)
    @Mapping(target = "ativo", ignore = true)
    @Mapping(target = "nome_alimento", expression = "java(HtmlSanitizer.sanitize(cadastrarAlimentoDTO.nome_alimento()))")
    Alimentos cadastrarToEntity(CadastrarAlimentoDTO cadastrarAlimentoDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "alimento_id", ignore = true)
    @Mapping(target = "categoria", ignore = true)
    @Mapping(target = "subcategoria", ignore = true)
    @Mapping(target = "nome_alimento", expression = "java(HtmlSanitizer.sanitize(editarAlimentosDTO.nome_alimento()))")
    Alimentos editarToEntity(EditarAlimentosDTO editarAlimentosDTO, @MappingTarget Alimentos alimentos);


}
