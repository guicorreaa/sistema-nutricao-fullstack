package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.cliente.ClienteResponseDTO;
import br.com.anaprado.nutri_api.controller.dto.cliente.ClienteResponseDadosTabelaEscolhaDTO;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.model.DadosCliente;
import br.com.anaprado.nutri_api.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClienteRepository extends JpaRepository<Cliente, UUID> {

    Optional<Cliente> findByUsuario(Usuario usuario);

    boolean existsByUsuario(Usuario usuario);

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.cliente.ClienteResponseDadosTabelaEscolhaDTO(
            c.clienteId, c.nome, u.email
            )            	
            FROM Cliente as c
            JOIN c.usuario u
            WHERE (
                :nomeEmail IS NULL
                OR c.nome LIKE %:nomeEmail%
                OR u.email LIKE %:nomeEmail%                
            )
            """)
    Page<ClienteResponseDadosTabelaEscolhaDTO> findAllClientesSimples(@Param("nomeEmail") String nomeEmail, Pageable pageable);

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.cliente.ClienteResponseDadosTabelaEscolhaDTO(
                c.clienteId, c.nome, c.usuario.email
            )
            FROM Cliente c
            LEFT JOIN DadosCliente dc ON dc.cliente = c
            WHERE dc.cliente IS NULL
            AND (
                 :nomeEmail IS NULL
                 OR c.nome LIKE %:nomeEmail%
                 OR c.usuario.email LIKE %:nomeEmail%
             )
            """)
    Page<ClienteResponseDadosTabelaEscolhaDTO> findAllClienteSemDados(@Param("nomeEmail") String nomeEmail, Pageable pageable);

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.cliente.ClienteResponseDTO(
                c.clienteId,
                c.nome,
                c.dataNascimento,
                c.sexo,
                c.objetivoNutricional,
                c.ultimaAlteracao            
            ) FROM Cliente c
            WHERE (:nome IS NULL OR c.nome LIKE %:nome%)
            """)
    Page<ClienteResponseDTO> findAllClienteCompleto(@Param("nome") String nome, Pageable pageable);

}
