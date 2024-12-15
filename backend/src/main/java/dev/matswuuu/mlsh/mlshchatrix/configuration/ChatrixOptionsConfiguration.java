package dev.matswuuu.mlsh.mlshchatrix.configuration;

import lombok.AccessLevel;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;
import java.util.Set;

@ConfigurationProperties("mlsh.chatrix")
@Configuration
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatrixOptionsConfiguration {

    Map<String, Set<String>> options;

    @Bean
    public Map<String, Set<String>> userOptions() {
        return options;
    }

}
