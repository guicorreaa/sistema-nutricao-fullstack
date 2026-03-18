package br.com.anaprado.nutri_api.security;

import br.com.anaprado.nutri_api.config.SecretConfig;
import br.com.anaprado.nutri_api.exceptions.TokenInvalidoExpirado;
import br.com.anaprado.nutri_api.model.Usuario;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final SecretConfig secretConfig;

    public String gerarToken(Usuario usuario) {

        try {
            Algorithm algorithm = Algorithm.HMAC256(pegarSecret());
            String token = JWT.create()
                    .withIssuer("nutri-api")
                    .withSubject("usuario")
                    .withClaim("uid", usuario.getUsuario_id().toString())
                    .withExpiresAt(gerarDataExpiracao())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar token! ", e);
        }
    }

    private Instant gerarDataExpiracao() {
        return LocalDateTime.now().plusMinutes(60).toInstant(ZoneOffset.of("-03:00"));
    }

    public UUID validarToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(pegarSecret());
            var decodedJWT = JWT.require(algorithm)
                    .withIssuer("nutri-api")
                    .build()
                    .verify(token);

            String uid = decodedJWT.getClaim("uid").asString();
            return UUID.fromString(uid);
        }catch (JWTVerificationException e){
            throw new TokenInvalidoExpirado("Token inválido ou expirado");
        }
    }

    private String pegarSecret() {
        return secretConfig.getSecret("JWT_SECRET");
    }

    public Instant pegarExpiracao(String token) {
        Algorithm algorithm = Algorithm.HMAC256(pegarSecret());
        var decodedJWT = JWT.require(algorithm)
                .withIssuer("nutri-api")
                .build()
                .verify(token);
        return decodedJWT.getExpiresAt().toInstant();
    }



}
