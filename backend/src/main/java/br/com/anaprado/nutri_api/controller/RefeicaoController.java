package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.Refeicao.*;
import br.com.anaprado.nutri_api.service.RefeicaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("refeicao")
@RequiredArgsConstructor
@Tag(name = "08. Refeição", description = "Operações relacionadas ao cadastro e gestão de refeições.")
public class RefeicaoController {

    private final RefeicaoService refeicaoService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/cadastrar")
    @Operation(summary = "Cadastrar refeição", description = "Cadastrar nova refeição")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Refeição cadastrada com sucesso."),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Dieta ou tipo de refeição não encontrados.", content = @Content)
    })
    public ResponseEntity<ExibirRefeicaoAposCadastrarDTO> cadastrarRefeicao(
            @Valid @RequestBody CadastrarRefeicaoDTO cadastrarRefeicaoDTO
    ) {
        ExibirRefeicaoAposCadastrarDTO refeicaoCriada = refeicaoService.cadastrarNovaRefeicao(cadastrarRefeicaoDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(refeicaoCriada);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/editar/{refeicaoId}")
    @Operation(summary = "Editar refeição", description = "Editar uma refeição já existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Refeição atualizada com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Refeição, dieta ou tipo de refeição não encontrada.", content = @Content)
    })
    public ResponseEntity<Void> editarRefeicao(
            @Parameter(description = "ID da refeição.")
            @PathVariable("refeicaoId") UUID refeicaoId,
            @Valid @RequestBody EditarRefeicaoDTO editarRefeicaoDTO
    ) {
        refeicaoService.editarRefeicao(refeicaoId, editarRefeicaoDTO);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/deletar/{refeicaoId}")
    @Operation(summary = "Deletar refeição", description = "Deletar uma refeição do cliente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Agendamento excluído com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Refeição não encontrada.", content = @Content),
    })
    public ResponseEntity<Void> deletarRefeicao(
            @Parameter(description = "ID da refeição.")
            @PathVariable("refeicaoId") UUID refeicaoId) {
        refeicaoService.deletarRefeicao(refeicaoId);
        return ResponseEntity.noContent().build();
    }

    // Usado para exibir as apenas informações necessárias das refeições dentro da dieta
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/obter/{dietaId}")
    @Operation(summary = "Obter somente as informações simples da refeição", description = "Exibir as apenas informações necessárias.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    public ResponseEntity<List<ExibirRefeicoesEspecificoSimplesDTO>> exibirTodasRefeicoesEspecifico(@PathVariable("dietaId") UUID dietaId){
        return ResponseEntity.ok(refeicaoService.obterTodasRefeicoesEspecifico(dietaId));
    }

    // Endpoint para que quando eu for editar ou visualizar ele trazer os dados completos da refeicao (com id da dieta e da refeição)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/informacoes/{refeicaoId}")
    @Operation(summary = "Obter refeição completa", description = "Exibir os dados completos da refeição selecionada.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    public ResponseEntity<List<ExibirDadosDaRefeicaoCompletaDTO>> exibirDadosDaRefeicaoCompleta(@PathVariable("refeicaoId") UUID refeicaoId) {
        return ResponseEntity.ok(refeicaoService.exibirRefeicaoCompleta(refeicaoId));
    }

}
