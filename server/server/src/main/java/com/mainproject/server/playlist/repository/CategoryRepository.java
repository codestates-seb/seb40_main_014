package com.mainproject.server.playlist.repository;

import com.mainproject.server.playlist.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByCategory(String category);
}
