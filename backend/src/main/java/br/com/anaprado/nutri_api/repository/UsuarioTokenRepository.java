package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.model.UsuarioToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UsuarioTokenRepository extends JpaRepository<UsuarioToken, UUID> {

    Optional<UsuarioToken> findByToken(String token);

    Optional<UsuarioToken> findByUsuarioId(UUID uuid);

    void deleteByUsuarioId(UUID usuarioId);

}
