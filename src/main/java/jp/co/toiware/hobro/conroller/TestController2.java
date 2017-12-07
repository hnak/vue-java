package jp.co.toiware.hobro.conroller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class TestController2{
    @RequestMapping(method = RequestMethod.GET)
    public String get(@RequestParam("userId")  String userId) {
        return "fugagusa";
    }
}