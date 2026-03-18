package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.exceptions.DietaNaoEncontradaException;
import br.com.anaprado.nutri_api.model.Dieta;
import br.com.anaprado.nutri_api.repository.DietaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DietaValidator {

    private final DietaRepository dietaRepository;

    public Dieta verificarSeDietaExiste(UUID dieta_id) {
        return dietaRepository.findById(dieta_id).orElseThrow(() -> new DietaNaoEncontradaException("Dieta não encontrada."));
    }

}
