package org.generation.luddies.service;

import org.generation.luddies.model.ProductCategory;
import org.generation.luddies.model.ProductCategoryId;
import org.generation.luddies.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public List<ProductCategory> getAll() { return productCategoryRepository.findAll(); }

    public List<ProductCategory> getByProduct(Long productId) {
        return productCategoryRepository.findByProductId(productId);
    }

    public List<ProductCategory> getByCategory(Integer categoryId) {
        return productCategoryRepository.findByCategoryId(categoryId);
    }

    public ProductCategory save(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }

    public void delete(ProductCategoryId id) { productCategoryRepository.deleteById(id); }
}
