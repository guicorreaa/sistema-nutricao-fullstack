package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.Dieta.CadastrarDietaDTO;
import br.com.anaprado.nutri_api.controller.dto.Dieta.EditarDietaDTO;
import br.com.anaprado.nutri_api.model.Dieta;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.*;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface DietaMapper {

    @Mapping(target = "dieta_id", ignore = true)
    @Mapping(target = "cliente", ignore = true)
    @Mapping(target = "nome_dieta", expression = "java(HtmlSanitizer.sanitize(cadastrarDietaDTO.nome_dieta()))")
    Dieta cadastrarToEntity(CadastrarDietaDTO cadastrarDietaDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "dieta_id", ignore = true)
    @Mapping(target = "cliente", ignore = true)
    @Mapping(target = "nome_dieta", expression = "java(HtmlSanitizer.sanitize(editarDietaDTO.nome_dieta()))")
    Dieta editarToEntity(EditarDietaDTO editarDietaDTO, @MappingTarget Dieta dieta);

}
