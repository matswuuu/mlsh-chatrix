package dev.matswuuu.mlsh.mlshchatrix.entity.chat.message;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.data.annotation.PersistenceCreator;

import java.util.Collection;
import java.util.UUID;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@AllArgsConstructor(onConstructor_ = @PersistenceCreator)
public class Message {

    long chatId;
    UUID authorId;
    long timestamp;
    Collection<String> options;

    @NonFinal
    String content;

    public Message(long chatId, UUID authorId, Collection<String> options) {
        this.chatId = chatId;
        this.authorId = authorId;
        this.options = options;
        this.timestamp = System.currentTimeMillis();
    }

}
