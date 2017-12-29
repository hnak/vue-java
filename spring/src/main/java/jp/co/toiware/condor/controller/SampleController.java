package jp.co.toiware.condor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import jp.co.toiware.condor.domain.entity.User;
import jp.co.toiware.condor.service.SampleService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.path;
import static org.springframework.web.reactive.function.server.RouterFunctions.nest;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;

import java.util.Optional;

@Component
public class SampleController {

    @Autowired
    private SampleService SampleService;

    public RouterFunction<ServerResponse> routes() {
        return nest(path("/api"),
                route(GET("/user/{userId}"), this::getUser)
                        // .andRoute(GET("/block/{blockHash}"), this::getBlock)
        );
    }

    private Mono<ServerResponse> getUser(ServerRequest req) {
        String id = req.pathVariable("userId");
        Optional<User> user = SampleService.getUser(id);
        if(user.isPresent()){
            return ok().body(Flux.just(user.get()), User.class);
        } else {
            return notFound().build();
        }
    }
}