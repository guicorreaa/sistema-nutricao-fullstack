# 1. Gera o JAR do Spring Boot ignorando os testes (para agilizar o deploy)
./gradlew build -x test

# 2. Build da imagem Docker sem cache para garantir integridade
docker build --no-cache -t nutri-api-imagem .

# 3. Deploy da Stack no Swarm
docker stack deploy -c docker-compose.yml api_nutri