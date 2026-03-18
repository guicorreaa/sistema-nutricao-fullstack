package br.com.anaprado.nutri_api.controller.mappers;

import br.com.anaprado.nutri_api.controller.dto.cliente.ClienteRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.cliente.ClienteResponseDTO;
import br.com.anaprado.nutri_api.controller.dto.cliente.ClienteResponsePerfilDTO;
import br.com.anaprado.nutri_api.controller.dto.cliente.EditarClienteDTO;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.security.HtmlSanitizer;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", imports = HtmlSanitizer.class)
public interface ClienteMapper {

    // Cria novo Cliente a partir do DTO + Usuario (resolvido manualmente no service)
    @Mapping(target = "clienteId", ignore = true)
    @Mapping(target = "ultimaAlteracao", ignore = true)
    @Mapping(target = "usuario", source = "usuario")
    @Mapping(target = "nome", expression = "java(HtmlSanitizer.sanitize(dto.nome()))")
    @Mapping(target = "objetivoNutricional", expression = "java(HtmlSanitizer.sanitize(dto.objetivoNutricional()))")
    Cliente toEntity(ClienteRequestDTO dto, Usuario usuario);

    // Atualiza um cliente já existente com os dados do DTO
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "clienteId", ignore = true)
    @Mapping(target = "ultimaAlteracao", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "nome", expression = "java(HtmlSanitizer.sanitize(dto.nome()))")
    @Mapping(target = "objetivoNutricional", expression = "java(HtmlSanitizer.sanitize(dto.objetivoNutricional()))")
    Cliente updateEntityDTO(EditarClienteDTO dto, @MappingTarget Cliente cliente);

    ClienteResponsePerfilDTO clientePerfilToDTO(Cliente cliente);
}
