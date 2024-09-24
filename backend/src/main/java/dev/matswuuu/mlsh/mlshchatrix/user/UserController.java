package dev.matswuuu.mlsh.mlshchatrix.user;

import dev.matswuuu.mlsh.mlshchatrix.exception.user.email.EmailAlreadySetException;
import dev.matswuuu.mlsh.mlshchatrix.exception.user.email.InvalidEmailException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.UUID;
import java.util.regex.Pattern;

@Controller
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class UserController {

    private static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                    + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");

    UserService userService;

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

    private void validateEmail(String email) {
        if (email.isEmpty()) return;

        if (!VALID_EMAIL_ADDRESS_REGEX.matcher(email).matches())
            throw new InvalidEmailException("Invalid email");
        if (userService.existsByEmail(email))
            throw new EmailAlreadySetException("Email already exists");
    }

    @MutationMapping
    public User createUser(@Argument String email, @Argument String firstName,
                           @Argument String middleName, @Argument String lastName) {
        validateEmail(email);

        var user = new User()
                .setEmail(email)
                .setFirstName(firstName)
                .setMiddleName(middleName)
                .setLastName(lastName);
        userService.save(user);

        return user;
    }

}
