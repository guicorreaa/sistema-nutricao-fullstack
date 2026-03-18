package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.*;
import br.com.anaprado.nutri_api.model.enuns.FatorAtividade;
import br.com.anaprado.nutri_api.service.DadosService;
import io.swagger.v3.oas.annotations.Hidden;
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
@RequestMapping("dados")
@RequiredArgsConstructor
@Tag(name = "05. Dados antropométricos", description = "Operações relacionadas ao cadastro e gestão de dados antropométricos.")
public class DadosController {

    private final DadosService dadosService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("admin/criar/{cliente_id}")
    @Operation(summary = "Cadastrar dado antropométrico completo", description = "Processo de cadastrar os dados antropométricos completo (dados fixos e variaveis).")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Dado cadastrado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado", content = @Content),
            @ApiResponse(responseCode = "409", description = "Dado antropométrico já cadastrado", content = @Content)
    })
    public ResponseEntity<DadosRequestDTO> cadastrarDados(
            @Parameter(description = "ID do cliente a ser cadastrado o dado antropométrico.")
            @PathVariable("cliente_id") String cliente_id,
            @RequestBody @Valid DadosRequestDTO dadosRequestDTO
    ) {
        UUID uuid = UUID.fromString(cliente_id);
        dadosService.criarCadastroInicial(uuid, dadosRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("admin/atualizar/{dadoId}")
    @Operation(summary = "Editar dados antropométricos fixos", description = "Editar dado antropométricos fixo do cliente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Dados antropométricos atualizados com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Dado antropométrico não encontrado.", content = @Content)
    })
    public ResponseEntity<Void> editarDados(
            @Parameter(description = "ID do dado antropométrico que deseja alterar.")
            @PathVariable("dadoId") String dadoId,
            @RequestBody @Valid DadosEditarVariaveisFixasDTO dadosEditarVariaveisFixasDTO) {
        UUID uuid = UUID.fromString(dadoId);
        dadosService.editarDadosFixos(uuid, dadosEditarVariaveisFixasDTO);
        return ResponseEntity.noContent().build();
    }

    // Usando na tabela principal em dados antropoméricos para trazer apenas os clientes que tem dados antropométricos
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("admin/obterdados")
    @Operation(summary = "Obter todos os dados antropométricos", description = "Obter todos os dados antropométricos.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    @PageableAsQueryParam
    public ResponseEntity<PageResponse<DadosResponseTabelaInformacoesDTO>> preencherTabelaPrincipal(
            @Parameter(description = "Filtro por nome ou email do paciente")
            @RequestParam(required = false) String nomeEmail,
            @Parameter(hidden = true) Pageable pageable
    ) {
        return ResponseEntity.ok(dadosService.preencherTabelaPrinipal(nomeEmail, pageable));
    }

    // Usado para trazer os dados dos clientes ao clicar em vizualiar ou editar (trazer apenas de uma pessoa)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("admin/obterdados/{id}")
    @Operation(summary = "Obter dados antropométricos completo", description = "Obter todos os dados antropométricos completo de um cliente específico.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Dado antropométrico não encontrado", content = @Content),
    })
    public ResponseEntity<DadosResponseTodosDadosDTO> obterTodosDadosAntropometricos(
            @Parameter(description = "ID do dado antropométrico.")
            @PathVariable("id") UUID id
    ) {
        return ResponseEntity.ok(dadosService.obterDadosCompletoUnicoCliente(id));
    }

    @Hidden
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{dadosId}")
    @Operation(summary = "Deletar dado antropométrico", description = "Deletar um dado antropométrico (os dados não podem serem excluidos pois tem histórico)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Agendamento excluído com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Dado antropométrico não encontrado.", content = @Content)
    })
    public ResponseEntity<Void> deletarDadosAntropometricos(@PathVariable("dadosId") UUID dadosId) {
        dadosService.deletarDadoAntropometrico(dadosId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/fatores-atividade")
    @Operation(summary = "Obter fatores atividades", description = "Obter os fatores atividade corretos com valores para cadastro.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    public ResponseEntity<FatorAtividade[]> getFatoresAtividade() {
        return ResponseEntity.ok(FatorAtividade.values());
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/dadosAntopometricos")
    @Operation(summary = "Obter dados antropométricos (perfil cliente)", description = "Obter todos os dados antropométricos no perfil do cliente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Dado antropométrico não encontrado", content = @Content),
    })
    public ResponseEntity<DadosResponseAntopometriaDTO> obterDadosAntopometricos() {
        return ResponseEntity.ok(dadosService.obterDadosAntopometricos());
    }


}
