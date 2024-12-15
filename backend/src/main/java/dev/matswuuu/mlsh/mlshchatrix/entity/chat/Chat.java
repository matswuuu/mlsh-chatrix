package dev.matswuuu.mlsh.mlshchatrix.entity.chat;

import dev.matswuuu.mlsh.mlshchatrix.entity.chat.message.Message;
import dev.matswuuu.mlsh.mlshchatrix.entity.user.UserRole;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document("chats")
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@AllArgsConstructor(onConstructor_ = @PersistenceCreator)
public class Chat {

    @Id
    long id;
    long creationTimestamp;
    List<ChatMember> members;
    List<Message> messages;
    int role;
    List<SelectionValue> sendOptions;

    @NonFinal
    UUID ownerId;
    @NonFinal
    String name;

    public Chat(long id) {
        this.id = id;
        this.creationTimestamp = System.currentTimeMillis();
        this.members = new ArrayList<>();
        this.messages = new ArrayList<>();
        this.role = UserRole.STUDENT.ordinal();
        this.sendOptions = new ArrayList<>();
    }

    public record SelectionValue(String value, String name) {

    }

}
