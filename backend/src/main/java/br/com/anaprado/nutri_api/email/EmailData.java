package br.com.anaprado.nutri_api.email;

import br.com.anaprado.nutri_api.config.SecretConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailData {

    private String host;
    private String port;
    private String username;
    private String password;

    private String UTF;

    private final SecretConfig secretConfig;

    public String getHost() {
        return secretConfig.getSecret("EMAIL_HOST");
    }

    public String getPort() {
        return secretConfig.getSecret("EMAIL_PORT");
    }

    public String getUsername() {
        return secretConfig.getSecret("EMAIL_USERNAME");
    }

    public String getPassword() {
        return secretConfig.getSecret("EMAIL_PASSWORD");
    }

    public String getUTF() {
        return "UTF-8";
    }
}
