# 🐳 Guia de Infraestrutura e Segurança (Docker Swarm)

Este guia documenta o passo a passo para a inicialização do ambiente, configuração de rede, gerenciamento de segredos (Secrets) e implantação de serviços utilizando **Docker Swarm** e **WSL2 (Ubuntu)**.

---

## 1. 🏗️ Inicialização do Cluster e Rede
O primeiro passo é transformar o nó atual em um Manager do Swarm e criar a rede de comunicação isolada para os serviços.

```bash
# Iniciar o docker swarm
docker swarm init

# Criar a rede em overlay
docker network create --driver overlay --attachable network-nutri

# Baixar Ubuntu para ter um subsistema e usar os comandos dentro dele (pois não pode usar o WSL que foi instalado no sistema para o docker)
wsl --install -d Ubuntu

# Após baixar o subsistema Ubuntu
# No docker Settings → Resources → WSL Integration
# Ative o toggle “Enable integration with my default WSL distro” ou marque especificamente a distro Ubuntu
# Clique em Apply & Restart.

# criar a pasta dentro do WSL
mkdir -p ./user/secrets

# Criar as secrets (usando WSL do subsistema)
echo -n "postgres" > ./user/secrets/postgres_user.txt
chmod 600 ./user/secrets/postgres_user.txt
docker secret create POSTGRES_USER ./user/secrets/postgres_user.txt
shred -u ./user/secrets/postgres_user.txt

echo -n "postgres" > ./user/secrets/postgres_password.txt
chmod 600 ./user/secrets/postgres_password.txt
docker secret create POSTGRES_PASSWORD ./user/secrets/postgres_password.txt
shred -u ./user/secrets/postgres_password.txt

echo -n "postgres" > ./user/secrets/pg_admin_password.txt
chmod 600 ./user/secrets/pg_admin_password.txt
docker secret create PGADMIN_DEFAULT_PASSWORD ./user/secrets/pg_admin_password.txt
shred -u ./user/secrets/pg_admin_password.txt

echo -n "smtp.gmail.com" > ./user/secrets/email_host.txt
chmod 600 ./user/secrets/email_host.txt
docker secret create EMAIL_HOST ./user/secrets/email_host.txt
shred -u ./user/secrets/email_host.txt

echo -n "" > ./user/secrets/email_password.txt
chmod 600 ./user/secrets/email_password.txt
docker secret create EMAIL_PASSWORD ./user/secrets/email_password.txt
shred -u ./user/secrets/email_password.txt

echo -n "587" > ./user/secrets/email_port.txt
chmod 600 ./user/secrets/email_port.txt
docker secret create EMAIL_PORT ./user/secrets/email_port.txt
shred -u ./user/secrets/email_port.txt

echo -n "gmail@gmail.com" > ./user/secrets/email_username.txt
chmod 600 ./user/secrets/email_username.txt
docker secret create EMAIL_USERNAME ./user/secrets/email_username.txt
shred -u ./user/secrets/email_username.txt

echo -n "" > ./user/secrets/jwt_secret.txt
chmod 600 ./user/secrets/jwt_secret.txt
docker secret create JWT_SECRET ./user/secrets/jwt_secret.txt
shred -u ./user/secrets/jwt_secret.txt

echo -n "" > ./user/secrets/userDoc.txt
chmod 600 ./user/secrets/userDoc.txt
docker secret create USER_DOC ./user/secrets/userDoc.txt
shred -u ./user/secrets/userDoc.txt

echo -n 'G***' > ./user/secrets/passDoc.txt
chmod 600 ./user/secrets/passDoc.txt
docker secret create PASS_DOC ./user/secrets/passDoc.txt
shred -u ./user/secrets/passDoc.txt

# Baixar a imagem do postgres (usando cmd normal)
docker pull postgres:16.10-trixie

# Baixar a imagem do pgadmin (usando cmd normal)
docker pull dpage/pgadmin4:9.10.0

# Criar o volume do banco de dados (usando Ubuntu)
docker volume create banco-nutricao-bkp

# Criar serviço do banco de dados (Exposição de porta 5432 apenas para desenvolvimento local)
docker service create --name banco-nutricao \
  --network network-nutri \
  --publish published=5432,target=5432 \
  --secret POSTGRES_USER \
  --secret POSTGRES_PASSWORD \
  --env POSTGRES_USER_FILE=/run/secrets/POSTGRES_USER \
  --env POSTGRES_PASSWORD_FILE=/run/secrets/POSTGRES_PASSWORD \
  --mount type=volume,source=banco-nutricao-bkp,target=/var/lib/postgresql/data \
  postgres:16.10-trixie

# Criar o serviço do pgadmin
docker service create --name pgadmin4 \
  --network network-nutri \
  -e PGADMIN_DEFAULT_EMAIL=admin@admin.com.br \
  --secret PGADMIN_DEFAULT_PASSWORD \
  -e PGADMIN_DEFAULT_PASSWORD_FILE=/run/secrets/PGADMIN_DEFAULT_PASSWORD \
  -p 5050:80 \
  dpage/pgadmin4:9.10.0