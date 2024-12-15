package dev.matswuuu.mlsh.mlshchatrix.controller.user;

import dev.matswuuu.mlsh.mlshchatrix.entity.user.User;
import dev.matswuuu.mlsh.mlshchatrix.exception.user.email.EmailAlreadySetException;
import dev.matswuuu.mlsh.mlshchatrix.security.JwtService;
import dev.matswuuu.mlsh.mlshchatrix.service.chat.ChatService;
import dev.matswuuu.mlsh.mlshchatrix.service.user.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Controller
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class UserController {

    private static final String USERNAME_PATTERN = "%s-%s-%s";

    UserService userService;
    PasswordEncoder passwordEncoder;
    JwtService jwtService;

    @QueryMapping
    public User userById(@Argument UUID id) {
        return userService.getById(id);
    }

    @QueryMapping
    public User userByEmail(@Argument String email) {
        return userService.getByEmail(email);
    }

    @QueryMapping
    public User userByFirstName(@Argument String firstName) {
        return userService.getByFirstName(firstName);
    }

    @QueryMapping
    public User userByMiddleName(@Argument String middleName) {
        return userService.getByMiddleName(middleName);
    }

    @QueryMapping
    public User userByLastName(@Argument String lastName) {
        return userService.getByLastName(lastName);
    }

    @QueryMapping
    public boolean existsByUsername(@Argument String username) {
        return userService.existsByUsername(username.toLowerCase());
    }

    @QueryMapping
    public Collection<User> usersByOptions(@Argument List<String> options) {
        return userService.getAllByOptionsContainingAll(options);
    }

    @MutationMapping
    public User register(@Argument String firstName,
                         @Argument String middleName,
                         @Argument String lastName,
                         @Argument String password,
                         @Argument String email) {
        if (!email.isEmpty() && userService.existsByEmail(email))
            throw new EmailAlreadySetException("Email already exists");

        var username = USERNAME_PATTERN.formatted(
                lastName.substring(0, 3),
                firstName.substring(0, 3),
                middleName.substring(0, 3)
        );

        var user = new User()
                .setUsername(username)
                .setFirstName(firstName)
                .setMiddleName(middleName)
                .setLastName(lastName)
                .setEmail(email)
                .setPassword(passwordEncoder.encode(password));
        userService.save(user);

        return user;
    }

    @MutationMapping
    public String login(@Argument String username,
                        @Argument String password) {
        var user = userService.getByUsername(username);

        if (user == null || !passwordEncoder.matches(password, user.getPassword()))
            throw new RuntimeException("Invalid credentials");

        return jwtService.generateToken(user);
    }

}
