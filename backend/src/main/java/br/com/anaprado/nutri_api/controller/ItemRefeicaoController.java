package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.ItemRefeicao.*;
import br.com.anaprado.nutri_api.service.ItemRefeicaoService;
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
@RequestMapping("/itemrefeicao")
@RequiredArgsConstructor
@Tag(name = "12. Itens da refeição", description = "Operações relacionadas ao cadastro e gestão dos alimentos da refeição.")
public class ItemRefeicaoController {

    private final ItemRefeicaoService itemRefeicaoService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/cadastrar")
    @Operation(summary = "Cadastrar item na refeição", description = "Cadastrar um item dentro da refeição.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Alimento cadastrado na refeição com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Refeição ou alimento não encontrado.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Alimento já cadastrado na refeição.", content = @Content)
    })
    public ResponseEntity<Void> cadastrarNovoItem(
            @Valid @RequestBody CadastrarNovoItemRefeicaoDTO cadastrarNovoItemRefeicaoDTO
    ) {
        itemRefeicaoService.cadastrarNovoItemRefeicao(cadastrarNovoItemRefeicaoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/editar/{idItemRefeicao}")
    @Operation(summary = "Editar item da refeição", description = "Editar um item da refeição.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Item da refeição atualizado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Item dentro da refeição ou alimento não existem.", content = @Content),
    })
    public ResponseEntity<Void> editarItemRefeicao(
            @PathVariable("idItemRefeicao") UUID idItemRefeicao,
            @Valid @RequestBody EditarItemRefeicaoDTO editarItemRefeicaoDTO
    ) {
        itemRefeicaoService.editarItem(idItemRefeicao, editarItemRefeicaoDTO);
        return ResponseEntity.noContent().build();
    }

    // Obter todos os item baseado na refeição id
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/obter/{id_refeicao}")
    public ResponseEntity<List<ObterItensDaRefeicaoDTO>> obterAlimentosDaMesmaRefeicao(@PathVariable("id_refeicao") String refeicao_id) {
        return ResponseEntity.ok(itemRefeicaoService.obterItensDaRefeicao(refeicao_id));
    }

    // Obter todos os item baseado na refeição id (porém com os dados completo da tabela alimento)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/obtercompleto/{refeicaoId}")
    @Operation(summary = "Obter todos os item baseado na refeição id", description = "Obter todos os item baseado na refeição id (porém com os dados completo da tabela alimento)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Refeição não encontrada", content = @Content),
    })
    public ResponseEntity<List<ObterItensDaRefeicaoCompletoDTO>> obterAlimentosDaMesmaRefeicaoCompleto(
            @Parameter(description = "ID refeição")
            @PathVariable("refeicaoId") UUID refeicaoId
    ) {
        return ResponseEntity.ok(itemRefeicaoService.obterAlimentosDaMesmaRefeicaoCompleto(refeicaoId));
    }

    // Obter todos os itens de todas refeições (usando para calcular o total de todas refeições do dia inteiro)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/obter/todas/{idDieta}")
    @Operation(summary = "Obter todos os itens de todas refeições", description = "Obter todos os itens de todas refeições completo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Dieta não encontrada", content = @Content),
    })
    public ResponseEntity<List<ObterTodosAlimentosTodasRefeicoes>> obterTodosAlimentosTodasRefeicoes(
            @Parameter(description = "ID dieta")
            @PathVariable("idDieta") UUID idDieta
    ){
        return ResponseEntity.ok(itemRefeicaoService.obterTodosAlimentos(idDieta));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/deletar/{idItemRefeicao}")
    @Operation(summary = "Deletar item da refeição", description = "Deletar um item da refeição.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Item da refeição excluído com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Não foi encontrado o item da refeição.", content = @Content),
    })
    public ResponseEntity<Void> deletarItemRefeicao(
            @Parameter(description = "ID do item a ser excluido.")
            @PathVariable("idItemRefeicao") UUID idItemRefeicao
    ) {
        itemRefeicaoService.deletarItem(idItemRefeicao);
        return ResponseEntity.noContent().build();
    }

}
