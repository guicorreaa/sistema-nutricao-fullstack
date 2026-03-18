package br.com.anaprado.nutri_api.security;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;


public class HtmlSanitizer {
    public static String sanitize(String input) {
        return input == null ? null : Jsoup.clean(input, Safelist.basic());
    }
}
