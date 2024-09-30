package dev.matswuuu.mlsh.mlshchatrix.user;

import dev.matswuuu.mlsh.mlshchatrix.exception.user.email.EmailAlreadySetException;
import dev.matswuuu.mlsh.mlshchatrix.security.TokenResolver;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class UserController {

    UserService userService;
    PasswordEncoder passwordEncoder;

    TokenResolver tokenResolver;

    @QueryMapping
    public User userById(@Argument UUID id) {
        return userService.findById(id);
    }

    @QueryMapping
    public User userByEmail(@Argument String email) {
        return userService.findByEmail(email);
    }

    @QueryMapping
    public User userByFirstName(@Argument String firstName) {
        return userService.findByFirstName(firstName);
    }

    @QueryMapping
    public User userByMiddleName(@Argument String middleName) {
        return userService.findByMiddleName(middleName);
    }

    @QueryMapping
    public User userByLastName(@Argument String lastName) {
        return userService.findByLastName(lastName);
    }

    @QueryMapping
    public User userByChatId(@Argument long chatId) {
        return userService.findByChatId(chatId);
    }

    @QueryMapping
    public boolean existsByUsername(@Argument String username) {
        return userService.existsByUsername(username);
    }

    @MutationMapping
    public User createUser(@Argument String firstName,
                           @Argument String middleName,
                           @Argument String lastName,
                           @Argument String password,
                           @Argument String email) {
        if (!email.isEmpty() && userService.existsByEmail(email))
            throw new EmailAlreadySetException("Email already exists");

        var username =

        var user = new User()
                .setUsername()
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
        return tokenResolver.login(username, password);
    }

}
