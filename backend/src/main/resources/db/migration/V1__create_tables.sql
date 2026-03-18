CREATE TABLE usuario
(
    usuario_id   UUID PRIMARY KEY    NOT NULL,
    email        VARCHAR(150) UNIQUE NOT NULL,
    senha        VARCHAR(350),
    role         VARCHAR(50)         NOT NULL,
    ativo        BOOLEAN             NOT NULL DEFAULT true,
    data_criacao TIMESTAMP           NOT NULL DEFAULT NOW(),
    telefone     VARCHAR(20)         NOT NULL
);

CREATE TABLE cliente
(
    cliente_id             UUID PRIMARY KEY,
    nome                   VARCHAR(150) NOT NULL,
    data_nascimento           DATE      NOT NULL,
    sexo                   VARCHAR(1)   NOT NULL,
    objetivo_nutricional   VARCHAR(100) NOT NULL,
    ultima_alteracao       TIMESTAMP DEFAULT NOW(),
    usuario_id             UUID UNIQUE  NOT NULL REFERENCES usuario (usuario_id)
);

CREATE TABLE dados_cliente
(
    dados_id                        UUID PRIMARY KEY,

    dieta_atual                     VARCHAR(2000),
    observacoes                     VARCHAR(1000),

    altura                          NUMERIC(5,2),

    fuma                            BOOLEAN   NOT NULL,
    frequencia_fuma                 VARCHAR(80),

    consumo_agua_dia                NUMERIC(7,2),

    antecedentes_familiar           VARCHAR(400),

    precisa_acompanhamento_especial BOOLEAN   NOT NULL DEFAULT false,
    tem_restricoes_alimentares      BOOLEAN   NOT NULL DEFAULT false,
    toma_medicamentos               BOOLEAN   NOT NULL DEFAULT false,

    fator_atividade_fisica          VARCHAR(50),

    ultima_alteracao                TIMESTAMP NOT NULL DEFAULT NOW(),

    cliente_id                      UUID      NOT NULL UNIQUE,
    CONSTRAINT fk_dados_cliente_cliente
        FOREIGN KEY (cliente_id)
            REFERENCES cliente (cliente_id)
);

CREATE TABLE antropometria
(
    antropometria_id        UUID PRIMARY KEY,

    peso                    NUMERIC(5, 2),

    circ_braco              NUMERIC(5, 2),
    circ_panturrilha        NUMERIC(5, 2),
    circ_cintura            NUMERIC(5, 2),
    circ_quadril            NUMERIC(5, 2),

    dobra_cutanea_triceps   NUMERIC(5, 2),
    dobra_cutanea_biceps    NUMERIC(5, 2),
    dobra_cutanea_escapular NUMERIC(5, 2),
    dobra_cutanea_iliaca    NUMERIC(5, 2),

    data_avaliacao          TIMESTAMP NOT NULL DEFAULT NOW(),

    observacoes             VARCHAR(1000),

    cliente_id              UUID      NOT NULL,

    CONSTRAINT fk_antropometria_cliente
        FOREIGN KEY (cliente_id)
            REFERENCES cliente (cliente_id)
);



CREATE TABLE usuario_token
(
    id         UUID PRIMARY KEY,
    usuario_id UUID         NOT NULL,
    token      VARCHAR(255) NOT NULL,
    expiracao  TIMESTAMP    NOT NULL,
    FOREIGN KEY (usuario_id)
        REFERENCES usuario (usuario_id)
);

CREATE TABLE agenda
(
    consulta_id          UUID PRIMARY KEY NOT NULL,
    nome                 VARCHAR(255)     NOT NULL,
    celular              VARCHAR(20)      NOT NULL,
    telefone             VARCHAR(20),
    email                VARCHAR(255),
    data_consulta        DATE             NOT NULL,
    horario_consulta     TIME             NOT NULL,
    tipo_consulta        VARCHAR(500)     NOT NULL,
    data_agendamento     TIMESTAMP        NOT NULL,
    cancelamento_cliente BOOLEAN DEFAULT false,
    observacoes_consulta VARCHAR(2000)
);

CREATE TABLE categoria
(
    categoria_id SERIAL PRIMARY KEY,
    descricao    VARCHAR(100) NOT NULL,
    ativo        BOOLEAN DEFAULT TRUE
);

CREATE TABLE subcategoria
(
    subcategoria_id SERIAL PRIMARY KEY,
    descricao       VARCHAR(100) NOT NULL,
    categoria_id    INT          NOT NULL,
    ativo           BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_categoria
        FOREIGN KEY (categoria_id) REFERENCES categoria (categoria_id)
            ON DELETE CASCADE
);

CREATE TABLE dieta
(
    dieta_id    UUID PRIMARY KEY,
    cliente_id  UUID         NOT NULL REFERENCES cliente (cliente_id),
    nome_dieta  VARCHAR(255) NOT NULL,
    data_inicio TIMESTAMP,
    data_final  TIMESTAMP
);

CREATE TABLE tipo_refeicao
(
    tipo_id   SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    ativo     BOOLEAN      NOT NULL DEFAULT TRUE
);

CREATE TABLE refeicao
(
    refeicao_id   UUID PRIMARY KEY NOT NULL,
    horario       TIME             NOT NULL,
    dieta_id      UUID             NOT NULL,
    tipo_refeicao INT              NOT NULL,
    observacao    VARCHAR(500),

    CONSTRAINT fk_dieta
        FOREIGN KEY (dieta_id) REFERENCES dieta (dieta_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_tipo_refeicao
        FOREIGN KEY (tipo_refeicao) REFERENCES tipo_refeicao (tipo_id)
            ON DELETE CASCADE
);

CREATE TABLE alimentos
(
    alimento_id        SERIAL PRIMARY KEY,
    nome_alimento      VARCHAR(255) NOT NULL,
    umidade            NUMERIC(5, 2),
    energia_kcal       NUMERIC(6, 2),
    energia_kj         NUMERIC(6, 2),
    proteina           NUMERIC(5, 2),
    lipidios           NUMERIC(5, 2),
    colesterol         NUMERIC(8, 2),
    carboidrato        NUMERIC(5, 2),
    fibra_alimentar    NUMERIC(5, 2),
    calcio             NUMERIC(6, 2),
    magnesio           NUMERIC(6, 2),
    manganes           NUMERIC(6, 2),
    fosforo            NUMERIC(6, 2),
    ferro              NUMERIC(5, 2),
    sodio              NUMERIC(8, 2),
    potassio           NUMERIC(8, 2),
    cobre              NUMERIC(5, 2),
    zinco              NUMERIC(5, 2),
    retinol            NUMERIC(8, 2),
    vitamina_a_re      NUMERIC(8, 2),
    vitamina_a_rae     NUMERIC(8, 2),
    tiamina            NUMERIC(5, 2),
    riboflavina        NUMERIC(5, 2),
    piridoxina         NUMERIC(5, 2),
    niacina            NUMERIC(5, 2),
    vitamina_c         NUMERIC(5, 2),
    categoria          INT,
    subcategoria       INT,
    criado_por_usuario BOOLEAN DEFAULT FALSE,
    ativo              BOOLEAN DEFAULT TRUE
);

CREATE TABLE item_refeicao
(
    id_item_refeicao  UUID PRIMARY KEY,
    refeicao_id       UUID          NOT NULL,
    alimento_id       INT           NOT NULL,
    observacao        VARCHAR(500),
    quantidade_gramas NUMERIC(7, 2) NOT NULL,

    CONSTRAINT fk_refeicao
        FOREIGN KEY (refeicao_id) REFERENCES refeicao (refeicao_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_alimento
        FOREIGN KEY (alimento_id) REFERENCES alimentos (alimento_id)
            ON DELETE CASCADE
);

CREATE TABLE item_refeicao_substituicao
(
    id_substituicao    UUID PRIMARY KEY,

    item_principal_id  UUID NOT NULL,
    item_substituto_id UUID NOT NULL,

    CONSTRAINT fk_item_principal
        FOREIGN KEY (item_principal_id)
            REFERENCES item_refeicao (id_item_refeicao)
            ON DELETE CASCADE,

    CONSTRAINT fk_item_substituto
        FOREIGN KEY (item_substituto_id)
            REFERENCES item_refeicao (id_item_refeicao)
            ON DELETE CASCADE,

    CONSTRAINT uk_substituicao_unica
        UNIQUE (item_principal_id, item_substituto_id)
);
