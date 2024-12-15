package dev.matswuuu.mlsh.mlshchatrix.security;

import com.nimbusds.jose.Algorithm;
import dev.matswuuu.mlsh.mlshchatrix.entity.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecureDigestAlgorithm;
import lombok.AccessLevel;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.UUID;
import java.util.function.Function;

@Setter
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JwtService {

    @Value("${secret.key}")
    @NonFinal
    String secretKey;

    private SecretKey getKey() {
        var keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .decryptWith(getKey())
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        return claimsResolvers.apply(extractAllClaims(token));
    }

    public String extractUsername(String token) {
        return extractClaim(token, claims ->
                claims.get("username", String.class));
    }

    public UUID extractId(String token) {
        return extractClaim(token, claims ->
                UUID.fromString(claims.get("id", String.class)));
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        var username = extractUsername(token);
        return username.equals(userDetails.getUsername());
    }

    public String generateToken(User user) {
        var claims = new HashMap<String, Object>();
        claims.put("username", user.getUsername());
        claims.put("id", user.getId());
        claims.put("role", user.getRole().ordinal());

        return Jwts.builder()
                .claims(claims)
                .signWith(getKey(), Jwts.SIG.HS512)
                .compact();
    }

}