package br.com.anaprado.nutri_api.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    public void enviarEmailAtivacao(String destinatario, String link) {

        try {
            Context context = new Context();
            context.setVariable("link", link);

            String html = templateEngine.process("email-ativacao", context);

            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(destinatario);
            helper.setSubject("Ative sua conta");
            helper.setText(html, true);

            javaMailSender.send(message);

        } catch (MessagingException e) {
            // loga e não quebra o fluxo da aplicação
            throw new RuntimeException("Erro ao enviar e-mail de ativação", e);
        }
    }
}