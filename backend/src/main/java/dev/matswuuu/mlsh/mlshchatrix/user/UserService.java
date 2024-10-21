package dev.matswuuu.mlsh.mlshchatrix.user;

import dev.matswuuu.mlsh.mlshchatrix.entity.user.User;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.regex.Pattern;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class UserService {

    private static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                    + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");

    UserRepository userRepository;

    public boolean validateEmail(String email) {
        return VALID_EMAIL_ADDRESS_REGEX.matcher(email).matches();
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User findById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public User findByEmail(String email) {
        return validateEmail(email) ?
                userRepository.findByEmail(email).orElse(null) : null;
    }

    public User findByFirstName(String firstName) {
        return userRepository.findByFirstName(firstName).orElse(null);
    }

    public User findByMiddleName(String middleName) {
        return userRepository.findByMiddleName(middleName).orElse(null);
    }

    public User findByLastName(String lastName) {
        return userRepository.findByLastName(lastName).orElse(null);
    }

    public User findByChatId(long chatId) {
        return userRepository.findByChatListContaining(chatId).orElse(null);
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public UserDetailsService userDetailsService() {
        return this::findByUsername;
    }

}
