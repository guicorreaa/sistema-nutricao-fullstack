package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.exceptions.AlimentoNaoEncontradoException;
import br.com.anaprado.nutri_api.model.Alimentos;
import br.com.anaprado.nutri_api.repository.AlimentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlimentosValidator {

    private final AlimentoRepository alimentoRepository;

    public Alimentos alimentoExiste(Integer alimento_id) {
        return alimentoRepository.findById(alimento_id).orElseThrow(() -> new AlimentoNaoEncontradoException("O alimento não foi encontrado."));
    }

}
