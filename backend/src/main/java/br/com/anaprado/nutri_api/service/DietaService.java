package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.controller.dto.Dieta.CadastrarDietaDTO;
import br.com.anaprado.nutri_api.controller.dto.Dieta.EditarDietaDTO;
import br.com.anaprado.nutri_api.controller.dto.Dieta.ObterDietaEspecificaDTO;
import br.com.anaprado.nutri_api.controller.dto.Dieta.ObterNomesDietasDTO;
import br.com.anaprado.nutri_api.controller.mappers.DietaMapper;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.model.Dieta;
import br.com.anaprado.nutri_api.repository.DietaRepository;
import br.com.anaprado.nutri_api.validator.ClienteValidator;
import br.com.anaprado.nutri_api.validator.DietaValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DietaService {

    private final DietaRepository dietaRepository;
    private final DietaValidator dietaValidator;
    private final DietaMapper dietaMapper;

    private final ClienteValidator clienteValidator;

    public void cadastrarNovaDieta(CadastrarDietaDTO cadastrarDietaDTO) {
        Cliente clienteEncontrado = clienteValidator.clienteExisteEntidade(cadastrarDietaDTO.cliente_id());

        Dieta entidade = dietaMapper.cadastrarToEntity(cadastrarDietaDTO);
        entidade.setCliente(clienteEncontrado);
        dietaRepository.save(entidade);
    }

    public List<ObterDietaEspecificaDTO> obterDietasClienteEspecifico(UUID clienteId) {
        Cliente clienteExiste = clienteValidator.clienteExisteEntidade(clienteId);
        return dietaRepository.findAllDietasClienteEspecifico(clienteExiste.getClienteId());
    }

    public List<ObterNomesDietasDTO> obterNomeDasDietas(UUID clienteId) {
        clienteValidator.clienteExisteEntidade(clienteId); // arrumar aqui, buscando duas vezes
        return dietaRepository.findAllNomesDietas(clienteId);
    }

    public void excluirDieta(UUID dietaId) {
        Dieta dietaExistente = dietaValidator.verificarSeDietaExiste(dietaId);
        dietaRepository.delete(dietaExistente);
    }

    public void editarDieta(UUID dietaId, EditarDietaDTO editarDietaDTO) {
        Dieta dietaExistente = dietaValidator.verificarSeDietaExiste(dietaId);

        dietaMapper.editarToEntity(editarDietaDTO, dietaExistente);
        dietaRepository.save(dietaExistente);
    }
}
