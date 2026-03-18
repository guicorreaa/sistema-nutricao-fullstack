package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.Alimento.CadastrarAlimentoDTO;
import br.com.anaprado.nutri_api.controller.dto.Alimento.EditarAlimentosDTO;
import br.com.anaprado.nutri_api.controller.dto.Alimento.ObterAlimentoEspecificoDTO;
import br.com.anaprado.nutri_api.controller.dto.Alimento.ObterAlimentosSimplesDTO;
import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import br.com.anaprado.nutri_api.service.AlimentoService;
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

@RestController
@RequestMapping("alimento")
@RequiredArgsConstructor
@Tag(name = "14. Alimentos", description = "Operações relacionadas ao cadastro e gestão dos alimentos.")
public class AlimentosController {

    private final AlimentoService alimentoService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/obter")
    @Operation(summary = "Obter alimentos", description = "Obter todos alimentos, usado na tabela principal.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    @PageableAsQueryParam
    public ResponseEntity<PageResponse<ObterAlimentosSimplesDTO>> obterAlimentosParaTabelaPrincipal(
            @RequestParam(required = false) Boolean ativo,
            @RequestParam(required = false) Integer categoria_id,
            @RequestParam(required = false) Integer subcategoria_id,
            @RequestParam(required = false) String nome_alimento,
            @Parameter(hidden = true) Pageable pageable
    ) {
        return ResponseEntity.ok(alimentoService.obterAlimentosTabelaPrincipal(ativo, categoria_id, subcategoria_id, nome_alimento, pageable));
    }

    // Preenche a visualização ou o campo de editar
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/obter/{alimentoId}")
    @Operation(summary = "Obter alimento específico", description = "Obter alimento específico.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso."),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
    })
    public ResponseEntity<ObterAlimentoEspecificoDTO> obterAlimentosEspecifico(
            @Parameter(description = "ID do alimento")
            @PathVariable("alimentoId") Integer alimentoId
    ) {
        return ResponseEntity.ok(alimentoService.obterAlimentoEspecifico(alimentoId));
    }

    // para cadastrar no front, fazer un select nas categorias e subcategorias, selecionar e mandar com a requisição
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/alimentos")
    @Operation(summary = "Cadastrar alimento", description = "Cadastrar um novo alimento.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Agendamento realizado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos (erro de validação)", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Categoria ou subcategoria não encontrada.", content = @Content)
    })
    public ResponseEntity<Void> cadastrarAlimento(
            @Valid @RequestBody CadastrarAlimentoDTO cadastrarAlimentoDTO
    ) {
        alimentoService.cadastrarNovoAlimento(cadastrarAlimentoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @PutMapping("/admin/alimentos/{idAlimento}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Editar alimento", description = "Editar um alimento existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Alimento atualizado com sucesso.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou malformados.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Você precisa estar autenticado para acessar este recurso.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Acesso negado - Requer perfil ADMIN", content = @Content),
            @ApiResponse(responseCode = "404", description = "Alimento não encontrado.", content = @Content),
    })
    public ResponseEntity<Void> editarAlimento(
            @Parameter(description = "ID do alimento.")
            @PathVariable("idAlimento") Integer idAlimento,
            @Valid @RequestBody EditarAlimentosDTO editarAlimentosDTO) {
        alimentoService.editarAlimento(idAlimento, editarAlimentosDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
