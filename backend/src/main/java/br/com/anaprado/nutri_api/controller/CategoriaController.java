package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.Categoria.CadastrarCategoriaAlimentoDTO;
import br.com.anaprado.nutri_api.controller.dto.Categoria.EditarCategoriaAlimentoDTO;
import br.com.anaprado.nutri_api.controller.dto.Categoria.ObterAposEnviarCategoriaDTO;
import br.com.anaprado.nutri_api.controller.dto.Categoria.ObterTodasCategoriasDTO;

import br.com.anaprado.nutri_api.service.CategoriaService;
import io.swagger.v3.oas.annotations.Hidden;
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

@RestController
@RequestMapping("categoria")
@RequiredArgsConstructor
@Tag(name = "09. Categoria", description = "Operações relacionadas ao cadastro e gestão de categorias.")
public class CategoriaController {

    private final CategoriaService categoriaService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/categorias")
    @Operation(summary = "Obter categorias", description = "Obter todas as categorias.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    public ResponseEntity<List<ObterTodasCategoriasDTO>> obterCategoriasAtivas(
            @Parameter(description = "Buscar se está ativo")
            @RequestParam(defaultValue = "true") boolean ativo
    ) {
        return ResponseEntity.ok(categoriaService.obterTodasCategorias(ativo));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/categorias")
    @Operation(summary = "Cadastrar categoria", description = "Cadastrar um novo agendamento.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Categoria cadastrada com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "409", description = "Essa categoria já está cadastrada.", content = @Content)
    })
    public ResponseEntity<ObterAposEnviarCategoriaDTO> cadastrarCategoriaAlimento(
            @Valid @RequestBody CadastrarCategoriaAlimentoDTO cadastrarCategoriaAlimentoDTO
    ) {
        return ResponseEntity.ok(categoriaService.cadastrarNovaCategoria(cadastrarCategoriaAlimentoDTO));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/categorias/{idCategoria}")
    @Operation(summary = "Editar categoria", description = "Editar uma categoria já existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Categoria atualizada com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Categoria não encontrada.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Categoria sendo usada.", content = @Content)
    })
    public ResponseEntity<Void> editarCategoriaAlimento(
            @Parameter(description = "ID da categoria")
            @PathVariable("idCategoria") Integer idCAtegoria,
            @Valid @RequestBody EditarCategoriaAlimentoDTO editarCategoriaAlimentoDTO
    ) {
        categoriaService.editarCategoria(idCAtegoria, editarCategoriaAlimentoDTO);
        return ResponseEntity.noContent().build();
    }

    @Hidden
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/categorias/{idCategoria}")
    @Operation(summary = "Deletar categoria", description = "Deletar uma categoria.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Categoria excluída com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Categoria não encontrada.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Categoria sendo usada.", content = @Content)
    })
    public ResponseEntity<Void> excluirCategoriaAlimento(
            @Parameter(description = "ID da categoria")
            @PathVariable("idCategoria") Integer idCategoria
    ) {
        categoriaService.excluirCategoria(idCategoria);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}