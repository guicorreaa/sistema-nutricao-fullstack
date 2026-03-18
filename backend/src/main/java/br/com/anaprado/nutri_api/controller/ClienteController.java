package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import br.com.anaprado.nutri_api.controller.dto.cliente.*;
import br.com.anaprado.nutri_api.service.ClienteService;
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
@RequestMapping("cliente")
@RequiredArgsConstructor
@Tag(name = "04. Cliente", description = "Operações relacionadas ao cadastro e gestão de clientes (após o usuário estar criado).")
public class ClienteController {

    private final ClienteService clienteService;

    //erro ao esquecer um campo, ele aparece Token ausente ou inválido (chama o tokenInvalidoAuthenticationEntryPoint)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/{usuario_id}")
    @Operation(summary = "Cadastrar cliente", description = "Cadastrar um novo cliente, após ter sido realizado o cadastro do usuário.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Agendamento criado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Usuário já tem cadastro em cliente.", content = @Content)
    })
    public ResponseEntity<Void> cadastrarCliente(
            @Parameter(description = "ID do usuário a ser cadastrado como cliente.")
            @PathVariable("usuario_id") UUID usuario_id,
            @RequestBody @Valid ClienteRequestDTO dto
    ) {
        clienteService.cadastrarCliente(usuario_id, dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/{cliente_id}")
    @Operation(summary = "Editar cliente", description = "Editar um cliente já existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Cliente atualizado com sucesso", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado", content = @Content),
    })
    public ResponseEntity<Void> editarCliente(
            @Parameter(description = "ID do cliente a ser alterado.")
            @PathVariable("cliente_id") UUID cliente_id,
            @Valid @RequestBody EditarClienteDTO editarClienteDTO
    ) {
        clienteService.editarCliente(cliente_id, editarClienteDTO);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    @Operation(summary = "Obter todos clientes", description = "Obter todos os clientes com todas as informações cadastradas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso"),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    @PageableAsQueryParam
    public ResponseEntity<PageResponse<ClienteResponseDTO>> obterTodosClientesCompleto(
            @Parameter(description = "Filtro por nome do paciente", example = "Guilherme Corrêa")
            @RequestParam(required = false) String nome,
            @Parameter(hidden = true) Pageable pageable) {
        return ResponseEntity.ok(clienteService.obterTodosClientesCompleto(nome, pageable));
    }

    // Endpoint mais simples, onde vai retornar os dados mais especificos do cliente
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/dadosSimples")
    @Operation(summary = "Obter todos clientes (apenas para seleção)", description = "Obter todos os clientes com informações mais basícas, usado apenas em modais para escolher o cliente que desejo.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso"),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    @PageableAsQueryParam
    public ResponseEntity<PageResponse<ClienteResponseDadosTabelaEscolhaDTO>> obterTodosClientesTabelasEscolha(
            @Parameter(description = "Filtro por nome ou email do paciente")
            @RequestParam(required = false) String nomeEmail,
            @Parameter(hidden = true) Pageable pageable) {
        return ResponseEntity.ok(clienteService.obterTodosClientesSimplificado(nomeEmail, pageable));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{clienteId}")
    @Operation(summary = "Deletar cliente", description = "Deletar um cliente desejado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Agendamento excluído com sucesso"),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado", content = @Content),
            @ApiResponse(responseCode = "409", description = "Cliente possui dados vinculados", content = @Content),
    })
    public ResponseEntity<Void> deletarCliente(
            @Parameter(description = "ID do cliente que deseja excluir.")
            @PathVariable("clienteId") UUID clienteId
    ) {
        clienteService.deletarCliente(clienteId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PreAuthorize("hasAnyRole('CLIENTE', 'ADMIN')")
    @GetMapping("/informacoes")
    @Operation(summary = "Obter dados (perfil cliente)", description = "Obter os dados do perfil do cliente, usado apenas pelo cliente, onde pega do SecurityContextHolder.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso"),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN ou CLIENTE", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado", content = @Content),
    })
    public ResponseEntity<ClienteResponsePerfilDTO> obterPerfilClientes() {
        return ResponseEntity.ok(clienteService.obterPerfilCliente());
    }

    // Endpoint usado dentro de dados antropométricos, onde retorna apenas os clientes que não tem dados antropométricos
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/semDados")
    @Operation(summary = "Obter clientes sem dados antropométricos", description = "Obter apenas os cliente que não possuem cadastro dentro de dados antropométricos.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso"),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    @PageableAsQueryParam
    public ResponseEntity<PageResponse<ClienteResponseDadosTabelaEscolhaDTO>> obterClientesSemDadosAntropometricos(
            @Parameter(description = "Filtro por nome ou email do paciente")
            @RequestParam(required = false) String nomeEmail,
            @Parameter(hidden = true) Pageable pageable) {
        return ResponseEntity.ok(clienteService.obterClientesSemDadosAntropometricos(nomeEmail, pageable));
    }


}
