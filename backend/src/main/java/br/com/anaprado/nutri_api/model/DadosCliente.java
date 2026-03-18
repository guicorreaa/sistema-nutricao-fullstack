package br.com.anaprado.nutri_api.model;

import br.com.anaprado.nutri_api.model.enuns.FatorAtividade;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Data
@Entity
@Table(name = "dados_cliente")
public class DadosCliente {

    @Id
    @Column(name = "dados_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID dados_id;

    @Column(name = "dieta_atual")
    private String dieta_atual;

    @Column(name = "observacoes")
    private String observacoes;

    @Column(name = "altura")
    private Double altura;

    @Column(name = "fuma")
    private Boolean fuma;

    @Column(name = "frequencia_fuma")
    private String frequencia_fuma;

    @Column(name = "consumo_agua_dia")
    private Double consumo_agua_dia;

    @Column(name = "antecedentes_familiar")
    private String antecedentes_familiar;

    @Column(name = "precisa_acompanhamento_especial")
    private boolean precisa_acompanhamento_especial;

    @Column(name = "tem_restricoes_alimentares")
    private boolean tem_restricoes_alimentares;

    @Column(name = "toma_medicamentos")
    private boolean toma_medicamentos;

    @Enumerated(EnumType.STRING)
    @Column(name = "fator_atividade_fisica")
    private FatorAtividade fator_atividade_fisica;

    @Column(name = "ultima_alteracao")
    private LocalDateTime ultima_alteracao;

    @OneToOne
    @JoinColumn(name = "cliente_id", unique = true, nullable = false)
    private Cliente cliente;

    @PrePersist
    @PreUpdate
    private void atualizarData() {
        this.ultima_alteracao = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));
    }
}
