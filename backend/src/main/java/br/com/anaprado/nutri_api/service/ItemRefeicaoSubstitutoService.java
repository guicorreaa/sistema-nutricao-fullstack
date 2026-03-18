package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.controller.dto.ItemRefeicaoSubstituto.CadastrarItemRefeicaoDoSubstitutoDTO;
import br.com.anaprado.nutri_api.controller.dto.ItemRefeicaoSubstituto.ItemRefeicaoRelatorioDTO;
import br.com.anaprado.nutri_api.controller.dto.ItemRefeicaoSubstituto.ObterRefeicaoComOpcionaisDTO;
import br.com.anaprado.nutri_api.controller.mappers.ItemRefeicaoSubstitutoMapper;
import br.com.anaprado.nutri_api.model.Alimentos;
import br.com.anaprado.nutri_api.model.ItemRefeicao;
import br.com.anaprado.nutri_api.model.ItemRefeicaoSubstituto;
import br.com.anaprado.nutri_api.repository.ItemRefeicaoRepository;
import br.com.anaprado.nutri_api.repository.ItemRefeicaoSubstitutoRepository;
import br.com.anaprado.nutri_api.validator.AlimentosValidator;
import br.com.anaprado.nutri_api.validator.ItemRefeicaoSubstitutoValidator;
import br.com.anaprado.nutri_api.validator.ItemRefeicaoValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailParseException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ItemRefeicaoSubstitutoService {

    private final ItemRefeicaoValidator itemRefeicaoValidator;
    private final AlimentosValidator alimentosValidator;
    private final ItemRefeicaoSubstitutoValidator itemRefeicaoSubstitutoValidator;

    private final ItemRefeicaoSubstitutoMapper itemRefeicaoSubstitutoMapper;

    private final ItemRefeicaoRepository itemRefeicaoRepository;
    private final ItemRefeicaoSubstitutoRepository itemRefeicaoSubstitutoRepository;

    @Transactional
    public void cadastrarAlimentoSubstituto(CadastrarItemRefeicaoDoSubstitutoDTO dto) {

        // 1️⃣ Validações de existência de dados básicos
        ItemRefeicao itemPrincipal = itemRefeicaoValidator.verificarItemRefeicaoExiste(dto.idItemPrincipal());
        Alimentos alimentoSubstituto = alimentosValidator.alimentoExiste(dto.idAlimentoSubstituto());

        // 2️⃣ Validação de Regra de Negócio (Hierarquia e Duplicidade)
        // Passamos o ID do alimento que vem do DTO para checar duplicidade antes de criar o item
        itemRefeicaoSubstitutoValidator.validarRegrasSubstituicao(
                itemPrincipal.getId_item_refeicao(),
                dto.idAlimentoSubstituto()
        );

        // 3️⃣ Se passou na validação, agora sim criamos o registro transiente
        ItemRefeicao itemSubstituto = itemRefeicaoSubstitutoMapper.cadastrarItemRefeicaoToEntity(
                dto,
                alimentoSubstituto,
                itemPrincipal.getRefeicao()
        );

        // 4️⃣ Salva o novo item para ganhar um UUID
        itemRefeicaoRepository.save(itemSubstituto);

        // 5️⃣ Cria e salva a relação entre o principal e o novo substituto
        ItemRefeicaoSubstituto relacao = itemRefeicaoSubstitutoMapper.cadastrarSubstituto(itemPrincipal, itemSubstituto);
        itemRefeicaoSubstitutoRepository.save(relacao);
    }

    public List<ItemRefeicaoRelatorioDTO> gerarRelatorio(UUID refeicao_id) {
        List<ObterRefeicaoComOpcionaisDTO> itens = itemRefeicaoSubstitutoRepository.buscarItensComSubstitutos(refeicao_id);

        // LinkedHashMap -> vai garantir a ordem de iserção
        Map<UUID, ItemRefeicaoRelatorioDTO> mapaItens = new LinkedHashMap<>();

        // HashSet -> não tem duplicados
        Set<UUID> itensComoSubstituto = new HashSet<>();

        // Monta itens principais e substitutos
        for (ObterRefeicaoComOpcionaisDTO dto : itens) {
            // Cria ou pega o item principal
            ItemRefeicaoRelatorioDTO item = mapaItens.computeIfAbsent(
                    dto.itemPrincipalId(),
                    chave -> new ItemRefeicaoRelatorioDTO(
                            chave,
                            dto.alimentoPrincipalNome(),
                            dto.qtdPrincipal(),
                            dto.kcalPrincipal(),
                            dto.carbPrincipal(),
                            dto.proteinaPrincipal(),
                            dto.lipidiosPrincipal()
                    )
            );

            // Adiciona substituto, se houver
            if (dto.alimentoSubstitutoNome() != null) {
                ItemRefeicaoRelatorioDTO sub = new ItemRefeicaoRelatorioDTO(
                        dto.itemSubstitutoId() != null ? dto.itemSubstitutoId() : UUID.randomUUID(),
                        dto.alimentoSubstitutoNome(),
                        dto.qtdSubstituto(),
                        dto.kcalSubstituto(),
                        dto.carbSubstituto(),
                        dto.proteinaSubstituto(),
                        dto.lipidiosSubstituto()
                );
                item.addSubstituto(sub);

                // Marca que esse item já apareceu como substituto
                itensComoSubstituto.add(sub.getItemId());
            }
        }

        // Remove do mapa principal os itens que são substitutos de outros
        mapaItens.keySet().removeAll(itensComoSubstituto);

        // Retorna a lista hierárquica final
        return new ArrayList<>(mapaItens.values());
    }

}


