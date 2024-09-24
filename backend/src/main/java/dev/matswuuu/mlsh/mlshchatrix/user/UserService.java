package dev.matswuuu.mlsh.mlshchatrix.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class UserService {

    UserRepository userRepository;

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User findById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
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

}
