package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.ItemRefeicaoSubstituto.CadastrarItemRefeicaoDoSubstitutoDTO;
import br.com.anaprado.nutri_api.controller.dto.ItemRefeicaoSubstituto.ItemRefeicaoRelatorioDTO;
import br.com.anaprado.nutri_api.service.ItemRefeicaoSubstitutoService;
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
@RequestMapping("/item-refeicao-substituto")
@RequiredArgsConstructor
@Tag(name = "11. Itens da refeição substituto", description = "Operações relacionadas ao cadastro e gestão dos alimentos opcionais do cliente.")
public class ItemRefeicaoSubstitutoController {

    private final ItemRefeicaoSubstitutoService itemRefeicaoSubstitutoService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/cadastrar-substituto")
    @Operation(summary = "Cadastrar alimento opcional", description = "Cadastrar um novo alimento opcional.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Alimento opcional cadastrado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Não foi encontrado o alimento principal ou o alimento opcional não existe.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Conflito de cadastro: o item já é opcional ou este substituto já foi adicionado.", content = @Content)
    })
    public ResponseEntity<Void> cadastrarAlimentoSubstituto(
            @Valid @RequestBody CadastrarItemRefeicaoDoSubstitutoDTO dto
    ){
        itemRefeicaoSubstitutoService.cadastrarAlimentoSubstituto(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/{refeicao_id}/itens")
    @Operation(summary = "Obter todos itens da refeição", description = "Obter todos itens da refeição.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    public ResponseEntity<List<ItemRefeicaoRelatorioDTO>> gerarRelatorio(
            @Parameter(description = "ID da refeição.")
            @PathVariable("refeicaoId") UUID refeicaoId
    ) {
        List<ItemRefeicaoRelatorioDTO> relatorio = itemRefeicaoSubstitutoService.gerarRelatorio(refeicaoId);
        return ResponseEntity.ok(relatorio);
    }

}
