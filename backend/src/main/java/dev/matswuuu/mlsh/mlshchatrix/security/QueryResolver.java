package dev.matswuuu.mlsh.mlshchatrix.security;

import dev.matswuuu.mlsh.mlshchatrix.service.user.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.graphql.server.WebGraphQlInterceptor;
import org.springframework.graphql.server.WebGraphQlRequest;
import org.springframework.graphql.server.WebGraphQlResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

//@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class QueryResolver implements WebGraphQlInterceptor {

    private static final String BEARER_PREFIX = "Bearer ";

    JwtService jwtService;
    UserService userService;

    @NotNull
    @Override
    public Mono<WebGraphQlResponse> intercept(WebGraphQlRequest request,
                                              @NotNull Chain chain) {
        var operationName = request.getOperationName();
        if (operationName == null) return Mono.empty();

        operationName = operationName.toLowerCase();
        if (operationName.equals("login") ||
                operationName.equals("registration")) return chain.next(request);

        var authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (StringUtils.isEmpty(authHeader) ||
                !StringUtils.startsWith(authHeader, BEARER_PREFIX))
            return Mono.empty();

        var jwt = authHeader.substring(BEARER_PREFIX.length());
        var username = jwtService.extractUsername(jwt);
        var userDetails = userService.userDetailsService().loadUserByUsername(username);

        if (jwtService.isTokenValid(jwt, userDetails)) return chain.next(request);
        else return Mono.empty();
    }

}
