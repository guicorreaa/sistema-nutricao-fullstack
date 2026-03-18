package br.com.anaprado.nutri_api.model.enuns;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum FatorAtividade {
    SEDENTARIO(1.2, "Sedentário"),
    LEVEMENTE_ATIVO(1.56, "Levemente ativo"),
    MODERADAMENTE_ATIVO(1.64, "Moderadamente ativo"),
    MUITO_ATIVO(1.82, "Muito ativo");

    private final double valor;
    private final String descricao;

    @JsonProperty("chave")
    public String getChave() {
        return this.name();
    }

    // Esse método garante que o Spring aceite tanto o objeto quanto a String no POST
    @JsonCreator
    public static FatorAtividade fromString(String value) {
        for (FatorAtividade fa : FatorAtividade.values()) {
            if (fa.name().equalsIgnoreCase(value)) {
                return fa;
            }
        }
        return null;
    }
}