package dev.matswuuu.mlsh.mlshchatrix;

import dev.matswuuu.mlsh.mlshchatrix.entity.message.Message;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document("chats")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor(onConstructor_ = @PersistenceCreator)
public class Chat {

    @Id
    long id;
    List<Message> messages = new ArrayList<>();

}
