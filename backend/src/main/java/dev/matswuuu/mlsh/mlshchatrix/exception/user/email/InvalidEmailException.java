package dev.matswuuu.mlsh.mlshchatrix.exception.user.email;

import dev.matswuuu.mlsh.mlshchatrix.exception.user.UserException;

public class InvalidEmailException extends UserException {

    public InvalidEmailException(String message) {
        super(message);
    }

}
