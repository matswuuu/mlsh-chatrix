package dev.matswuuu.mlsh.mlshchatrix.entity.chat;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.PersistenceCreator;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@AllArgsConstructor(onConstructor_ = @PersistenceCreator)
public class ChatMember {

    UUID userId;
    Collection<Permission> permissions;

    public ChatMember(UUID userId) {
        this.userId = userId;
        this.permissions = new HashSet<>();
    }

}
