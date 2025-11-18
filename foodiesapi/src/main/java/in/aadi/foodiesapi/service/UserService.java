package in.aadi.foodiesapi.service;

import in.aadi.foodiesapi.io.UserRequest;
import in.aadi.foodiesapi.io.UserResponse;
import org.springframework.stereotype.Service;


public interface UserService {
    UserResponse registerUser(UserRequest userRequest);
    String findByUserId();

}
