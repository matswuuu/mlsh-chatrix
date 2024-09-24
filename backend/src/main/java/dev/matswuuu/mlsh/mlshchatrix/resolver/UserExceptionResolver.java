package dev.matswuuu.mlsh.mlshchatrix.resolver;

import dev.matswuuu.mlsh.mlshchatrix.exception.user.UserException;
import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import org.jetbrains.annotations.NotNull;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.stereotype.Component;

@Component
public class UserExceptionResolver extends DataFetcherExceptionResolverAdapter {

    @Override
    protected GraphQLError resolveToSingleError(@NotNull Throwable exception,
                                                @NotNull DataFetchingEnvironment dataFetchingEnvironment) {
        if (exception instanceof UserException) {
            return GraphqlErrorBuilder.newError()
                    .errorType(ErrorType.NOT_FOUND)
                    .message(exception.getMessage())
                    .path(dataFetchingEnvironment.getExecutionStepInfo().getPath())
                    .location(dataFetchingEnvironment.getField().getSourceLocation())
                    .build();
        } else {
            return null;
        }
    }
}