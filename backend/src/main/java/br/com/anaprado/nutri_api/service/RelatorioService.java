package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.controller.dto.Relatorio.Historico.HistoricoCompletoAntropometricoDTO;
import br.com.anaprado.nutri_api.controller.dto.Relatorio.ObterAntropometriaCompletaDTO;
import br.com.anaprado.nutri_api.controller.dto.Relatorio.RelatorioCompletoDTO;
import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosFixosResponseDTO;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.model.DadosCliente;
import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.repository.AntropometriaRepository;
import br.com.anaprado.nutri_api.validator.AntropometriaValidator;
import br.com.anaprado.nutri_api.validator.ClienteValidator;
import br.com.anaprado.nutri_api.validator.DadosValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RelatorioService {

    private final DadosValidator dadosValidator;
    private final AntropometriaRepository antropometriaRepository;
    private final AntropometriaValidator antropometriaValidator;
    private final ClienteValidator clienteValidator;

    public Integer calcularIdade(LocalDate dataNascimento) {
        if (dataNascimento == null) {
            return null;
        }
        return Period.between(dataNascimento, LocalDate.now()).getYears();
    }

    public RelatorioCompletoDTO gerarRelatorioCompletoAdmin(UUID dadoId) {
        DadosCliente dadosFixos = dadosValidator.validarSeDadoAntropometricoExiste(dadoId);
        Cliente cliente = dadosFixos.getCliente();
        ObterAntropometriaCompletaDTO ultimaAntropometria = antropometriaValidator.verificarSeExisteAntropometria(cliente.getClienteId());
        List<HistoricoCompletoAntropometricoDTO> historicoAntropometria = antropometriaRepository.findHistoricoByClienteId(cliente.getClienteId());

        Integer idade = null;
        idade = calcularIdade(cliente.getDataNascimento());

        return new RelatorioCompletoDTO(
                // Dados de cliente
                cliente.getNome(),
                cliente.getDataNascimento(),
                cliente.getSexo(),
                cliente.getObjetivoNutricional(),
                idade,

                // Dados antropométricos fixos
                dadosFixos.getDados_id(),
                dadosFixos.getObservacoes(),
                dadosFixos.getAltura(),
                dadosFixos.getFuma(),
                dadosFixos.getFrequencia_fuma(),
                dadosFixos.getConsumo_agua_dia(),
                dadosFixos.getAntecedentes_familiar(),
                dadosFixos.isPrecisa_acompanhamento_especial(),
                dadosFixos.isTem_restricoes_alimentares(),
                dadosFixos.isToma_medicamentos(),
                dadosFixos.getFator_atividade_fisica(),
                dadosFixos.getUltima_alteracao(),

                // Dados antropométricos variaveis
                ultimaAntropometria.peso(),
                ultimaAntropometria.circBraco(),
                ultimaAntropometria.circPanturrilha(),
                ultimaAntropometria.circCintura(),
                ultimaAntropometria.circQuadril(),
                ultimaAntropometria.dobraCutaneaTriceps(),
                ultimaAntropometria.dobraCutaneaBiceps(),
                ultimaAntropometria.dobraCutaneaEscapular(),
                ultimaAntropometria.dobraCutaneaIliaca(),

                // Historico completo antropometria variavel
                historicoAntropometria


        );
    }

    public RelatorioCompletoDTO gerarRelatorioCompletoParaCliente(Usuario usuario) {
        // Verificar e pegar os dados de cliente cadastrado
        Cliente clienteExtiste = clienteValidator.usuarioTemClienteCadastrado(usuario);

        DadosFixosResponseDTO dadosFixos = dadosValidator.validarSeDadoAntropometricoExistePeloCliente(clienteExtiste.getClienteId());
        ObterAntropometriaCompletaDTO ultimaAntropometria = antropometriaValidator.verificarSeExisteAntropometria(clienteExtiste.getClienteId());
        List<HistoricoCompletoAntropometricoDTO> historicoAntropometria = antropometriaRepository.findHistoricoByClienteId(clienteExtiste.getClienteId());

        Integer idade = null;
        idade = calcularIdade(clienteExtiste.getDataNascimento());

        return new RelatorioCompletoDTO(
                // Dados de cliente
                clienteExtiste.getNome(),
                clienteExtiste.getDataNascimento(),
                clienteExtiste.getSexo(),
                clienteExtiste.getObjetivoNutricional(),
                idade,

                // Dados antropométricos fixos
                dadosFixos.dados_id(),
                dadosFixos.observacoes(),
                dadosFixos.altura(),
                dadosFixos.fuma(),
                dadosFixos.frequencia_fuma(),
                dadosFixos.consumo_agua_dia(),
                dadosFixos.antecedentes_familiar(),
                dadosFixos.precisa_acompanhamento_especial(),
                dadosFixos.tem_restricoes_alimentares(),
                dadosFixos.toma_medicamentos(),
                dadosFixos.fator_atividade_fisica(),
                dadosFixos.ultima_alteracao(),

                // Dados antropométricos variaveis
                ultimaAntropometria.peso(),
                ultimaAntropometria.circBraco(),
                ultimaAntropometria.circPanturrilha(),
                ultimaAntropometria.circCintura(),
                ultimaAntropometria.circQuadril(),
                ultimaAntropometria.dobraCutaneaTriceps(),
                ultimaAntropometria.dobraCutaneaBiceps(),
                ultimaAntropometria.dobraCutaneaEscapular(),
                ultimaAntropometria.dobraCutaneaIliaca(),

                // Historico completo antropometria variavel
                historicoAntropometria
        );

    }
}
