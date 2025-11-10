package in.aadi.foodiesapi.service;

import com.razorpay.RazorpayException;
import in.aadi.foodiesapi.io.OrderRequest;
import in.aadi.foodiesapi.io.OrderResponse;

public interface OrderService {
   OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException;
}
