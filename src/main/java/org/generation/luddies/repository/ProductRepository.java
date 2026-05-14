package org.generation.luddies.repository;

import org.generation.luddies.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Returns only active products
    List<Product> findByIsActiveTrue();

    // Returns only purchasable products
    List<Product> findByPurchasableTrue();

    // Search by Spanish title (contains, case-insensitive)
    List<Product> findByTitleEsContainingIgnoreCase(String keyword);
}
