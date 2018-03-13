package jp.co.toiware.condor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import jp.co.toiware.condor.domain.entity.User;
import jp.co.toiware.condor.domain.repository.UserRepository;

@Service
public class SampleService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUser(String id) {
        return userRepository.findById(Long.valueOf(id));
    }
}