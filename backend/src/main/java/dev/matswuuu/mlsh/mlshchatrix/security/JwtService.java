package dev.matswuuu.mlsh.mlshchatrix.security;

import dev.matswuuu.mlsh.mlshchatrix.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtService {

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(Jwts.SIG.HS512.key().build())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        return claimsResolvers.apply(extractAllClaims(token));
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        var username = extractUsername(token);
        var isTokenExpired = extractExpiration(token).before(new Date());
        return username.equals(userDetails.getUsername()) && !isTokenExpired;
    }

    public String generateToken(String username) {
        var now = new Date();
        var expiration = Date.from(LocalDateTime.now().plusMinutes(30)
                .atZone(ZoneId.systemDefault()).toInstant());
        return Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .notBefore(now)
                .expiration(expiration)
                .signWith(Jwts.SIG.HS512.key().build())
                .compact();
    }

}