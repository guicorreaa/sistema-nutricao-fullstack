package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosFixosResponseDTO;
import br.com.anaprado.nutri_api.exceptions.ClienteNaoEncontradoException;
import br.com.anaprado.nutri_api.exceptions.DadoAntropometricoDoClienteJaExiste;
import br.com.anaprado.nutri_api.exceptions.DadoAntropometricoNaoEncontrado;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.model.DadosCliente;
import br.com.anaprado.nutri_api.repository.ClienteRepository;
import br.com.anaprado.nutri_api.repository.DadosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DadosValidator {

    private final ClienteRepository clienteRepository;
    private final DadosRepository dadosRepository;

    public DadosCliente validarSeDadoAntropometricoExiste(UUID dadosId) {
        return dadosRepository.findById(dadosId).orElseThrow( () -> new DadoAntropometricoNaoEncontrado("Dado antropométrico não foi encontrado no sistema."));
    }

    public DadosFixosResponseDTO validarSeDadoAntropometricoExistePeloCliente(UUID clienteId) {
        return dadosRepository.findDadosFixosCliente(clienteId).orElseThrow(() -> new DadoAntropometricoNaoEncontrado("Não foi encontrado os dados fixos!"));
    }

    public void dadoAntropometricoExiste(UUID dadosId) {
        Optional<DadosCliente> existeDados = dadosRepository.findByCliente_ClienteId(dadosId);

        if (existeDados.isPresent()) {
            throw new DadoAntropometricoDoClienteJaExiste("Dado antropométrico do cliente já cadastrado.");
        }
    }

}
