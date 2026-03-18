package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.Dieta.CadastrarDietaDTO;
import br.com.anaprado.nutri_api.controller.dto.Dieta.EditarDietaDTO;
import br.com.anaprado.nutri_api.controller.dto.Dieta.ObterDietaEspecificaDTO;
import br.com.anaprado.nutri_api.controller.dto.Dieta.ObterNomesDietasDTO;
import br.com.anaprado.nutri_api.service.DietaService;
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
@RequestMapping("dieta")
@RequiredArgsConstructor
@Tag(name = "07. Dieta", description = "Operações relacionadas ao cadastro e gestão de dietas.")
public class DietaController {

    private final DietaService dietaService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/cadastrar")
    @Operation(summary = "Cadastrar dieta", description = "Cadastrar uma nova dieta.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Dieta cadastrada com sucesso", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado", content = @Content),
    })
    public ResponseEntity<Void> cadastrarDieta(@Valid @RequestBody CadastrarDietaDTO cadastrarDietaDTO) {
        dietaService.cadastrarNovaDieta(cadastrarDietaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Obter apenas nome e dieta_id (campos mais simples do front)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/dietas/nomes/{clienteId}")
    @Operation(summary = "Obter id/nome das dietas", description = "Obter somente nome e id da dieta.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    public ResponseEntity<List<ObterNomesDietasDTO>> obterNomeDasDietas(@PathVariable("clienteId") UUID clienteId) {
        return ResponseEntity.ok(dietaService.obterNomeDasDietas(clienteId));
    }

    // Obter todos os dados da tabela dieta
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/dietas/{clienteId}")
    @Operation(summary = "Obter todos os dados da dieta de um cliente", description = "Obter todos os dados da dieta de um cliente específico.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado.", content = @Content),
    })
    public ResponseEntity<List<ObterDietaEspecificaDTO>> obterDietasDeUmCliente(
            @Parameter(description = "ID do cliente")
            @PathVariable("clienteId") UUID clienteId) {
        return ResponseEntity.ok(dietaService.obterDietasClienteEspecifico(clienteId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/dietas/{dietaId}")
    @Operation(summary = "Deletar dieta", description = "Deletar uam dieta do cliente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Agendamento excluído com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Dieta não encontrada.", content = @Content),
    })
    public ResponseEntity<Void> excluirDieta(
            @Parameter(description = "ID da dieta")
            @PathVariable("dietaId") UUID dietaId) {
        dietaService.excluirDieta(dietaId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/dietas/editar/{dietaId}")
    @Operation(summary = "Editar dieta", description = "Editar uma dieta já existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Agendamento atualizado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Dieta não encontrada.", content = @Content),
    })
    public ResponseEntity<Void> editarDieta(
            @Parameter(description = "ID da dieta")
            @PathVariable("dietaId") UUID dietaId,
            @Valid @RequestBody EditarDietaDTO editarDietaDTO
    ) {
        dietaService.editarDieta(dietaId, editarDietaDTO);
        return ResponseEntity.noContent().build();
    }

}
