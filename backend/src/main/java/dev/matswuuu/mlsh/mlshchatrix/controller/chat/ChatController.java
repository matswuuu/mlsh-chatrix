package dev.matswuuu.mlsh.mlshchatrix.controller.chat;

import dev.matswuuu.mlsh.mlshchatrix.entity.chat.Chat;
import dev.matswuuu.mlsh.mlshchatrix.entity.chat.message.Message;
import dev.matswuuu.mlsh.mlshchatrix.security.JwtService;
import dev.matswuuu.mlsh.mlshchatrix.service.chat.ChatService;
import dev.matswuuu.mlsh.mlshchatrix.service.user.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ChatController {

    ChatService chatService;
    UserService userService;
    JwtService jwtService;

    @QueryMapping
    public Chat chatById(@Argument long id) {
        return chatService.getChatById(id);
    }

    @QueryMapping
    public List<Message> messagesByChatId(@Argument String token,
                                          @Argument long id) {
        var authorId = jwtService.extractId(token);
        var user = userService.getById(authorId);
        return user != null && user.getChats().contains(id) ?
                chatService.getMessagesByChatId(id) :
                List.of();
    }

    @QueryMapping
    public List<Chat> chatsByUserId(@Argument UUID id) {
        var user = userService.getById(id);
        return user == null ?
                new ArrayList<>() : chatService.getAllChats(user.getChats());
    }

    @MutationMapping
    public Chat createNewChat(@Argument String token,
                              @Argument String chatName) {
        var ownerId = jwtService.extractId(token);
        if (!userService.existsById(ownerId)) return null;

        var latestChat = chatService.getTopByOrderByIdDesc();
        var id = latestChat == null ? 0 : latestChat.getId() + 1;

        var chat = new Chat(id);
        chat.setOwnerId(ownerId);
        chat.setName(chatName);
        chatService.addMember(ownerId, chat);

        return chat;
    }

    @MutationMapping
    public Chat joinChat(@Argument String token,
                         @Argument long chatId) {
        var userId = jwtService.extractId(token);
        if (!userService.existsById(userId)) return null;

        var chat = chatService.getChatById(chatId);
        if (chat == null) return null;

        chatService.addMember(userId, chat);
        return chat;
    }

    @MutationMapping
    public Message sendMessage(@Argument String token,
                               @Argument long chatId,
                               @Argument String content,
                               @Argument List<String> options) {
        if (content.isEmpty()) return null;

        var authorId = jwtService.extractId(token);
        var user = userService.getById(authorId);
        if (!user.getChats().contains(chatId)) return null;

        var chat = chatService.getChatById(chatId);
        if (user.getRole().ordinal() < chat.getRole()) return null;

        var message = new Message(chatId, authorId,
                options == null ? new ArrayList<>() : options);
        message.setContent(content);
        chatService.addMessage(chatId, message);

        return message;
    }

    @MutationMapping
    public List<Message> limitedMessagesByChatId(@Argument String token,
                                                 @Argument long id,
                                                 @Argument int fromId) {
        var authorId = jwtService.extractId(token);
        var user = userService.getById(authorId);
        if (!user.getChats().contains(id)) return null;

        var chat = chatService.getChatById(id);
        var messages = chat.getMessages().stream()
                .filter(m -> user.getOptions().containsAll(m.getOptions()))
                .collect(Collectors.toList());

        return messages.subList(fromId, messages.size() - 1);
    }

}
