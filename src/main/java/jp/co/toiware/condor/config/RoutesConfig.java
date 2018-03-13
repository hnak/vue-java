package jp.co.toiware.condor.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import jp.co.toiware.condor.controller.SampleController;

@Slf4j
@Configuration
public class RoutesConfig {
    @Bean
    public RouterFunction<ServerResponse> routes(SampleController sampleController) {
        return sampleController.routes().filter((request, next) -> {
            try {
                return next.handle(request);
            } catch (Exception e) {
                log.error("An error occured", e);
                return ServerResponse.badRequest().build();
            }
        });
    }
}