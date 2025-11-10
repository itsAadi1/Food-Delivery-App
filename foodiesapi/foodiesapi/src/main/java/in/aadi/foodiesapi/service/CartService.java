package in.aadi.foodiesapi.service;

import in.aadi.foodiesapi.io.CartRequest;
import in.aadi.foodiesapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);
    CartResponse getCart();
    void clearCart();
    CartResponse removeFromCart(CartRequest request);
}
