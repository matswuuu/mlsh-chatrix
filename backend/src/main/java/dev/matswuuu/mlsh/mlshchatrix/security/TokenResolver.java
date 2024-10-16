package dev.matswuuu.mlsh.mlshchatrix.security;

import dev.matswuuu.mlsh.mlshchatrix.user.UserService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class TokenResolver implements GraphQLMutationResolver {

    UserService userService;
    JwtService jwtService;
    PasswordEncoder passwordEncoder;

    public String login(String username, String password) {
        var user = userService.findByUsername(username);

        if (user == null || !passwordEncoder.matches(password, passwordEncoder.encode(user.getPassword())))
            throw new RuntimeException("Invalid credentials");

        return jwtService.generateToken(username);
    }

}
