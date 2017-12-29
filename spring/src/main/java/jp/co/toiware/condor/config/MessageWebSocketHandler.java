package jp.co.toiware.condor.config;


import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.EmitterProcessor;
import reactor.core.publisher.Mono;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;

@Slf4j
@Component
public class MessageWebSocketHandler implements WebSocketHandler {
    private final EmitterProcessor<String> in = EmitterProcessor.create();

    public void sendMessage(String message) {
        log.info("Send Message:" + message);
        in.onNext(message);
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        session.receive()
        .map(WebSocketMessage::getPayloadAsText)
        .log()
        .subscribe();
    return session.send(Mono.just(session.textMessage("connected!"))).then(session.send(in.map(session::textMessage)));
    }
}