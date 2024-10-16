package dev.matswuuu.mlsh.mlshchatrix.exception.user;

import graphql.GraphQLException;

public abstract class UserException extends GraphQLException {

    public UserException(String message) {
        super(message);
    }

}
