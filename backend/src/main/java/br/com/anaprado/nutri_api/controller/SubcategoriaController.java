package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.Subcategoria.CadastrarSubcategoriaDTO;
import br.com.anaprado.nutri_api.controller.dto.Subcategoria.EditarSubcategoriaDTO;
import br.com.anaprado.nutri_api.controller.dto.Subcategoria.ObterAposEnviarSubcategoriaDTO;
import br.com.anaprado.nutri_api.controller.dto.Subcategoria.ObterTodasSubcategoriasDTO;
import br.com.anaprado.nutri_api.service.SubcategoriaService;
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
@RequestMapping("subcategoria")
@RequiredArgsConstructor
@Tag(name = "10. Subcategorias", description = "Operações relacionadas ao cadastro e gestão de subcategorias.")
public class SubcategoriaController {

    private final SubcategoriaService subcategoriaService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/obter")
    @Operation(summary = "Obter subcategorias", description = "Obter todas as subcategorias.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    public ResponseEntity<List<ObterTodasSubcategoriasDTO>> obterTodasSubcategoriasAtivas(
            @Parameter(description = "Buscar por subcategorias ativas (padrão 'true')", example = "true")
            @RequestParam(defaultValue = "true") Boolean ativo,
            @Parameter(description = "ID da categoria")
            @RequestParam(required = true) Integer categoriaId
            ) {
        return ResponseEntity.ok(subcategoriaService.obterTodasSubcategorias(ativo, categoriaId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/subcategorias")
    @Operation(summary = "Cadastrar subcategoria", description = "Cadastrar uma nova subcategoria.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Subcategoria realizado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Categoria não encontrada", content = @Content),
            @ApiResponse(responseCode = "409", description = "Já existe essa subcategoria dentro dessa categoria!", content = @Content)
    })
    public ResponseEntity<ObterAposEnviarSubcategoriaDTO> cadastrarSubcategoria(
            @Valid @RequestBody CadastrarSubcategoriaDTO cadastrarSubcategoriaDTO
    ) {
        return ResponseEntity.ok(subcategoriaService.cadastrarSubcategoria(cadastrarSubcategoriaDTO));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/subcategorias/{subcategoriaId}")
    @Operation(summary = "Editar subcategoria", description = "Editar uma subcategoria já existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Subcategoria atualizada com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Subcategoria não encontrada.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Subcategoria está sendo usada.", content = @Content)
    })
    public ResponseEntity<Void> editarSubcategoria (
            @Parameter(description = "ID subcategoria")
            @PathVariable("subcategoriaId") Integer subcategoriaId,
            @Valid @RequestBody EditarSubcategoriaDTO editarSubcategoriaDTO
    ) {
        subcategoriaService.editarSubcategoria(subcategoriaId, editarSubcategoriaDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/subcategorias/{subcategoria_id}")
    @Operation(summary = "Deletar subcategoria", description = "Deletar uma subcategoria.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Subcategoria excluída com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Subcategoria não encontrada.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Subcategoria está sendo usada.", content = @Content)
    })
    public ResponseEntity<Void> excluirSubcategoria (
            @Parameter(description = "ID subcategoria")
            @PathVariable("subcategoria_id") Integer subcategoria_id
    ) {
        subcategoriaService.excluirSubcategoria(subcategoria_id);
        return ResponseEntity.noContent().build();
    }
}
