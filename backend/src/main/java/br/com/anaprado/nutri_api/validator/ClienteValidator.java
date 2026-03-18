package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.exceptions.ClienteNaoEncontradoException;
import br.com.anaprado.nutri_api.exceptions.ClientePossuiDieta;
import br.com.anaprado.nutri_api.exceptions.DadosSendoUsadosEmOutroLugar;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.model.DadosCliente;
import br.com.anaprado.nutri_api.model.Dieta;
import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.repository.ClienteRepository;
import br.com.anaprado.nutri_api.repository.DadosRepository;
import br.com.anaprado.nutri_api.repository.DietaRepository;
import br.com.anaprado.nutri_api.repository.RefeicaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ClienteValidator {

    private final ClienteRepository clienteRepository;
    private final DadosRepository dadosRepository;
    private final DietaRepository dietaRepository;

    public void usuarioPossuiDadosDeCliente(Usuario usuario){
        boolean existeCliente = clienteRepository.existsByUsuario(usuario);
        if (existeCliente){
            throw new DadosSendoUsadosEmOutroLugar("Este usuário possui dados vinculados. Remova-os antes de excluir o usuário.");
        }
    }

    /**
     * Usado em:
     * - Puxar os dados do cliente para fazer o relatório, evitando vir nulo
     * */
    public Cliente usuarioTemClienteCadastrado(Usuario usuario){
        return clienteRepository.findByUsuario(usuario).orElseThrow(() -> new ClienteNaoEncontradoException("O cliente não foi encontrado no sistema!"));
    }

    // verifica se o cliente tem dados antropométricos cadastrados no banco
    public void clientePossuiDadosAntropometricos(UUID uuid) {
        Optional<DadosCliente> temDados = dadosRepository.findByCliente_ClienteId(uuid);

        if (temDados.isPresent()) {
            throw new DadosSendoUsadosEmOutroLugar("Esse cliente tem dados cadastrados. Remova-os antes de excluir o cliente.");
        }
    }

    public Cliente clienteExisteEntidade(UUID cliente_id) {
        return clienteRepository.findById(cliente_id).orElseThrow(() -> new ClienteNaoEncontradoException("Este cliente não foi encontado no banco de dados."));
    }

    public void clientePossuiDietaCadastrada(UUID cliente_id) {
        List<Dieta> temDieta = dietaRepository.findByCliente_ClienteId(cliente_id);

        if (!temDieta.isEmpty()) {
            throw new ClientePossuiDieta("O cliente possui dietas cadastradas");
        }
    }

    public Cliente buscarClientePorUsuario(Usuario usuario){
        return clienteRepository.findByUsuario(usuario).orElseThrow(() -> new ClienteNaoEncontradoException("Cliente não encontrado!"));
    }
}
