package dev.matswuuu.mlsh.mlshchatrix;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
public class Message {

    final UUID authorId;

    long timestamp;
    String content;

}
