package br.com.anaprado.nutri_api.config;

import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(username);

        if (usuario == null) {
            throw new UsernameNotFoundException("Usuário não encontrado com email: " + username);
        }
        return new UserDetailsImpl(usuario);
    }
}
