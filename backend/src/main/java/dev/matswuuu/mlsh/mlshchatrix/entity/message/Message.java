package dev.matswuuu.mlsh.mlshchatrix.entity.message;

import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.Value;
import lombok.experimental.NonFinal;

import java.util.UUID;

@Value
@RequiredArgsConstructor
public class Message {

    String content;
    long chatId;
    UUID authorId;
    long timestamp;
    /**
     * ID прошлого сообщения. Если сообщение не было
     * изменено, то ID = -1
     */
    @Setter
    @NonFinal
    long previous = -1;

}
