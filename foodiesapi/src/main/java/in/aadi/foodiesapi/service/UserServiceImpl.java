package in.aadi.foodiesapi.service;

import in.aadi.foodiesapi.entity.UserEntity;
import in.aadi.foodiesapi.io.FoodRequest;
import in.aadi.foodiesapi.io.UserRequest;
import in.aadi.foodiesapi.io.UserResponse;
import in.aadi.foodiesapi.repository.FoodRepository;
import in.aadi.foodiesapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFacade authenticationFacade;

    public UserResponse registerUser(UserRequest userRequest) {
        Optional<UserEntity> isExisting=userRepository.findByEmail(userRequest.getEmail());
        if(isExisting.isPresent()) throw new RuntimeException("User already exists");
        UserEntity newUser= convertToEntity(userRequest);
        userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    public UserResponse loginUser(UserRequest userRequest) {
        UserEntity user = userRepository.findByEmail(userRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!user.getPassword().equals(userRequest.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return convertToResponse(user);
    }


    private UserEntity convertToEntity(UserRequest userRequest) {
        return UserEntity.builder()
                .name(userRequest.getName())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .email(userRequest.getEmail())
                .build();
    }
    private UserResponse convertToResponse(UserEntity registeredUser) {
            return UserResponse.builder()
                    .id(registeredUser.getId())
                    .name(registeredUser.getName())
                    .email(registeredUser.getEmail())
                    .build();
    }

    public String findByUserId() {
        String loggedInUserEmail = authenticationFacade.getAuthentication().getName();
        UserEntity loggedInUser= userRepository.findByEmail(loggedInUserEmail).orElseThrow(()-> new UsernameNotFoundException("User not found"));
        return loggedInUser.getId();
    }
}
