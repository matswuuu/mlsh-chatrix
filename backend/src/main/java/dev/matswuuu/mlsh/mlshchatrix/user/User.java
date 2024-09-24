package dev.matswuuu.mlsh.mlshchatrix.user;

import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document("users")
@Accessors(chain = true)
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor(onConstructor_ = @PersistenceCreator)
public class User {

    @Id
    final UUID id;
    final List<Long> chatList;

    String email;
    String imageUrl;
    String firstName, middleName, lastName;

    public User() {
        this.id = UUID.randomUUID();
        this.chatList = new ArrayList<>();
    }

}
