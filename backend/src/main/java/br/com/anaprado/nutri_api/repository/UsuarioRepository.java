package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.usuario.UsuariosResponseTodosComNome;
import br.com.anaprado.nutri_api.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {

    boolean existsByEmail(String email);

    Usuario findByEmail(String email);

    @Query("""
                SELECT new br.com.anaprado.nutri_api.controller.dto.usuario.UsuariosResponseTodosComNome(
                    u.usuario_id,
                    u.email,
                    c.nome,
                    u.ativo,
                    u.data_criacao,
                    u.telefone
                )
                FROM Usuario u
                LEFT JOIN Cliente c ON c.usuario = u
                WHERE (:nomeEmail IS NULL OR c.nome LIKE %:nomeEmail%)
                OR (:nomeEmail IS NULL OR u.email LIKE %:nomeEmail%)
            """)
    Page<UsuariosResponseTodosComNome> findAllUsuariosComNomes(@Param("nomeEmail") String nomeEmail, Pageable pageable);

    @Query("""
                SELECT new br.com.anaprado.nutri_api.controller.dto.usuario.UsuariosResponseTodosComNome(
                    u.usuario_id,
                    u.email,
                    c.nome,
                    u.ativo,
                    u.data_criacao,
                    u.telefone
                )
                FROM Usuario u
                LEFT JOIN Cliente c ON c.usuario = u
                WHERE c.usuario IS NULL
                AND (
                    :nomeEmail IS NULL
                    OR c.nome LIKE %:nomeEmail%
                    OR u.email LIKE %:nomeEmail%
                ) 
                ORDER BY u.usuario_id
            """)
    Page<UsuariosResponseTodosComNome> findUsuariosSemCadastroEmCliente(@Param("nomeEmail") String nomeEmail, Pageable pageable);


}
