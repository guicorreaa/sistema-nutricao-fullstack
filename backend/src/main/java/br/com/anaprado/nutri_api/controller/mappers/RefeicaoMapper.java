package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.Refeicao.*;
import br.com.anaprado.nutri_api.model.Refeicao;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface RefeicaoMapper {

    @Mapping(target = "refeicao_id", ignore = true)
    @Mapping(target = "horario", source = "horario")
    @Mapping(target = "dieta", ignore = true)
    @Mapping(target = "tipoRefeicao", ignore = true)
    @Mapping(target = "observacao", expression = "java(HtmlSanitizer.sanitize(cadastrarRefeicaoDTO.observacao()))")
    Refeicao cadastrarToEntity(CadastrarRefeicaoDTO cadastrarRefeicaoDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "horario", source = "horario")
    @Mapping(target = "refeicao_id", ignore = true)
    @Mapping(target = "dieta", ignore = true)
    @Mapping(target = "tipoRefeicao", ignore = true)
    @Mapping(target = "observacao", expression = "java(HtmlSanitizer.sanitize(editarRefeicaoDTO.observacao()))")
    Refeicao editarToEntity(EditarRefeicaoDTO editarRefeicaoDTO, @MappingTarget Refeicao refeicao);

    @Mapping(target = "refeicao_id", source = "refeicao_id")
    @Mapping(target = "horario", source = "horario")
    @Mapping(target = "nome_dieta", source = "dieta.nome_dieta")
    @Mapping(target = "descricao", source = "tipoRefeicao.descricao")
    @Mapping(target = "observacao", source = "observacao")
    ExibirRefeicaoAposCadastrarDTO exibirAposCadastrarToDTO(Refeicao refeicao);

    List<ExibirRefeicoesEspecificoSimplesDTO> RefeicaoSumarizadaToDTO(List<RefeicaoSumarizada> refeicaoSumarizada);
}
