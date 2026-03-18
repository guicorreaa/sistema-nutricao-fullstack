package br.com.anaprado.nutri_api.controller.dto.ItemRefeicaoSubstituto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ItemRefeicaoRelatorioDTO {

    private UUID itemId;
    private String nomeAlimento;
    private BigDecimal quantidade;
    private BigDecimal kcal;
    private BigDecimal carboidrato;
    private BigDecimal proteina;
    private BigDecimal lipidios;

    private List<ItemRefeicaoRelatorioDTO> substitutos = new ArrayList<>();

    // Construtor
    public ItemRefeicaoRelatorioDTO(UUID itemId, String nomeAlimento, BigDecimal quantidade,
                                    BigDecimal kcal, BigDecimal carboidrato,
                                    BigDecimal proteina, BigDecimal lipidios) {
        this.itemId = itemId;
        this.nomeAlimento = nomeAlimento;
        this.quantidade = quantidade;
        this.kcal = kcal;
        this.carboidrato = carboidrato;
        this.proteina = proteina;
        this.lipidios = lipidios;
    }

    // Getters e Setters
    public UUID getItemId() { return itemId; }
    public String getNomeAlimento() { return nomeAlimento; }
    public BigDecimal getQuantidade() { return quantidade; }
    public BigDecimal getKcal() { return kcal; }
    public BigDecimal getCarboidrato() { return carboidrato; }
    public BigDecimal getProteina() { return proteina; }
    public BigDecimal getLipidios() { return lipidios; }
    public List<ItemRefeicaoRelatorioDTO> getSubstitutos() { return substitutos; }

    public void addSubstituto(ItemRefeicaoRelatorioDTO sub) {
        this.substitutos.add(sub);
    }


}
