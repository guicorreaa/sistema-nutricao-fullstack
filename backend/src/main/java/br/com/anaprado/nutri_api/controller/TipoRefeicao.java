package br.com.anaprado.nutri_api.controller;



import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.CadastrarTipoRefeicaoDTO;
import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.EditarTipoRefeicaoDTO;
import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.TodosTiposRefeicaoDTO;
import br.com.anaprado.nutri_api.service.TipoRefeicaoService;
import io.swagger.v3.oas.annotations.Operation;
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

@RestController
@RequestMapping("tipo")
@RequiredArgsConstructor
@Tag(name = "13. Tipo de refeição", description = "Operações relacionadas ao cadastro e gestão dos tipos de refeição.")
public class TipoRefeicao {

    private final TipoRefeicaoService tipoRefeicaoService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/tipos")
    @Operation(summary = "Obter tipos de refeição", description = "Obter todos os tipos de refeição cadastrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    public ResponseEntity<List<TodosTiposRefeicaoDTO>> obterTiposRefeicoes(@RequestParam(defaultValue = "true") boolean ativo){
        List<TodosTiposRefeicaoDTO> refeicoes = tipoRefeicaoService.obterTodosTipos(ativo);
        return ResponseEntity.ok(refeicoes);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/tipos")
    @Operation(summary = "Cadastrar um novo tipo de refeição", description = "Cadastrar um novo tipo de refeição. Ex: Café da manhã")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Tipo de refeição cadastrado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content)
    })
    public ResponseEntity<Void> cadastrarUmTipoRefeicao(@Valid @RequestBody CadastrarTipoRefeicaoDTO cadastrarTipoRefeicaoDTO) {
        tipoRefeicaoService.cadastrarNovoTipo(cadastrarTipoRefeicaoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/tipos/{id}")
    @Operation(summary = "Editar tipo de refeição", description = "Editar tipo de refeição já existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Tipo de refeição atualizado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Tipo de refeição não encontrado.", content = @Content),
    })
    public ResponseEntity<Void> editarTipoRefeicao(@PathVariable("id") Integer tipo_id, @Valid @RequestBody EditarTipoRefeicaoDTO editarTipoRefeicaoDTO) {
        tipoRefeicaoService.editarTipoRefeicao(tipo_id, editarTipoRefeicaoDTO);
        return ResponseEntity.noContent().build();
    }

    // Caso fazer endpoint para excluir, verificar se está sendo usado em outras tabelas (não fazer por enquanto)
}
