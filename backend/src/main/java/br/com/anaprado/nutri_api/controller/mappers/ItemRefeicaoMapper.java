package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.ItemRefeicao.CadastrarNovoItemRefeicaoDTO;
import br.com.anaprado.nutri_api.controller.dto.ItemRefeicao.EditarItemRefeicaoDTO;
import br.com.anaprado.nutri_api.model.ItemRefeicao;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface ItemRefeicaoMapper {

    @Mapping(target = "id_item_refeicao", ignore = true)
    @Mapping(target = "refeicao", ignore = true)
    @Mapping(target = "alimentos", ignore = true)
    @Mapping(target = "observacao", expression = "java(HtmlSanitizer.sanitize(cadastrarNovoItemRefeicaoDTO.observacao()))")
    @Mapping(target = "quantidadeGramas", source = "quantidadeGramas")
    ItemRefeicao cadastrarToEntity(CadastrarNovoItemRefeicaoDTO cadastrarNovoItemRefeicaoDTO);

    @Mapping(target = "id_item_refeicao", ignore = true)
    @Mapping(target = "refeicao", ignore = true)
    @Mapping(target = "alimentos", ignore = true)
    @Mapping(target = "observacao", expression = "java(HtmlSanitizer.sanitize(editarItemRefeicaoDTO.observacao()))")
    @Mapping(target = "quantidadeGramas", source = "quantidadeGramas")
    ItemRefeicao editarToEntity(EditarItemRefeicaoDTO editarItemRefeicaoDTO, @MappingTarget ItemRefeicao itemRefeicao);

}
