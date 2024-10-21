package dev.matswuuu.mlsh.mlshchatrix.entity.chat;

import lombok.RequiredArgsConstructor;
import lombok.Value;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Value
public class ChatMember {

    UUID userId;
    Set<Permission> permissions = new HashSet<>();

}
