package br.com.anaprado.nutri_api.controller.common;

import br.com.anaprado.nutri_api.controller.dto.erro.ErroResponse;
import br.com.anaprado.nutri_api.exceptions.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Erro de método HTTP errado
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<?> handleMethodNotAllowed(HttpRequestMethodNotSupportedException ex) {
        return ResponseEntity
                .status(HttpStatus.METHOD_NOT_ALLOWED)
                .body(Map.of(
                        "erro", "Método não permitido",
                        "mensagem", "O método utilizado não é suportado para este endpoint."
                ));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntime(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErroResponse(
                        "Erro interno",
                        ex.getMessage()
                ));
    }

    // NullPointer
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<?> handleNullPointer(NullPointerException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErroResponse(
                        "Erro interno",
                        "Ocorreu um erro inesperado ao processar a requisição."
                ));
    }

    // Argumento inválido
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErroResponse(
                        "Parâmetro inválido",
                        ex.getMessage()
                ));
    }

    // Estado ilegal
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<?> handleIllegalState(IllegalStateException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErroResponse(
                        "Operação inválida",
                        ex.getMessage()
                ));
    }

    // Erros de banco de dados (FK, UK, etc)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrity(DataIntegrityViolationException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErroResponse(
                        "Violação de integridade",
                        "A operação não pode ser realizada devido a dados conflitantes."
                ));
    }

    // Fallback final — qualquer coisa não capturada acima
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErroResponse(
                        "Erro desconhecido",
                        ex.getMessage()
                ));
    }

    @ExceptionHandler(RegistroDuplicadoException.class)
    public ResponseEntity<String> handlerRegistroDuplicado(RegistroDuplicadoException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(ElementoNaoEncontradoException.class)
    public ResponseEntity<String> handleElementoNaoEncontradoException(ElementoNaoEncontradoException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(UsuarioNaoEncontradoException.class)
    public ResponseEntity<String> handleUsuarioNaoEncontradoException(UsuarioNaoEncontradoException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(DadosSendoUsadosEmOutroLugar.class)
    public ResponseEntity<String> handleDadosSendoUsadosEmOutroLugar(DadosSendoUsadosEmOutroLugar e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(TokenInvalidoExpirado.class)
    public ResponseEntity<String> handleTokenInvalidoExpirado(TokenInvalidoExpirado e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(AutenticacaoInvalida.class)
    public ResponseEntity<String> handleAutenticacaoInvalida(AutenticacaoInvalida e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(ClienteNaoEncontradoException.class)
    public ResponseEntity<String> handleClienteNaoEncontradoException(ClienteNaoEncontradoException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(AgendamentoNaoEncontradoException.class)
    public ResponseEntity<String> handleAgendamentoNaoEncontradoException(AgendamentoNaoEncontradoException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    //Pega todos os campos que falharam na validação.
    //Monta um Map<String, String> com o nome do campo e a mensagem de erro.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidacao(MethodArgumentNotValidException ex) {
        Map<String, String> erros = new HashMap<>();
        for (FieldError erro : ex.getBindingResult().getFieldErrors()) {
            erros.put(erro.getField(), erro.getDefaultMessage());
        }
        return ResponseEntity
                .badRequest()
                .body(Map.of(
                        "mensagem", "Erro de validação nos campos",
                        "erros", erros
                ));
    }

    // Caso login invalido
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleCredenciaisInvalidas(BadCredentialsException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(
                        "erro", "Credenciais inválidas",
                        "mensagem", "E-mail ou senha incorretos."
                ));
    }

    @ExceptionHandler(TokenNaoEncontradoException.class)
    public ResponseEntity<String> handleTokenNaoEncontradoException(TokenNaoEncontradoException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(DadoAntropometricoNaoEncontrado.class)
    public ResponseEntity<String> handleDadoAntropometricoNaoEncontrado(DadoAntropometricoNaoEncontrado e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(DadoAntropometricoDoClienteJaExiste.class)
    public ResponseEntity<String> handleDadoAntropometricoDoClienteJaExiste(DadoAntropometricoDoClienteJaExiste e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(DietaNaoEncontradaException.class)
    public ResponseEntity<String> handleDietaNaoEncontrada(DietaNaoEncontradaException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(UsuarioJaCadastradoEmCliente.class)
    public ResponseEntity<String> handleUsuarioJaCadastradoEmCliente(UsuarioJaCadastradoEmCliente e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(ClientePossuiDieta.class)
    public ResponseEntity<String> handleClientePossuiDieta(ClientePossuiDieta e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(ConsultaJaAgendadaEntreHorario.class)
    public ResponseEntity<String> handleConsultaJaAgendadaEntreHorario(ConsultaJaAgendadaEntreHorario e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(TipoRefeicaoNaoEncontradoException.class)
    public ResponseEntity<String> handleTipoRefeicaoNaoEncontradoException(TipoRefeicaoNaoEncontradoException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(RefeicaoNaoEncontradaException.class)
    public ResponseEntity<String> handleRefeicaoNaoEncontradaException(RefeicaoNaoEncontradaException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(AlimentoNaoEncontradoException.class)
    public ResponseEntity<String> handleAlimentoNaoEncontradoException(AlimentoNaoEncontradoException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(ItemRefeicaoNaoEncontradoException.class)
    public ResponseEntity<String> handleItemRefeicaoNaoEncontradoException(ItemRefeicaoNaoEncontradoException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(AlimentoRepetidoNaRefeicaoException.class)
    public ResponseEntity<String> handleAlimentoRepetidoNaRefeicao(AlimentoRepetidoNaRefeicaoException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(ItemRefeicaoEOpcional.class)
    public ResponseEntity<String> handleItemRefeicaoEOpcional(ItemRefeicaoEOpcional e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(AntropometriaNaoEncontradaException.class)
    public ResponseEntity<String> handleAntropometriaNaoEncontradaException(AntropometriaNaoEncontradaException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(CategoriaJaExisteException.class)
    public ResponseEntity<String> handleCategoriaJaExisteException(CategoriaJaExisteException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(SubcategoriaJaExisteNessaCategoria.class)
    public ResponseEntity<String> handleSubcategoriaJaExisteNessaCategoria(SubcategoriaJaExisteNessaCategoria e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(CategoriaNaoEncontradaException.class)
    public ResponseEntity<String> handleCategoriaNaoEncontradaException(CategoriaNaoEncontradaException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(CategoriaSendoUsadaException.class)
    public ResponseEntity<String> handleCategoriaSendoUsadaException(CategoriaSendoUsadaException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(SubcategoriaNaoEncontradaException.class)
    public ResponseEntity<String> handleSubcategoriaNaoEncontradaException(SubcategoriaNaoEncontradaException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(SubcategoriaSendoUsadaException.class)
    public ResponseEntity<String> handleSubcategoriaSendoUsadaException(SubcategoriaSendoUsadaException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(AlimentoSelecionadoEOpcionalException.class)
    public ResponseEntity<String> handleAlimentoJaEOpcionalException(AlimentoSelecionadoEOpcionalException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(AlimentoJaCadastradoComoOpcionalException.class)
    public ResponseEntity<String> handleAlimentoJaCadastradoComoOpcionalException(AlimentoJaCadastradoComoOpcionalException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(ClientePossuiRefeicaoCadastradaException.class)
    public ResponseEntity<String> handleClientePossuiRefeicaoCadastradaException(ClientePossuiRefeicaoCadastradaException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(DadosDoClienteNaoEncontradosException.class)
    public ResponseEntity<String> handleDadosDoClienteNaoEncontradosException(DadosDoClienteNaoEncontradosException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

}


