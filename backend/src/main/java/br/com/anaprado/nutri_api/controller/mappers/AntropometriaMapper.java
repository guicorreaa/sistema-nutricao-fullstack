package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.Antropometria.AntropometriaCadastrarDTO;
import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosRequestDTO;
import br.com.anaprado.nutri_api.model.Antropometria;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface AntropometriaMapper {

    @Mapping(target = "antropometriaId", ignore = true)
    @Mapping(target = "dataAvaliacao", ignore = true)
    @Mapping(target = "cliente", source = "cliente")
    @Mapping(target = "circBraco", source = "dto.circ_braco")
    @Mapping(target = "circPanturrilha", source = "dto.circ_panturrilha")
    @Mapping(target = "circCintura", source = "dto.circ_cintura")
    @Mapping(target = "circQuadril", source = "dto.circ_quadril")
    @Mapping(target = "dobraCutaneaTriceps", source = "dto.dobra_cutanea_triceps")
    @Mapping(target = "dobraCutaneaBiceps", source = "dto.dobra_cutanea_biceps")
    @Mapping(target = "dobraCutaneaEscapular", source = "dto.dobra_cutanea_escapular")
    @Mapping(target = "dobraCutaneaIliaca", source = "dto.dobra_cutanea_iliaca")
    @Mapping(target = "observacoes", expression = "java(HtmlSanitizer.sanitize(dto.observacoes()))")
    Antropometria toEntity(DadosRequestDTO dto, Cliente cliente);

    @Mapping(target = "antropometriaId", ignore = true)
    @Mapping(target = "dataAvaliacao", ignore = true)
    @Mapping(target = "cliente", source = "cliente")
    @Mapping(target = "observacoes", expression = "java(HtmlSanitizer.sanitize(dto.observacoes()))")
    Antropometria toEntityNovoHistorico(AntropometriaCadastrarDTO dto, Cliente cliente);


}
