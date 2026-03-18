package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.controller.dto.Relatorio.ObterAntropometriaCompletaDTO;
import br.com.anaprado.nutri_api.exceptions.AntropometriaNaoEncontradaException;
import br.com.anaprado.nutri_api.repository.AntropometriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AntropometriaValidator {

    private final AntropometriaRepository antropometriaRepository;

    public ObterAntropometriaCompletaDTO verificarSeExisteAntropometria(UUID clienteId) {
        return antropometriaRepository.findAntropometriaClientId(clienteId).orElseThrow(() -> new AntropometriaNaoEncontradaException("Nenhuma antropometria encontrada!"));
    }

}
