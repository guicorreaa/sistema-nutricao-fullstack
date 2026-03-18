package br.com.anaprado.nutri_api.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
public class DataSourceConfig {

    private final SecretConfig secretConfig;

    @Bean
    public DataSource dataSource() {
        String postgresUser = secretConfig.getSecret("POSTGRES_USER");
        String postgresSecret = secretConfig.getSecret("POSTGRES_PASSWORD");

        return DataSourceBuilder.create()
                .url("jdbc:postgresql://banco-nutricao:5432/postgres") // informar o banco cadastrado
                .username(postgresUser)
                .password(postgresSecret)
                .driverClassName("org.postgresql.Driver")
                .build();
    }

}