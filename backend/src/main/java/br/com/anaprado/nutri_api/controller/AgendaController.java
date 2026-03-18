package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import br.com.anaprado.nutri_api.controller.dto.agenda.AgendaCadastroRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.agenda.AgendaEditarRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.agenda.AgendaObterListaCompletaDTO;
import br.com.anaprado.nutri_api.service.AgendaService;
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

import java.util.UUID;


@RestController
@RequiredArgsConstructor
@RequestMapping("agendar")
@Tag(name = "02. Agendamentos", description = "Operações relacionadas ao cadastro e gestão de agendamentos.")
public class AgendaController {

    private final AgendaService agendaService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/agendamentos")
    @Operation(summary = "Cadastrar agendamento", description = "Cadastrar um novo agendamento.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Agendamento realizado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "409", description = "Conflito de horário: Já existe uma consulta agendada para este período", content = @Content)
    })
    public ResponseEntity<Void> criarAgendamento(@RequestBody @Valid AgendaCadastroRequestDTO agendaCadastroRequestDTO) {
        agendaService.agendarConsulta(agendaCadastroRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/agendamentos/{id}")
    @Operation(summary = "Editar agendamento", description = "Editar um agendamento já existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Agendamento atualizado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Agendamento não encontrado.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Conflito de horário: Já existe uma consulta agendada para este período", content = @Content)
    })
    public ResponseEntity<Void> editarAgendamento(@Parameter(description = "ID do agendamento que deseja alterar.") @PathVariable("id") UUID id,
                                                  @RequestBody @Valid AgendaEditarRequestDTO agendaEditarRequestDTO) {
        agendaService.editarAgendamento(id, agendaEditarRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/agendamentos")
    @Operation(summary = "Obter agendamentos", description = "Obter todos os agedamentos cadastrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    @PageableAsQueryParam
    public ResponseEntity<PageResponse<AgendaObterListaCompletaDTO>> obterAgendamentos(
            @Parameter(description = "Filtro por nome ou email do paciente", example = "Guilherme")
            @RequestParam(required = false) String nomeEmail,
            @Parameter(hidden = true) Pageable pageable) {
        return ResponseEntity.ok(agendaService.obterAgendamentos(nomeEmail, pageable));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/agendamentos/{id}")
    @Operation(summary = "Deletar agendamento", description = "Deletar um agendamento do cliente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Agendamento excluído com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Agendamento não encontrado.", content = @Content),
    })
    public ResponseEntity<Void> deletarAgendamento(
            @Parameter(description = "UUID do agendamento", example = "UUID")
            @PathVariable("id") UUID id) {
        agendaService.deletarAgendamento(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/agendamentos/{idAgendamento}")
    @Operation(summary = "Obter agendamento específico", description = "Obter um agendamento de um cliente específico.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Agendamento não encontrado.", content = @Content),
    })
    public ResponseEntity<AgendaObterListaCompletaDTO> obterAgendamentoEspecifico(
            @Parameter(description = "UUID do agendamento", example = "UUID") @PathVariable("idAgendamento") UUID idAgendamento) {
        return ResponseEntity.ok(agendaService.obterAgendamentoEspecifico(idAgendamento));
    }


}
