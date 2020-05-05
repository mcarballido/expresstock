package com.mcarballido.expresstock.services;

import com.mcarballido.expresstock.models.ProductType;
import com.mcarballido.expresstock.repositories.ProductTypeRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {

    private final ProductTypeRepository repository;

    public ProductTypeServiceImpl(ProductTypeRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ProductType> getAllProductTypes() {
        return repository.findAll();
    }

    @Override
    public ProductType getProductTypeById(long id) {
        return repository.findById(id).orElseThrow(() ->
            new EntityNotFoundException("Could not find a product type for the provided ID.")
        );
    }

    @Override
    public ProductType createProductType(ProductType productType) {
        return repository.save(productType);
    }

    @Override
    public ProductType updateProductTypeById(long id, ProductType productType) {
        ProductType existingProductType = repository.findById(id).orElseThrow(() ->
            new EntityNotFoundException("Could not find a product type for the provided ID.")
        );

        existingProductType.setName(productType.getName());
        existingProductType.setDescription(productType.getDescription());

        return repository.save(existingProductType);
    }

    @Override
    public void deleteProductTypeById(long id) {
        repository.deleteById(id);
    }
}
