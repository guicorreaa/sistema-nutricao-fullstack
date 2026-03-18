package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.config.PageUtils;
import br.com.anaprado.nutri_api.config.UserDetailsImpl;
import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.*;
import br.com.anaprado.nutri_api.controller.mappers.AntropometriaMapper;
import br.com.anaprado.nutri_api.controller.mappers.DadosMapper;
import br.com.anaprado.nutri_api.exceptions.AutenticacaoInvalida;
import br.com.anaprado.nutri_api.exceptions.DadosDoClienteNaoEncontradosException;
import br.com.anaprado.nutri_api.model.Antropometria;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.model.DadosCliente;
import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.repository.AntropometriaRepository;
import br.com.anaprado.nutri_api.repository.ClienteRepository;
import br.com.anaprado.nutri_api.repository.DadosRepository;
import br.com.anaprado.nutri_api.validator.ClienteValidator;
import br.com.anaprado.nutri_api.validator.DadosValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DadosService {

    private final DadosValidator dadosValidator;
    private final DadosRepository dadosRepository;
    private final DadosMapper dadosMapper;

    private final ClienteRepository clienteRepository;
    private final ClienteValidator clienteValidator;

    private final AntropometriaMapper antropometriaMapper;
    private final AntropometriaRepository antropometriaRepository;

    /**
     * Usado para cadastrar os dados antropométricos do cliente;
     * Verifica se cliente existe -> caso não vai lançar exeção;
     * Verifica se os dados antropométricos já foram cadastrados no sistema e caso sim, lança uma exceção
     *
     * Primeiro vai ser cadastrado os dados fixos do cliente (cadastro DadosCliente)
     * Logo em seguida vai ser cadastrado os dados que variam com o tempo e precisam de histórico (cadastro Antropometria)
     * */
    @Transactional
    public void criarCadastroInicial(UUID uuid, DadosRequestDTO dadosRequestDTO){
        Cliente cliente = clienteValidator.clienteExisteEntidade(uuid);
        dadosValidator.dadoAntropometricoExiste(cliente.getClienteId());

        DadosCliente dadosFixos = dadosMapper.toEntity(dadosRequestDTO, cliente);
        dadosRepository.save(dadosFixos);

        Antropometria dadosVariaveis = antropometriaMapper.toEntity(dadosRequestDTO, cliente);
        antropometriaRepository.save(dadosVariaveis);
    }

    public void editarDadosFixos(UUID dadoId, DadosEditarVariaveisFixasDTO dadosEditarVariaveisFixasDTO) {
        DadosCliente dados = dadosValidator.validarSeDadoAntropometricoExiste(dadoId);
        dadosMapper.updateEntityDTO(dadosEditarVariaveisFixasDTO, dados);
        dadosRepository.save(dados);
    }

    public DadosResponseAntopometriaDTO obterDadosAntopometricos() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()){
            throw new AutenticacaoInvalida("Autenticacao invalida!");
        }

        var userDatails = (UserDetailsImpl) authentication.getPrincipal();
        Usuario usuario = userDatails.getUsuario();
        Cliente cliente = clienteValidator.buscarClientePorUsuario(usuario);

        DadosResponseAntopometriaDTO dados = dadosRepository.dadosInterfaceCliente(cliente.getClienteId());

        if (dados == null) {
            throw new DadosDoClienteNaoEncontradosException("Dados do cliente não encontrados.");
        }

        return dados;
    }

    // preciso tentar trazer o nome na interface pegando direatamente pelos dados já criado, caso não tenha, não exibir nada
    public PageResponse<DadosResponseTabelaInformacoesDTO> preencherTabelaPrinipal(String nomeEmail, Pageable pageable){
        Page<DadosResponseTabelaInformacoesDTO> page = dadosRepository.clientesQueTemDados(nomeEmail, pageable);
        return PageUtils.from(page);
    }

    public void deletarDadoAntropometrico(UUID dadosId) {
        dadosValidator.validarSeDadoAntropometricoExiste(dadosId);
        dadosRepository.deleteById(dadosId);
    }

    public DadosResponseTodosDadosDTO obterDadosCompletoUnicoCliente(UUID id) {
        DadosCliente dados = dadosValidator.validarSeDadoAntropometricoExiste(id);
        return dadosRepository.visualizarDadosCliente(dados.getDados_id());
    }
}
