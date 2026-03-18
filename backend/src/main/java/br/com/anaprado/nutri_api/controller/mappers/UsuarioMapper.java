package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.usuario.UsuarioEditarResponseDTO;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuarioLoginResponseDTO;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuarioRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuarioResponseDTO;
import br.com.anaprado.nutri_api.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import br.com.anaprado.nutri_api.security.HtmlSanitizer;

import java.util.List;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface UsuarioMapper {

    @Mapping(target = "usuario_id", ignore = true)
    @Mapping(target = "data_criacao", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "email", expression = "java(HtmlSanitizer.sanitize(dto.email()))")
    @Mapping(target = "telefone", expression = "java(HtmlSanitizer.sanitize(dto.telefone()))")
    Usuario toEntity(UsuarioRequestDTO dto);

    List<UsuarioResponseDTO> toDTOLista(List<Usuario> usuarios);

    @Mapping(target = "email", expression = "java(HtmlSanitizer.sanitize(dto.email()))")
    @Mapping(target = "telefone", expression = "java(HtmlSanitizer.sanitize(dto.telefone()))")
    @Mapping(target = "ativo", source = "ativo")
    void atualizarUsuarioFromDto(UsuarioEditarResponseDTO dto, @MappingTarget Usuario usuario);

    UsuarioLoginResponseDTO authToDTO (Usuario usuario);

}
