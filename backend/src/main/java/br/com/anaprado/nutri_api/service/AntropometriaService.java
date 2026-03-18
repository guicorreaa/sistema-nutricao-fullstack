package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.controller.dto.Antropometria.AntropometriaCadastrarDTO;
import br.com.anaprado.nutri_api.controller.mappers.AntropometriaMapper;
import br.com.anaprado.nutri_api.model.Antropometria;
import br.com.anaprado.nutri_api.model.DadosCliente;
import br.com.anaprado.nutri_api.repository.AntropometriaRepository;
import br.com.anaprado.nutri_api.validator.DadosValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AntropometriaService {

    private final DadosValidator dadosValidator;
    private final AntropometriaMapper antropometriaMapper;
    private final AntropometriaRepository antropometriaRepository;

    /**
     * Cadastrar novo dado antropométrico (tabela com histórico)
     * Verificar se os dados fixos existem antes de cadastrar
     * */
    @Transactional
    public void novaAntropometria(UUID dadoId, AntropometriaCadastrarDTO antropometriaCadastrarDTO){
        DadosCliente dadoFixoExistente = dadosValidator.validarSeDadoAntropometricoExiste(dadoId);
        Antropometria novaAntropometria = antropometriaMapper.toEntityNovoHistorico(antropometriaCadastrarDTO, dadoFixoExistente.getCliente());
        antropometriaRepository.save(novaAntropometria);
    }

}
