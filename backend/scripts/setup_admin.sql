-- Script para criar o usuário administrador inicial
-- Nota: A senha abaixo corresponde ao hash BCrypt de uma senha segura.
INSERT INTO usuario (
    usuario_id, email, senha, role, ativo, telefone, data_creation
) VALUES (
             gen_random_uuid(),
             'admin@exemplo.com',
             '$*******.****************.*********************',
             'ROLE_ADMIN',
             true,
             '19999999999',
             NOW()
         ) ON CONFLICT (email) DO NOTHING;