package com.mcarballido.expresstock.controllers;

import com.mcarballido.expresstock.assemblers.ProductTypeAssembler;
import com.mcarballido.expresstock.models.ProductType;
import com.mcarballido.expresstock.services.ProductTypeService;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api")
public class ProductTypeController {

    private final ProductTypeAssembler assembler;
    private final ProductTypeService service;

    public ProductTypeController(ProductTypeAssembler assembler, ProductTypeService service) {
        this.assembler = assembler;
        this.service = service;
    }

    @GetMapping("/product_types")
    public CollectionModel<EntityModel<ProductType>> getAllProductTypes() {
        List<ProductType> productTypeList = service.getAllProductTypes();

        List<EntityModel<ProductType>> productTypeEntModList = productTypeList.stream()
            .map(assembler::toModel)
            .collect(Collectors.toList());

        return new CollectionModel<>(
            productTypeEntModList,
            linkTo(methodOn(ProductTypeController.class).getAllProductTypes()).withSelfRel()
        );
    }

    @GetMapping("/product_types/{id}")
    public EntityModel<ProductType> getProductTypeById(@PathVariable long id) {
        ProductType productType = service.getProductTypeById(id);

        return assembler.toModel(productType);
    }

    @PostMapping("/product_types")
    public ResponseEntity<?> createProductType(@RequestBody ProductType productType) {
        ProductType newProductType = service.createProductType(productType);

        EntityModel<ProductType> newProductTypeEntMod = assembler.toModel(newProductType);

        return ResponseEntity
            .created(newProductTypeEntMod.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(newProductTypeEntMod);
    }

    @PutMapping("/product_types/{id}")
    public ResponseEntity<?> updateProductTypeById(@PathVariable long id, @RequestBody ProductType productType) {
        ProductType updatedProductType = service.updateProductTypeById(id, productType);

        EntityModel<ProductType> updatedProductTypeEntMod = assembler.toModel(updatedProductType);

        return ResponseEntity
            .ok()
            .location(updatedProductTypeEntMod.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(updatedProductTypeEntMod);
    }

    @DeleteMapping("/product_types/{id}")
    public ResponseEntity<?> deleteProductTypeById(@PathVariable long id) {
        service.deleteProductTypeById(id);

        return ResponseEntity.noContent().build();
    }
    
}
