package in.aadi.foodiesapi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.aadi.foodiesapi.entity.FoodEntity;
import in.aadi.foodiesapi.io.FoodRequest;
import in.aadi.foodiesapi.io.FoodResponse;
import in.aadi.foodiesapi.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private Cloudinary cloudinary;
 @Autowired
    private FoodRepository foodRepository;
    /**
     * Uploads a file to Cloudinary
     *
     * @param file MultipartFile to upload
     * @return Map containing Cloudinary response (url, public_id, etc.)
     * @throws IOException if upload fails
     */
    public Map uploadFile(MultipartFile file) throws IOException {
        // "resource_type":"auto" allows uploading images, videos, and other files
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("resource_type", "auto"));
    }

    /**
     * Optional: Delete a file from Cloudinary by public_id
     *
     * @param publicId the public_id of the file to delete
     * @return Map containing deletion response
     * @throws IOException if deletion fails
     */
    public Map deleteFile(String publicId) throws IOException {
        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
    public FoodResponse addFood(FoodRequest foodRequest, MultipartFile file) throws IOException {
      FoodEntity foodEntity=convertToEntity(foodRequest);
      String imageUrl=String.valueOf(uploadFile(file).get("secure_url"));
      foodEntity.setImageUrl(imageUrl);
       foodEntity =foodRepository.save(foodEntity);
       return convertToResponse(foodEntity);
    }
   private FoodEntity convertToEntity(FoodRequest foodRequest) {
        return FoodEntity.builder()
                .name(foodRequest.getName())
                .description(foodRequest.getDescription())
                .category(foodRequest.getCategory())
                .price(foodRequest.getPrice())
                .build();
   }

   private FoodResponse convertToResponse(FoodEntity foodEntity) {
        return FoodResponse.builder()
                .id(foodEntity.getId())
                .name(foodEntity.getName())
                .description(foodEntity.getDescription())
                .category(foodEntity.getCategory())
                .price(foodEntity.getPrice())
                .imageUrl(foodEntity.getImageUrl())
                .build();
   }
   public List<FoodResponse> readFoods() throws IOException {
        List<FoodEntity> foodEntities = foodRepository.findAll();
       return foodEntities.stream().map(object -> convertToResponse(object)).collect(Collectors.toList());
   }
   public FoodResponse readFood(String id) throws IOException {
        FoodEntity foodEntity = foodRepository.findById(id).orElseThrow(()-> new RuntimeException("Food Not Found"));
        return convertToResponse(foodEntity);
   }

    public boolean deleteFood(String id) throws IOException {
        if (foodRepository.existsById(id)) {
            FoodEntity food = foodRepository.findById(id).get();
            String imageUrl = food.getImageUrl();

            // Extract public_id from the image URL (if you stored it separately, use that instead)
            String publicId = extractPublicId(imageUrl);

            // Delete the image from Cloudinary
            deleteFile(publicId);

            // Delete the database record
            foodRepository.deleteById(id);
            return true;
        }
        return false;
    }
    private String extractPublicId(String imageUrl) {
        // Example URL: https://res.cloudinary.com/demo/image/upload/v1234567/sample.jpg
        String[] parts = imageUrl.split("/");
        String filename = parts[parts.length - 1]; // sample.jpg
        return filename.substring(0, filename.lastIndexOf('.')); // sample
    }

}
