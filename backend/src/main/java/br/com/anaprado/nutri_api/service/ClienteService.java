package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.config.PageUtils;
import br.com.anaprado.nutri_api.config.UserDetailsImpl;
import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import br.com.anaprado.nutri_api.controller.dto.cliente.*;
import br.com.anaprado.nutri_api.controller.mappers.ClienteMapper;
import br.com.anaprado.nutri_api.exceptions.AutenticacaoInvalida;
import br.com.anaprado.nutri_api.exceptions.ClienteNaoEncontradoException;
import br.com.anaprado.nutri_api.exceptions.UsuarioJaCadastradoEmCliente;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.repository.ClienteRepository;
import br.com.anaprado.nutri_api.validator.ClienteValidator;
import br.com.anaprado.nutri_api.validator.RefeicaoValidator;
import br.com.anaprado.nutri_api.validator.UsuarioValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;
    private final ClienteValidator clienteValidator;

    private final UsuarioValidator usuarioValidator;
    private final RefeicaoValidator refeicaoValidator;

    @Transactional
    public void cadastrarCliente(UUID usuario_id, ClienteRequestDTO dto) {
        Usuario usuario = usuarioValidator.verificarSeUsuarioExiste(usuario_id);

        Cliente cliente = clienteRepository.findByUsuario(usuario).orElse(null);

        if (cliente == null) {
            cliente = clienteMapper.toEntity(dto, usuario);
            cliente.setUltimaAlteracao(LocalDateTime.now(ZoneId.of("America/Sao_Paulo")));
            clienteRepository.save(cliente);
        } else {
            throw new UsuarioJaCadastradoEmCliente("O usuario já tem cadastro dentro de cliente");
        }
    }

    public ClienteResponsePerfilDTO obterPerfilCliente() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()){
            throw new AutenticacaoInvalida("Autenticacao invalida!");
        }

        var userDatails = (UserDetailsImpl) authentication.getPrincipal();
        Usuario usuario = userDatails.getUsuario();

        ClienteResponsePerfilDTO dto = clienteMapper.clientePerfilToDTO(clienteRepository.findByUsuario(usuario).orElseThrow(() -> new ClienteNaoEncontradoException("O cliente não foi encontrado")));

        return dto;
    }

    public PageResponse<ClienteResponseDTO> obterTodosClientesCompleto(String nome, Pageable pageable){
        Page<ClienteResponseDTO> page = clienteRepository.findAllClienteCompleto(nome, pageable);
        return PageUtils.from(page);
    }

    public void deletarCliente(UUID clienteId) {
        Cliente cliente = clienteValidator.clienteExisteEntidade(clienteId);
        clienteValidator.clientePossuiDadosAntropometricos(clienteId);
        clienteValidator.clientePossuiDietaCadastrada(clienteId);
        refeicaoValidator.verificarSeClienteTemRefeicao(clienteId);
        clienteRepository.delete(cliente);
    }

    public PageResponse<ClienteResponseDadosTabelaEscolhaDTO> obterTodosClientesSimplificado(String nomeEmail,
                                                                                             Pageable pageable) {
        Page<ClienteResponseDadosTabelaEscolhaDTO> page = clienteRepository.findAllClientesSimples(nomeEmail, pageable);
        return PageUtils.from(page);
    }

    public PageResponse<ClienteResponseDadosTabelaEscolhaDTO> obterClientesSemDadosAntropometricos(String nomeEmail,
                                                                                           Pageable pageable) {
        Page<ClienteResponseDadosTabelaEscolhaDTO> page = clienteRepository.findAllClienteSemDados(nomeEmail, pageable);
        return PageUtils.from(page);
    }

    public void editarCliente(UUID clienteId, EditarClienteDTO editarClienteDTO) {
        Cliente clienteExiste = clienteValidator.clienteExisteEntidade(clienteId);

        Cliente entidade = clienteMapper.updateEntityDTO(editarClienteDTO, clienteExiste);
        clienteRepository.save(entidade);
    }
}
