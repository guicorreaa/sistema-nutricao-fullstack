package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuarioEditarResponseDTO;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuarioRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuariosResponseTodosComNome;
import br.com.anaprado.nutri_api.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("usuario")
@RequiredArgsConstructor
@Tag(name = "03. Usuários", description = "Operações relacionadas ao cadastro e gestão de usuários.")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("admin/registrar")
    @Operation(summary = "Cadastrar usuário", description = "Cadastrar um novo usuário.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Sucesso ao cadastrar usuário.", content = @Content),
            @ApiResponse(responseCode = "400", description = "E-mail já cadastrado ou dados inválidos.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    public ResponseEntity<Void> cadastrarUsuario(@RequestBody @Valid UsuarioRequestDTO usuarioRequestDTO) {
        usuarioService.cadastrarUsuario(usuarioRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("admin/obterUsuarios")
    @Operation(summary = "Obter usuários", description = "Obter todos os usuários cadastrados.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Sucesso ao buscar usuários."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    @PageableAsQueryParam
    public ResponseEntity<PageResponse<UsuariosResponseTodosComNome>> getTodosUsuarios(
            @Parameter(description = "Filtro pelo nome do usuário ou pelo e-mail.", example = "guilherme OU guilherme@hotmail.com")
            @RequestParam(required = false) String nomeEmail,
            @Parameter(hidden = true) Pageable pageable) {
        return ResponseEntity.ok(usuarioService.getTodosUsuarios(nomeEmail, pageable));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("admin/deletarusuario/{id}")
    @Operation(summary = "Deletar usuário", description = "Deletar um usuário cadastrado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Usuário excluído com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Usuário possui dados vinculados!.", content = @Content),
    })
    public ResponseEntity<Void> deletarUsuario(
            @Parameter(description = "UUID do usuário que deseja excluir.", example = "00000000-0000-0000-0000-000000000000")
            @PathVariable("id") UUID id
    ) {
        usuarioService.deletarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    // retornar usuario
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("admin/update/{id}")
    @Operation(summary = "Editar usuário", description = "Editar um usuário já existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário atualizado com sucesso."),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado.", content = @Content),
    })
    public ResponseEntity<UsuarioEditarResponseDTO> atualizarUsuario(
            @Parameter(description = "UUID do usuário que deseja excluir.", example = "00000000-0000-0000-0000-000000000000")
            @PathVariable("id") UUID id,
            @RequestBody @Valid UsuarioEditarResponseDTO usuarioEditarResponseDTO) {
        UsuarioEditarResponseDTO dto = usuarioService.alterarUsuario(id, usuarioEditarResponseDTO);
        return ResponseEntity.ok(dto);
    }

    // Usado dentro da area "cliente", vai exibir apenas usuarios que não tem cadastro dentro de cliente
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("admin/usuariosSemCliente")
    @Operation(summary = "Obter usuários sem cadastro em cliente.", description = "Obter todos os usuários cadastrados, porém só exibir os que não possuem cadastro dentro da tabela clientes.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Sucesso ao buscar usuários."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    @PageableAsQueryParam
    public ResponseEntity<PageResponse<UsuariosResponseTodosComNome>> obterUsuariosSemCadastroEmCliente(
            @Parameter(description = "Filtro pelo nome do usuário ou pelo e-mail.", example = "guilherme OU guilherme@hotmail.com")
            @RequestParam(required = false) String nomeEmail,
            @Parameter(hidden = true) Pageable pageable) {
        return ResponseEntity.ok(usuarioService.obterUsuariosSemCadastroEmCliente(nomeEmail, pageable));
    }

}
