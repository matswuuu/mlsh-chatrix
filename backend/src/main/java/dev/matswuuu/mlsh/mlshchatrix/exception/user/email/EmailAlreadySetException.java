package dev.matswuuu.mlsh.mlshchatrix.exception.user.email;

import dev.matswuuu.mlsh.mlshchatrix.exception.user.UserException;

public class EmailAlreadySetException extends UserException {

    public EmailAlreadySetException(String message) {
        super(message);
    }

}
