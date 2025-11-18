package in.aadi.foodiesapi.service;

import in.aadi.foodiesapi.entity.UserEntity;
import in.aadi.foodiesapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
@AllArgsConstructor

@Service
public class AppUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user=userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));
           return new User(user.getEmail(),user.getPassword(), Collections.emptyList());
    }

}
