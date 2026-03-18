package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.exceptions.ClientePossuiRefeicaoCadastradaException;
import br.com.anaprado.nutri_api.exceptions.RefeicaoNaoEncontradaException;
import br.com.anaprado.nutri_api.exceptions.TipoRefeicaoNaoEncontradoException;
import br.com.anaprado.nutri_api.model.Refeicao;
import br.com.anaprado.nutri_api.model.TipoRefeicao;
import br.com.anaprado.nutri_api.repository.RefeicaoRepository;
import br.com.anaprado.nutri_api.repository.TipoRefeicaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class RefeicaoValidator {

    private final RefeicaoRepository refeicaoRepository;
    private final TipoRefeicaoRepository tipoRefeicaoRepository;

    public TipoRefeicao verificarSeTipoRefeicaoExiste(Integer tipo_id) {
        return tipoRefeicaoRepository.findById(tipo_id).orElseThrow(() -> new TipoRefeicaoNaoEncontradoException("Não foi encontrado o tipo de refeição."));
    }

    public Refeicao verificarSeRefeicaoExiste(UUID refeicao_id) {
        return refeicaoRepository.findById(refeicao_id).orElseThrow(() -> new RefeicaoNaoEncontradaException("Refeição não encontrada."));
    }

    public void verificarSeClienteTemRefeicao(UUID clienteId) {
        boolean existe = refeicaoRepository.verificarSeClienteTemRefeicao(clienteId);
        if (existe) {
            throw new ClientePossuiRefeicaoCadastradaException("O cliente possui refeição cadastrada!");
        }
    }

}
