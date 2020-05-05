package com.mcarballido.expresstock.repositories;

import com.mcarballido.expresstock.models.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
}
