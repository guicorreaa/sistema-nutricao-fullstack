package br.com.anaprado.nutri_api.controller;

import br.com.anaprado.nutri_api.controller.dto.token.DefinirSenhaRequestDTO;
import br.com.anaprado.nutri_api.service.UsuarioTokenService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Hidden
public class SenhaTokenController {

    private final UsuarioTokenService usuarioTokenService;

    @PostMapping("/definir-senha")
    public ResponseEntity<String> definirSenha(@RequestParam String token, @RequestBody @Valid DefinirSenhaRequestDTO dto) {

        usuarioTokenService.definirSenha(token, dto.novaSenha());
        return ResponseEntity.ok("Senha definida com sucesso!");
    }

}
