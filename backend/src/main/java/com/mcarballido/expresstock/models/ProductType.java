package com.mcarballido.expresstock.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class ProductType {

    @Id
    @GeneratedValue
    private long id;

    @NotNull(message = "The name of the Product Type cannot be null.")
    @NotBlank(message = "The name of the Product Type cannot be empty.")
    private String name;

    private String description;

}
