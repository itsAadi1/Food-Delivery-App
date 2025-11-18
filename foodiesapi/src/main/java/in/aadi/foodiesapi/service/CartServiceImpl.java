package in.aadi.foodiesapi.service;

import in.aadi.foodiesapi.entity.CartEntity;
import in.aadi.foodiesapi.io.CartRequest;
import in.aadi.foodiesapi.io.CartResponse;
import in.aadi.foodiesapi.repository.CartRepository;
import in.aadi.foodiesapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserService userService;
 public CartResponse addToCart(CartRequest request) {
     String loggedInUserId=userService.findByUserId();

    Optional<CartEntity> cartOptional= cartRepository.findByUserId(loggedInUserId);
    CartEntity cart= cartOptional.orElseGet(()-> new CartEntity(loggedInUserId,new HashMap<>()));
    Map<String, Integer> cartItems= cart.getItems();
    cartItems.put(request.getFoodId(),cartItems.getOrDefault(request.getFoodId(),0)+1);
    cart.setItems(cartItems);
    cart=cartRepository.save(cart);
    return convertToResponse(cart);
 }
 public CartResponse getCart(){
     String loggedInUserId=userService.findByUserId();
     CartEntity entity= cartRepository.findByUserId(loggedInUserId).orElse(new CartEntity(null,loggedInUserId,new HashMap<>()));
     return  convertToResponse(entity);
 }
 private CartResponse convertToResponse(CartEntity cart){
     return CartResponse.builder()
             .id(cart.getId())
             .userId(cart.getUserId())
             .items(cart.getItems())
             .build();
 }
 public void clearCart(){
     String loggedInUserId=userService.findByUserId();
     cartRepository.deleteByUserId(loggedInUserId);
 }
 public CartResponse removeFromCart(CartRequest request){
     String loggedInUserId=userService.findByUserId();
    CartEntity entity= cartRepository.findByUserId(loggedInUserId).orElseThrow(()->new RuntimeException("Cart not found"));
    Map<String, Integer> cartItems= entity.getItems();
    if(cartItems.containsKey(request.getFoodId())){
        int currentQty=cartItems.get(request.getFoodId());
        if(currentQty==0){
            cartItems.remove(request.getFoodId());
        }
        else{
            cartItems.put(request.getFoodId(),currentQty-1);
        }
        entity= cartRepository.save(entity);
    }
    return convertToResponse(entity);
 }

}
