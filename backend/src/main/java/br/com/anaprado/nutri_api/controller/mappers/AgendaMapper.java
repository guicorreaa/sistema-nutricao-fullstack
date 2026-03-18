package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.agenda.AgendaCadastroRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.agenda.AgendaEditarRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.agenda.AgendaObterListaCompletaDTO;
import br.com.anaprado.nutri_api.model.Agenda;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface AgendaMapper {

    @Mapping(target = "consulta_id", ignore = true)
    @Mapping(target = "cancelamento_cliente", ignore = true)
    @Mapping(target = "nome", expression = "java(HtmlSanitizer.sanitize(agendaCadastroRequestDTO.nome()))")
    @Mapping(target = "celular", expression = "java(HtmlSanitizer.sanitize(agendaCadastroRequestDTO.celular()))")
    @Mapping(target = "telefone", expression = "java(HtmlSanitizer.sanitize(agendaCadastroRequestDTO.telefone()))")
    @Mapping(target = "email", expression = "java(HtmlSanitizer.sanitize(agendaCadastroRequestDTO.email()))")
    @Mapping(target = "tipo_consulta", expression = "java(HtmlSanitizer.sanitize(agendaCadastroRequestDTO.tipo_consulta()))")
    @Mapping(target = "observacoes_consulta", expression = "java(HtmlSanitizer.sanitize(agendaCadastroRequestDTO.observacoes_consulta()))")
    @Mapping(target = "data_agendamento", expression = "java(java.time.LocalDateTime.now())")
    Agenda cadastroToEntity(AgendaCadastroRequestDTO agendaCadastroRequestDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "consulta_id", ignore = true)
    @Mapping(target = "cancelamento_cliente", source = "cancelamento_cliente")
    @Mapping(target = "nome", expression = "java(HtmlSanitizer.sanitize(dto.nome()))")
    @Mapping(target = "celular", expression = "java(HtmlSanitizer.sanitize(dto.celular()))")
    @Mapping(target = "telefone", expression = "java(HtmlSanitizer.sanitize(dto.telefone()))")
    @Mapping(target = "email", expression = "java(HtmlSanitizer.sanitize(dto.email()))")
    @Mapping(target = "tipo_consulta", expression = "java(HtmlSanitizer.sanitize(dto.tipo_consulta()))")
    @Mapping(target = "observacoes_consulta", expression = "java(HtmlSanitizer.sanitize(dto.observacoes_consulta()))")
    @Mapping(target = "data_agendamento", ignore = true)
    Agenda editarToEntity(AgendaEditarRequestDTO dto, @MappingTarget Agenda agenda);

    List<AgendaObterListaCompletaDTO> entityListToDTO(List<Agenda> agenda);


    AgendaObterListaCompletaDTO entityToDTO(Agenda agenda);

}
