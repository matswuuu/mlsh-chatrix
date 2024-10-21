package dev.matswuuu.mlsh.mlshchatrix.entity.chat;

import dev.matswuuu.mlsh.mlshchatrix.entity.message.Message;
import lombok.Value;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Value
public class Chat {

    long creationTimestamp;
    List<ChatMember> members = new ArrayList<>();
    List<Message> messages = new ArrayList<>();

}
