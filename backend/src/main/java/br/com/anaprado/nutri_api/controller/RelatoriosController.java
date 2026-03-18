package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.config.UserDetailsImpl;
import br.com.anaprado.nutri_api.controller.dto.Relatorio.RelatorioCompletoDTO;
import br.com.anaprado.nutri_api.service.RelatorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("relatorios")
@RequiredArgsConstructor
@Tag(name = "14. Relatórios", description = "Operações relacionadas a relatórios do sistema.")
public class RelatoriosController {

    private final RelatorioService relatorioService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/gerar-relatorio/{dadosId}")
    @Operation(summary = "Dados completos para relatório", description = "Obter dados completos para gerar relatório antropométrico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Dado antropométrico fixo ou variável não foram encontrados.", content = @Content),
    })
    public ResponseEntity<RelatorioCompletoDTO> gerarRelatorioAdmin(@PathVariable("dadosId")UUID dadoId) {
        return ResponseEntity.ok(relatorioService.gerarRelatorioCompletoAdmin(dadoId));
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/")
    @Operation(summary = "Dados completos para relatório (CLIENTE)", description = "Obter dados completos para gerar relatório antropométrico do cliente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado ou dado antropométrico fixo ou variável não foram encontrados.", content = @Content),
    })
    public ResponseEntity<RelatorioCompletoDTO> gerarRelatorioPerfilCliente(
            @AuthenticationPrincipal UserDetailsImpl userDetails){
        return ResponseEntity.ok(relatorioService.gerarRelatorioCompletoParaCliente(userDetails.getUsuario()));
    }
}
