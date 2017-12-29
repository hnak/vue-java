package jp.co.toiware.condor.service;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import jp.co.toiware.condor.domain.entity.User;
import jp.co.toiware.condor.domain.repository.UserRepository;

public class SampleService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUser(String id) {
        return userRepository.findById(Long.valueOf(id));
    }
}