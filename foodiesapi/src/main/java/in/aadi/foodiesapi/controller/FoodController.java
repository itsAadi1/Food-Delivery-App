package in.aadi.foodiesapi.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.aadi.foodiesapi.io.FoodRequest;
import in.aadi.foodiesapi.io.FoodResponse;
import in.aadi.foodiesapi.service.FoodService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
@CrossOrigin("*")
public class FoodController {
    private final FoodService foodService;
    @PostMapping
    public FoodResponse addFood(@RequestPart("food") String foodJson, @RequestPart("file") MultipartFile file){
        ObjectMapper mapper = new ObjectMapper();
        FoodRequest request=null;
        try{
            request=mapper.readValue(foodJson,FoodRequest.class);
        } catch(JsonProcessingException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid food json");
        }
        FoodResponse response= null;
        try {
            response = foodService.addFood(request,file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return response;
    }
    @GetMapping
    public List<FoodResponse> readFoods(){
        try {
            return foodService.readFoods();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/{id}")
    public  FoodResponse readFood(@PathVariable String id){
        try {
            return foodService.readFood(id);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @DeleteMapping("/file/{fileId}")
    public boolean deleteFile(@PathVariable String fileId) {
        try {
            foodService.deleteFile(fileId);
            return true;
        } catch (IOException e) {
            return false;
        }
    }
     @DeleteMapping("/{id}")
    public boolean deleteFood(@PathVariable String id) {
        try {
            foodService.deleteFood(id);
            return true;
        }
        catch (IOException e) {
            return false;
        }
    }
}
