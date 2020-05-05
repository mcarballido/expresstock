package com.mcarballido.expresstock.services;

import com.mcarballido.expresstock.models.ProductType;

import java.util.List;

public interface ProductTypeService {

    List<ProductType> getAllProductTypes();
    ProductType getProductTypeById(long id);
    ProductType createProductType(ProductType productType);
    ProductType updateProductTypeById(long id, ProductType productType);
    void deleteProductTypeById(long id);
}
