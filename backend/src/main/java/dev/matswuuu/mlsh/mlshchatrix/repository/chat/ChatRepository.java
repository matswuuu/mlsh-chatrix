package dev.matswuuu.mlsh.mlshchatrix.repository.chat;

import dev.matswuuu.mlsh.mlshchatrix.entity.chat.Chat;
import dev.matswuuu.mlsh.mlshchatrix.entity.chat.message.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends MongoRepository<Chat, Long> {

    Optional<Chat> findTopByOrderByIdDesc();

    @Query( "{ 'id': ?0 }")
    @Update("{ '$push': { 'messages': ?1 } }")
    void addMessage(long chatId, Message message);

}
