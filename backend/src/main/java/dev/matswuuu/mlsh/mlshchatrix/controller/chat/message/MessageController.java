package dev.matswuuu.mlsh.mlshchatrix.controller.chat.message;

import dev.matswuuu.mlsh.mlshchatrix.entity.chat.Chat;
import dev.matswuuu.mlsh.mlshchatrix.entity.chat.message.Message;
import dev.matswuuu.mlsh.mlshchatrix.security.JwtService;
import dev.matswuuu.mlsh.mlshchatrix.service.chat.ChatService;
import dev.matswuuu.mlsh.mlshchatrix.service.user.UserService;
import graphql.GraphQLException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class MessageController {

    private static final String DELIMITER = ":";

    UserService userService;
    ChatService chatService;
    JwtService jwtService;

    private int getId(String str, int index) {
        var id = Integer.parseInt(str.split(DELIMITER)[index]);
        return Math.max(id, 0);
    }

    @SubscriptionMapping
    public Flux<List<Message>> newMessages(@Argument String token,
                                           @Argument List<String> lastMessages) {
        var authorId = jwtService.extractId(token);
        var user = userService.getById(authorId);
        if (user == null) throw new GraphQLException("User not found");

        return Flux.interval(Duration.ofMillis(50))
                .map(sequence -> {
                    try {
                        var newMessages = new ArrayList<Message>();

                        for (var str : lastMessages) {
                            var chatId = getId(str, 0);
                            var messageId = getId(str, 1);

                            var chat = chatService.getChatById(chatId);
                            var messages = chat.getMessages();
                            var lastIndex = messages.size();

                            if (messageId != lastIndex)
                                newMessages.addAll(messages.subList(messageId, lastIndex));
                        }

                        return newMessages;
                    } catch (Exception e) {
                        log.error("Error occurred during getting messages", e);
                        return List.of();
                    }
                });
    }

}