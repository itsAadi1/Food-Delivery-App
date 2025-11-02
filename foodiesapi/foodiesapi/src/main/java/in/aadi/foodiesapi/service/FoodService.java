package in.aadi.foodiesapi.service;

import in.aadi.foodiesapi.io.FoodRequest;
import in.aadi.foodiesapi.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface FoodService {
     Map uploadFile(MultipartFile file) throws IOException;
     FoodResponse addFood(FoodRequest foodRequest,MultipartFile file) throws IOException;
     List<FoodResponse> readFoods() throws IOException;
     FoodResponse readFood(String id) throws IOException;
     Map deleteFile(String id) throws IOException;
     boolean deleteFood(String id) throws IOException;
}
