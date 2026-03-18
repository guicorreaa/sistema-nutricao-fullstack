package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.Antropometria.AntropometriaCadastrarDTO;
import br.com.anaprado.nutri_api.service.AntropometriaService;
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

import java.util.UUID;

@RestController
@RequestMapping("antropometria")
@RequiredArgsConstructor
@Tag(name = "06. Dados antropométricos variáveis", description = "Operações relacionadas ao cadastro e gestão de dados antropométricos variáveis.")
public class AntropometriaController {

    private final AntropometriaService antropometriaService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("admin/criar/{dadoId}")
    @Operation(summary = "Cadastrar antropometria variável", description = "Cadastrar dados antropométricos variáveis. Ex: Peso")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Antropometria cadastrada com sucesso", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Dados antropométricos fixos não encontrados", content = @Content)
    })
    public ResponseEntity<Void> cadastrarNovaAntropometria(
            @Parameter(description = "ID do dado antropométrico cadastrado.")
            @PathVariable("dadoId") UUID dadoId,
            @RequestBody @Valid AntropometriaCadastrarDTO antropometriaCadastrarDTO) {
        antropometriaService.novaAntropometria(dadoId, antropometriaCadastrarDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
