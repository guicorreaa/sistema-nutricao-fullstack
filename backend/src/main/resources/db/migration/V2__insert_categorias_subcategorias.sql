INSERT INTO categoria (categoria_id, descricao, ativo)
VALUES (1, 'Cereais e Derivados', TRUE),
       (2, 'Verduras, Hortaliças e Algas', TRUE),
       (3, 'Frutas e Derivados', TRUE),
       (4, 'Leguminosas e Oleaginosas', TRUE),
       (5, 'Tubérculos e Raízes', TRUE),
       (6, 'Carnes e Derivados', TRUE),
       (7, 'Leite e Derivados', TRUE),
       (8, 'Ovos e Derivados', TRUE),
       (9, 'Pescados e Frutos do Mar', TRUE),
       (10, 'Açúcares e Doces', TRUE),
       (11, 'Gorduras e Óleos', TRUE),
       (12, 'Bebidas (Alcoólicas e Não Alcoólicas)', TRUE),
       (13, 'Condimentos, Molhos e Miscelâneas', TRUE);

INSERT INTO subcategoria (subcategoria_id, descricao, categoria_id, ativo)
VALUES
-- Cereais e Massas (Cat 1)
(10, 'Arroz', 1, true),
(11, 'Aveia', 1, true),
(30, 'Cereais diversos', 1, true),
(31, 'Cereal matinal', 1, true),
(43, 'Farinhas', 1, true),
(67, 'Massas e Macarrão', 1, true),
(70, 'Milho e derivados', 1, true),
(75, 'Pães e Torradas', 1, true),

-- Verduras e Hortaliças (Cat 2)
(1, 'Abóboras', 2, true),
(2, 'Abobrinhas', 2, true),
(8, 'Alfaces', 2, true),
(16, 'Berinjelas', 2, true),
(17, 'Beterrabas', 2, true),
(21, 'Brócolis e Couve-flor', 2, true),
(95, 'Hortaliças Folhosas', 2, true),

-- Frutas (Cat 3)
(50, 'Frutas in natura', 3, true),
(52, 'Geléias de Frutas', 3, true),

-- Leguminosas (Cat 4)
(9, 'Amendoim e Oleaginosas', 4, true),
(42, 'Ervilha', 4, true),
(45, 'Feijão', 4, true),
(64, 'Lentilha', 4, true),
(92, 'Soja', 4, true),

-- Tubérculos e Raízes (Cat 5 - Nova!)
(13, 'Batatas', 5, true),
(88, 'Raízes e Tubérculos (Mandioca/Inhame)', 5, true),

-- Carnes (Cat 6)
(28, 'Carne bovina', 6, true),
(48, 'Frango e Aves', 6, true),
(80, 'Porco / Suínos', 6, true),
(49, 'Frios e Embutidos', 6, true),

-- Leite e Derivados (Cat 7)
(15, 'Bebida láctea', 7, true),
(37, 'Creme de leite', 7, true),
(57, 'Iogurte', 7, true),
(60, 'Leite', 7, true),
(61, 'Leite condensado', 7, true),
(82, 'Queijos em Geral', 7, true),
(86, 'Requeijão', 7, true),

-- Ovos (Cat 8)
(73, 'Ovo integral', 8, true),
(36, 'Clara / Gema', 8, true),

-- Pescados (Cat 9)
(78, 'Peixes', 9, true),
(39, 'Crustáceos e Frutos do Mar', 9, true),

-- Açúcares e Doces (Cat 10)
(3, 'Achocolatados', 10, true),
(4, 'Açúcar branco/mascavo', 10, true),
(20, 'Bolos e Tortas Doce', 10, true),
(35, 'Chocolates', 10, true),
(18, 'Biscoitos Doces', 10, true),
(68, 'Mel e Melado', 10, true),

-- Gorduras (Cat 11)
(71, 'Óleos Vegetais', 11, true),
(66, 'Margarinas e Manteigas', 11, true),
(54, 'Banha e Gordura Animal', 11, true),
(65, 'Maionese', 11, true),

-- Bebidas (Cat 12)
(6, 'Água de coco', 12, true),
(23, 'Café e Infusões', 12, true),
(32, 'Cervejas e Alcoólicos', 12, true),
(33, 'Chás', 12, true),
(89, 'Refrigerantes', 12, true),

-- Condimentos e Miscelâneas (Cat 13)
(90, 'Sal de Cozinha', 13, true),
(91, 'Shoyu e Molhos Salgados', 13, true),
(41, 'Ervas e Especiarias', 13, true),
(25, 'Caldos Concentrados / Temperos', 13, true),
(46, 'Fermentos e Aditivos', 13, true);