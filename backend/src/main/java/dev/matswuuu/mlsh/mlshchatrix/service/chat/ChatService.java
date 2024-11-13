package dev.matswuuu.mlsh.mlshchatrix.service.chat;

import dev.matswuuu.mlsh.mlshchatrix.entity.chat.Chat;
import dev.matswuuu.mlsh.mlshchatrix.entity.chat.ChatMember;
import dev.matswuuu.mlsh.mlshchatrix.entity.chat.message.Message;
import dev.matswuuu.mlsh.mlshchatrix.repository.chat.ChatRepository;
import dev.matswuuu.mlsh.mlshchatrix.service.user.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ChatService {

    ChatRepository chatRepository;
    UserService userService;

    public Chat getChatById(long id) {
        return chatRepository.findById(id).orElse(null);
    }

    public Chat save(Chat chat) {
        return chatRepository.save(chat);
    }

    public List<Chat> getAllChats(Iterable<Long> ids) {
        return chatRepository.findAllById(ids);
    }

    public List<Message> getMessagesByChatId(long chatId) {
        return getChatById(chatId).getMessages();
    }

    public Chat getTopByOrderByIdDesc() {
        return chatRepository.findTopByOrderByIdDesc().orElse(null);
    }

    public void addMessage(long chatId, Message message) {
        chatRepository.addMessage(chatId, message);
    }

    public void addMember(UUID userId, Chat chat) {
        var user = userService.getById(userId);
        user.getChats().add(chat.getId());

        chat.getMembers().add(new ChatMember(userId));

        userService.save(user);
        save(chat);
    }

}
