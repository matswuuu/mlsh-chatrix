package dev.matswuuu.mlsh.mlshchatrix;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestHandler;
import org.springframework.stereotype.Component;

import java.util.function.Supplier;

@Component
@Slf4j
public class Test implements CsrfTokenRequestHandler {

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       Supplier<CsrfToken> csrfToken) {
        log.info(csrfToken.get().getToken());
        log.info(csrfToken.get().getHeaderName());
        log.info(csrfToken.get().getParameterName());
    }

}
