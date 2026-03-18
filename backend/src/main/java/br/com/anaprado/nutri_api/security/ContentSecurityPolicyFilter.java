package br.com.anaprado.nutri_api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class ContentSecurityPolicyFilter extends HttpFilter {
    // Remover 'unsafe-inline' e permitir somente arquivos externos para scripts e estilos
    private static final String POLICY =
            "default-src 'self'; " +                // Recursos apenas do mesmo domínio
                    "script-src 'self'; " +                  // Scripts apenas do mesmo domínio
                    "style-src 'self'; " +                   // Estilos apenas do mesmo domínio
                    "img-src 'self' data:; " +               // Imagens do próprio domínio ou imagens embutidas em base64
                    "font-src 'self'; " +                    // Fontes apenas do mesmo domínio
                    "connect-src 'self'; " +                 // Conexões (XHR, Fetch) apenas do mesmo domínio
                    "frame-ancestors 'none'; " +             // Impede embedding da página em iframes
                    "object-src 'none'; " +                  // Bloqueia objetos como <object>, <embed>
                    "manifest-src 'self'; " +                // Manifestos apenas do mesmo domínio
                    "worker-src 'self';";                    // Workers apenas do mesmo domínio

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        response.setHeader("Content-Security-Policy", POLICY);
        chain.doFilter(request, response);
    }
}
