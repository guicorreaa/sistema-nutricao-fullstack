package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.model.TipoRefeicao;
import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.CadastrarTipoRefeicaoDTO;
import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.EditarTipoRefeicaoDTO;
import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.TodosTiposRefeicaoDTO;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface TipoRefeicaoMapper {

    List<TodosTiposRefeicaoDTO> EntityToDTO (List<TipoRefeicao> tipoRefeicao);

    @Mapping(target = "tipo_id", ignore = true)
    @Mapping(target = "descricao", expression = "java(HtmlSanitizer.sanitize(cadastrarTipoRefeicaoDTO.descricao()))")
    @Mapping(target = "ativo", source = "ativo")
    TipoRefeicao cadastrarToEntity (CadastrarTipoRefeicaoDTO cadastrarTipoRefeicaoDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "tipo_id", ignore = true)
    @Mapping(target = "descricao", expression = "java(HtmlSanitizer.sanitize(editarTipoRefeicaoDTO.descricao()))")
    @Mapping(target = "ativo", source = "ativo")
    TipoRefeicao editarToEntity (EditarTipoRefeicaoDTO editarTipoRefeicaoDTO, @MappingTarget TipoRefeicao tipoRefeicao);

}
