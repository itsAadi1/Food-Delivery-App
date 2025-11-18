package in.aadi.foodiesapi.controller;

import in.aadi.foodiesapi.io.AuthenticationRequest;
import in.aadi.foodiesapi.io.AuthenticationResponse;
import in.aadi.foodiesapi.service.AppUserDetailsService;
import in.aadi.foodiesapi.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final JwtUtil jwtTokenUtil;
    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request){
       authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
       final UserDetails userDetails=userDetailsService.loadUserByUsername(request.getEmail());
       final String jwtToken=jwtTokenUtil.generateToken(userDetails);
       return new AuthenticationResponse(request.getEmail(), jwtToken);
    }
}
