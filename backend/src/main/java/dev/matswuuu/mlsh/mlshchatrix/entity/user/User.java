package dev.matswuuu.mlsh.mlshchatrix.entity.user;

import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Document("users")
@Accessors(chain = true)
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor(onConstructor_ = @PersistenceCreator)
public class User implements UserDetails {

    @Id
    final UUID id;
    final List<Long> chats;
    final Collection<String> options;

    String username;
    String firstName, middleName, lastName;
    String password;
    String email;
    long birthDate;
    String imageUrl;
    UserRole role;

    public User() {
        this.id = UUID.randomUUID();
        this.chats = Collections.singletonList(0L);
        this.options = new HashSet<>();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.toString()));
    }

}
