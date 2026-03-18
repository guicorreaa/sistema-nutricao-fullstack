package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.exceptions.RegistroDuplicadoException;
import br.com.anaprado.nutri_api.exceptions.UsuarioNaoEncontradoException;
import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.repository.ClienteRepository;
import br.com.anaprado.nutri_api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UsuarioValidator {

    private final UsuarioRepository usuarioRepository;

    public void validarSeExisteEmail(String email) {
        if (usuarioRepository.existsByEmail(email)) {
            throw new RegistroDuplicadoException("Já existe um usuário cadastrado com esse e-mail!");
        }
    }

    public Usuario verificarSeUsuarioExiste(UUID id){
        return usuarioRepository.findById(id).orElseThrow(() -> new UsuarioNaoEncontradoException("Usuario não encontrado no sistema!"));
    }


}
