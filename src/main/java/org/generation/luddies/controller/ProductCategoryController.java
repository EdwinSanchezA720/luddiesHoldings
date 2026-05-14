package org.generation.luddies.controller;

import org.generation.luddies.model.ProductCategory;
import org.generation.luddies.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-categories")
public class ProductCategoryController {

    @Autowired
    private ProductCategoryService productCategoryService;

    @GetMapping
    public List<ProductCategory> getAll() { return productCategoryService.getAll(); }

    @GetMapping("/product/{productId}")
    public List<ProductCategory> getByProduct(@PathVariable Long productId) {
        return productCategoryService.getByProduct(productId);
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductCategory> getByCategory(@PathVariable Integer categoryId) {
        return productCategoryService.getByCategory(categoryId);
    }

    @PostMapping
    public ProductCategory create(@RequestBody ProductCategory productCategory) {
        return productCategoryService.save(productCategory);
    }

    @DeleteMapping("/product/{productId}")
    public void deleteByProduct(@PathVariable Long productId) {
        productCategoryService.deleteByProductId(productId);
    }
}
