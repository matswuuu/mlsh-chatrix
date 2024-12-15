package dev.matswuuu.mlsh.mlshchatrix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
//import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableMongoRepositories
@EnableScheduling
public class MlshChatrixApplication {

    public static void main(String[] args) {
        SpringApplication.run(MlshChatrixApplication.class, args);
    }

}
