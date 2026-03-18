-- Script para popular a tabela de alimentos a partir da Tabela TACO (CSV)
-- Passo 1: O arquivo CSV deve ser copiado para o container:
-- docker cp ./TabelaTacoPronta.csv id_container:/tmp/alimentos.csv

COPY public.alimentos(
    alimento_id, nome_alimento, umidade, energia_kcal, energia_kj, proteina, lipidios, colesterol, carboidrato,
    fibra_alimentar, calcio, magnesio, manganes, fosforo, ferro, sodio, potassio, cobre, zinco, retinol,
    vitamina_a_re, vitamina_a_rae, tiamina, riboflavina, piridoxina, niacina, vitamina_c, categoria, subcategoria,
    criado_por_usuario, ativo
    )
    FROM '/tmp/alimentos.csv'
    WITH (
    FORMAT csv,
    DELIMITER ';',
    ENCODING 'LATIN1',
    HEADER true,
    QUOTE '"',
    ESCAPE '''',
    NULL '\N'
    );