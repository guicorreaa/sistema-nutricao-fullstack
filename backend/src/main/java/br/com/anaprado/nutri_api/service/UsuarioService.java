package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.config.PageUtils;
import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuarioEditarResponseDTO;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuarioRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.usuario.UsuariosResponseTodosComNome;
import br.com.anaprado.nutri_api.controller.mappers.UsuarioMapper;
import br.com.anaprado.nutri_api.email.EmailService;
import br.com.anaprado.nutri_api.model.RoleType;
import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.model.UsuarioToken;
import br.com.anaprado.nutri_api.repository.UsuarioRepository;
import br.com.anaprado.nutri_api.repository.UsuarioTokenRepository;
import br.com.anaprado.nutri_api.security.SecurityConfiguration;
import br.com.anaprado.nutri_api.validator.ClienteValidator;
import br.com.anaprado.nutri_api.validator.UsuarioValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;
    private final UsuarioValidator usuarioValidator;
    private final ClienteValidator clienteValidator;
    private final EmailService emailService;
    private final UsuarioTokenRepository usuarioTokenRepository;

    private final SecurityConfiguration securityConfiguration;

    @Transactional
    public Usuario cadastrarUsuario(UsuarioRequestDTO usuarioRequestDTO) {
        usuarioValidator.validarSeExisteEmail(usuarioRequestDTO.email());

        Usuario usuarioEntidade = usuarioMapper.toEntity(usuarioRequestDTO);
        usuarioEntidade.setRole(RoleType.ROLE_CLIENTE);
        usuarioEntidade.setSenha(null);
        usuarioEntidade.setAtivo(true);

        Usuario salvo = usuarioRepository.save(usuarioEntidade);

        // Criar token
        String token = gerarTokenSeguro();
        UsuarioToken tokenEntity = UsuarioToken.builder()
                .usuarioId(salvo.getUsuario_id()) // 👈 agora associa ao usuário
                .token(token)
                .expiracao(LocalDateTime.now().plusHours(24))
                .build();

        usuarioTokenRepository.save(tokenEntity);

        // Enviar e-mail com link
        String linkAtivacao = "https://localhost:3000/alterarSenha?token=" + token;
        emailService.enviarEmailAtivacao(
                usuarioEntidade.getEmail(),
                linkAtivacao
        );

        System.out.println("\n\nenviou\n\n");

        return salvo; // 👈 só um return é suficiente
    }

    public PageResponse<UsuariosResponseTodosComNome> getTodosUsuarios(String nomeEmail, Pageable pageable) {
        Page<UsuariosResponseTodosComNome> page = usuarioRepository.findAllUsuariosComNomes(nomeEmail, pageable);
        return PageUtils.from(page);
    }

    @Transactional
    public void deletarUsuario(UUID id){
        Usuario usuario = usuarioValidator.verificarSeUsuarioExiste(id);
        clienteValidator.usuarioPossuiDadosDeCliente(usuario);

        Optional<UsuarioToken> usuarioToken = usuarioTokenRepository.findByUsuarioId(id);

        if (usuarioToken.isPresent()) {
            usuarioTokenRepository.deleteByUsuarioId(id);
            usuarioRepository.deleteById(id);
        } else {
            usuarioRepository.deleteById(id);
        }
    }

    public UsuarioEditarResponseDTO alterarUsuario(UUID id, UsuarioEditarResponseDTO usuarioEditarResponseDTO){
        var usuarioExistente = usuarioValidator.verificarSeUsuarioExiste(id);

        usuarioMapper.atualizarUsuarioFromDto(usuarioEditarResponseDTO, usuarioExistente);

        usuarioRepository.save(usuarioExistente);
        return usuarioEditarResponseDTO;
    }

    public String gerarTokenSeguro() {
        byte[] randomBytes = new byte[32]; // 256 bits
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }


    public PageResponse<UsuariosResponseTodosComNome> obterUsuariosSemCadastroEmCliente(String nomeEmail, Pageable pageable) {
        Page<UsuariosResponseTodosComNome> page = usuarioRepository.findUsuariosSemCadastroEmCliente(nomeEmail, pageable);
        return PageUtils.from(page);
    }

}
