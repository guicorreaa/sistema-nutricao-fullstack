package br.com.anaprado.nutri_api.exceptions;

public class DadosSendoUsadosEmOutroLugar extends RuntimeException{
    public DadosSendoUsadosEmOutroLugar(String message){
        super(message);
    }
}
