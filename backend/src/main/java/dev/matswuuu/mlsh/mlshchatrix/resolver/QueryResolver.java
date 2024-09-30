package dev.matswuuu.mlsh.mlshchatrix.resolver;

import org.jetbrains.annotations.NotNull;
import org.springframework.graphql.server.WebGraphQlInterceptor;
import org.springframework.graphql.server.WebGraphQlRequest;
import org.springframework.graphql.server.WebGraphQlResponse;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class QueryResolver implements WebGraphQlInterceptor {

    @Override
    public Mono<WebGraphQlResponse> intercept(WebGraphQlRequest request,
                                              @NotNull Chain chain) {
        var exchange = (ServerWebExchange) request.getAttributes().get(ServerWebExchange.class.getName());
        if (exchange == null) return chain.next(request);

        return exchange.getAttributeOrDefault(CsrfToken.class.getName(), Mono.<CsrfToken>empty())
                .flatMap(csrfToken -> {
                    var actualToken = exchange.getRequest().getHeaders().getFirst(csrfToken.getHeaderName());
                    System.out.println("actualToken " + actualToken);
                    System.out.println("token " + csrfToken.getToken());

                    if (actualToken == null || !actualToken.equals(csrfToken.getToken()))
                        return Mono.error(new IllegalArgumentException("Invalid CSRF Token"));

                    return chain.next(request);
                });
    }

}
