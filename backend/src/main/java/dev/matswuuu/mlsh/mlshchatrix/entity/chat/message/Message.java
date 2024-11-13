package dev.matswuuu.mlsh.mlshchatrix.entity.chat.message;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.data.annotation.PersistenceCreator;

import java.util.UUID;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@AllArgsConstructor(onConstructor_ = @PersistenceCreator)
public class Message {

    long chatId;
    UUID authorId;
    long timestamp;

    @NonFinal
    String content;

    public Message(long chatId, UUID authorId) {
        this.chatId = chatId;
        this.authorId = authorId;
        this.timestamp = System.currentTimeMillis();
    }

}
