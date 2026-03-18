package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.exceptions.TokenInvalidoExpirado;
import br.com.anaprado.nutri_api.exceptions.TokenNaoEncontradoException;
import br.com.anaprado.nutri_api.exceptions.UsuarioNaoEncontradoException;
import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.model.UsuarioToken;
import br.com.anaprado.nutri_api.repository.UsuarioRepository;
import br.com.anaprado.nutri_api.repository.UsuarioTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UsuarioTokenService {

    private final UsuarioTokenRepository usuarioTokenRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public void definirSenha(String tokenString, String novaSenha) {
        UsuarioToken token = usuarioTokenRepository.findByToken(tokenString).orElseThrow(() -> new TokenNaoEncontradoException("Token não encontrado"));

        if (token.getExpiracao().isBefore(LocalDateTime.now())){
            throw new TokenInvalidoExpirado("Token expirado");
        }

        Usuario usuario = usuarioRepository.findById(token.getUsuarioId()).orElseThrow(() -> new UsuarioNaoEncontradoException("Usuario não encontrado"));

        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);

        usuarioTokenRepository.delete(token);
    }
}
