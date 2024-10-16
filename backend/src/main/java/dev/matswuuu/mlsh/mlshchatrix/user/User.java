package dev.matswuuu.mlsh.mlshchatrix.user;

import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Document("users")
@Accessors(chain = true)
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor(onConstructor_ = @PersistenceCreator)
public class User implements UserDetails {

    @Id
    final UUID id;
    final List<Long> chatList;

    String username;
    String firstName, middleName, lastName;
    String password;
    String email;
    String birthDate;
    String imageUrl;
    UserRole role;

    public User() {
        this.id = UUID.randomUUID();
        this.chatList = new ArrayList<>();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.toString()));
    }

}
