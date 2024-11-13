package dev.matswuuu.mlsh.mlshchatrix.repository.user;

import dev.matswuuu.mlsh.mlshchatrix.entity.chat.Chat;
import dev.matswuuu.mlsh.mlshchatrix.entity.user.User;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends MongoRepository<User, UUID> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsById(@NotNull UUID id);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByFirstName(String firstName);

    Optional<User> findByMiddleName(String middleName);

    Optional<User> findByLastName(String lastName);

    @NotNull
    @Override
    <S extends User> S save(@NotNull S entity);

}