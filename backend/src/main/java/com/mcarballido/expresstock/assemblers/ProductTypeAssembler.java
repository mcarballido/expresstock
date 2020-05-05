package com.mcarballido.expresstock.assemblers;

import com.mcarballido.expresstock.controllers.ProductTypeController;
import com.mcarballido.expresstock.models.ProductType;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class ProductTypeAssembler implements RepresentationModelAssembler<ProductType, EntityModel<ProductType>> {

    @Override
    public EntityModel<ProductType> toModel(ProductType productType) {
        return new EntityModel<>(
            productType,
            linkTo(methodOn(ProductTypeController.class).getProductTypeById(productType.getId())).withSelfRel(),
            linkTo(methodOn(ProductTypeController.class).getAllProductTypes()).withRel("productTypes")
        );
    }
}
