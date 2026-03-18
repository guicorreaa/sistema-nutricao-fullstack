package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.config.UserDetailsImpl;
import br.com.anaprado.nutri_api.controller.dto.autenticacao.AuthenticationDTO;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuarioLoginResponseDTO;
import br.com.anaprado.nutri_api.controller.mappers.UsuarioMapper;
import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.security.TokenService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UsuarioMapper usuarioMapper;

    public void login(AuthenticationDTO dto, HttpServletResponse response) {
        var userNamePassword = new UsernamePasswordAuthenticationToken(dto.email(), dto.senha());
        var auth = this.authenticationManager.authenticate(userNamePassword);

        var userDetails = (UserDetailsImpl) auth.getPrincipal();
        Usuario usuario = userDetails.getUsuario();

        var token = tokenService.gerarToken(usuario);

        // Criar cookie seguro HttpOnly
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(true) // Troque para true em produção com HTTPS
                .sameSite("None") // Pode usar "None" se front e back forem domínios diferentes e HTTPS
                .path("/")
                .maxAge(20 * 60) // 20 minutos em segundos
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

    }

    public ResponseEntity<UsuarioLoginResponseDTO> getCurrentUserService(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        var principal = (UserDetailsImpl) authentication.getPrincipal(); // ou outro DTO que você usou

        return ResponseEntity.ok(usuarioMapper.authToDTO(principal.getUsuario()));
    }
}
