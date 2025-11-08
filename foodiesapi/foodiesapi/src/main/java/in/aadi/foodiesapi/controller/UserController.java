package in.aadi.foodiesapi.controller;

import in.aadi.foodiesapi.io.UserRequest;
import in.aadi.foodiesapi.io.UserResponse;
import in.aadi.foodiesapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse registerUser(@RequestBody UserRequest userRequest) {
        UserResponse userResponse = userService.registerUser(userRequest);
        return userResponse;
    }

}
