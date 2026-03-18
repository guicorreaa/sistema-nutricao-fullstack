package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.autenticacao.AuthenticationDTO;
import br.com.anaprado.nutri_api.controller.dto.autenticacao.LoginResponseDTO;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuarioLoginResponseDTO;
import br.com.anaprado.nutri_api.service.LoginService;
import br.com.anaprado.nutri_api.service.LogoutService;
import br.com.anaprado.nutri_api.service.TokenBlacklistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse; // <- IMPORTANTE: necessário para manipular a resposta HTTP e adicionar cookies


@Slf4j
@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "01. Autenticação", description = "Operações para realizar o login/logout dentro do sistema.")
public class AuthenticationController {

    private final LoginService loginService;
    private final LogoutService logoutService;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Realizar o login e obter o token de acesso.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Sucesso",
                    headers = @Header(name = "Set-Cookie", description = "Contém o JWT para autenticação", schema = @Schema(type = "string"))),
            @ApiResponse(responseCode = "401", description = "E-mail ou senha inválidos.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Dados de entrada malformados.", content = @Content)
    })
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO dto, HttpServletResponse response) {
        loginService.login(dto, response);

        // Pode retornar dados básicos, mas o token já está no cookie
        return ResponseEntity.ok(new LoginResponseDTO(null)); // ou null no token, porque ele está no cookie
    }

    @PreAuthorize("hasAnyRole('CLIENTE', 'ADMIN')")
    @GetMapping("me")
    @Operation(
            summary = "Obter dados do usuário logado",
            description = "Retorna as informações do perfil do usuário autenticado no momento através do token JWT."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados retornados com sucesso."),
            @ApiResponse(responseCode = "401", description = "Não autenticado - O token é inválido ou expirou.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Proibido - Você não tem permissão para acessar este recurso.", content = @Content)
    })
    public ResponseEntity<UsuarioLoginResponseDTO> getCurrentUser(Authentication authentication) {
        return loginService.getCurrentUserService(authentication);
    }

    @PreAuthorize("hasAnyRole('CLIENTE', 'ADMIN')")
    @PostMapping("/logout")
    @Operation(
            summary = "Encerrar sessão (Logout)",
            description = "Remove o cookie de autenticação do navegador, encerrando a sessão do usuário."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Logout realizado com sucesso e cookie removido.",
                    headers = @Header(name = "Set-Cookie", description = "Comando para o navegador invalidar o token", schema = @Schema(type = "string"))
            ),
            @ApiResponse(responseCode = "401", description = "Usuário já não estava autenticado.", content = @Content)
    })
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        logoutService.logout(request, response);
        return ResponseEntity.ok("Logout realizado com sucesso!");
    }
}
