package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosEditarVariaveisFixasDTO;
import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosResponseAntopometriaDTO;
import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosResponseTodosDadosDTO;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.model.DadosCliente;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.*;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface DadosMapper {

    @Mapping(target = "dados_id", ignore = true)
    @Mapping(target = "ultima_alteracao", ignore = true)
    @Mapping(target = "cliente", source = "cliente")
    @Mapping(target = "dieta_atual", expression = "java(HtmlSanitizer.sanitize(dto.dieta_atual()))")
    @Mapping(target = "observacoes", expression = "java(HtmlSanitizer.sanitize(dto.observacoes()))")
    @Mapping(target = "frequencia_fuma", expression = "java(HtmlSanitizer.sanitize(dto.frequencia_fuma()))")
    @Mapping(target = "antecedentes_familiar", expression = "java(HtmlSanitizer.sanitize(dto.antecedentes_familiar()))")
    DadosCliente fromCadastro(DadosRequestDTO dto, Cliente cliente);

    @Mapping(target = "dados_id", ignore = true)
    @Mapping(target = "ultima_alteracao", ignore = true)
    DadosCliente toEntity(DadosRequestDTO dto, Cliente cliente);

    // Atualiza uma instância existente de DadosCliente.
    // O uso de @MappingTarget indica ao MapStruct que a entidade já foi criada
    // e deve ser modificada, não instanciada novamente.
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "dados_id", ignore = true)
    @Mapping(target = "ultima_alteracao", ignore = true)
    @Mapping(target = "cliente", ignore = true)
    @Mapping(target = "dieta_atual", expression = "java(HtmlSanitizer.sanitize(dto.dieta_atual()))")
    @Mapping(target = "observacoes", expression = "java(HtmlSanitizer.sanitize(dto.observacoes()))")
    @Mapping(target = "frequencia_fuma", expression = "java(HtmlSanitizer.sanitize(dto.frequencia_fuma()))")
    @Mapping(target = "antecedentes_familiar", expression = "java(HtmlSanitizer.sanitize(dto.antecedentes_familiar()))")
    void updateEntityDTO(DadosEditarVariaveisFixasDTO dto, @MappingTarget DadosCliente dadosCliente);

}
