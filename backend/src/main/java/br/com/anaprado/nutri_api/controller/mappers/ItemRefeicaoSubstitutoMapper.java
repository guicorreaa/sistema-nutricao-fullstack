package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.ItemRefeicaoSubstituto.CadastrarItemRefeicaoDoSubstitutoDTO;
import br.com.anaprado.nutri_api.model.Alimentos;
import br.com.anaprado.nutri_api.model.ItemRefeicao;
import br.com.anaprado.nutri_api.model.ItemRefeicaoSubstituto;
import br.com.anaprado.nutri_api.model.Refeicao;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface ItemRefeicaoSubstitutoMapper {

    @Mapping(target = "id_item_refeicao", ignore = true)
    @Mapping(target = "refeicao", source = "refeicao")
    @Mapping(target = "alimentos", source = "alimento")
    @Mapping(target = "observacao", expression = "java(HtmlSanitizer.sanitize(dto.observacao()))")
    @Mapping(target = "quantidadeGramas", source = "dto.quantidadeGramas")
    ItemRefeicao cadastrarItemRefeicaoToEntity(
            CadastrarItemRefeicaoDoSubstitutoDTO dto,
            Alimentos alimento,
            Refeicao refeicao
    );

    // Liga o ItemRefeicao a tabela Substitutos
    @Mapping(target = "id_substituicao", ignore = true)
    @Mapping(target = "itemPrincipal", source = "itemPrincipal")
    @Mapping(target = "itemSubstituto", source = "novoItem")
    ItemRefeicaoSubstituto cadastrarSubstituto(ItemRefeicao itemPrincipal, ItemRefeicao novoItem);


}
