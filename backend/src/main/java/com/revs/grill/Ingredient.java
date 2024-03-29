package com.revs.grill;
import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Ingredient {
    public int _id;
    public String name;
    public int quantity;
    public int minQuantity;
    public double unitPrice;
    public String supplier;

    public Ingredient() {
        this._id = -1;
        this.name = "";
        this.quantity = 0;
        this.minQuantity = 0;
        this.unitPrice = 0;
        this.supplier = "";
    }

    @GetMapping("/ingredient/constructor")
    public Ingredient ingredientConstructor() {
        return new Ingredient();
    }

    public Ingredient(String name, int quantity, int minQuantity, double unitPrice, String supplier) {
        this.name = name;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.unitPrice = unitPrice;
        this.supplier = supplier;
    }

    @GetMapping("/ingredient/constructor2")
    public Ingredient ingredientConstructor2(String name, int quantity, int minQuantity, double unitPrice, String supplier) {
        return new Ingredient(name, quantity, minQuantity, unitPrice, supplier);
    }

    @GetMapping("/ingredient/lowstock")
    public boolean lowStock() {
        return (this.minQuantity >= this.quantity);
    }

    @GetMapping("/ingredient/onebyid")
    public static Ingredient findOneById(int id) {
        return findById(Arrays.asList(id)).get(0);
    }

    @GetMapping("/ingredient/byid")
    public static List<Ingredient> findById(List<Integer> ids) {
        return DatabaseController.getIngredientsById(ids);
    }

    @GetMapping("/ingredient/removebyid")
    public static boolean removeById(int ingredientId) {
        return DatabaseController.deleteIngredient(ingredientId);
    }

    @GetMapping("/ingredient/byname")
    public static List<Ingredient> findByName(String searchName) {
        return DatabaseController.getIngredientsByName(searchName);
    }

    @GetMapping("/ingredient/write")
    public void write() {
        this._id = DatabaseController.insertIngredient(this);
    }

    @GetMapping("/ingredient/updatebyid")
    public static boolean updateById(int itemId, String nameStr, String quantityStr, String minQuantityStr, String unitPriceStr, String supplierStr) {
        Ingredient currIngredient = findOneById(itemId);

        if (nameStr != null && !nameStr.isEmpty())
            currIngredient.name = nameStr;
        if (minQuantityStr != null && !minQuantityStr.isEmpty())
            currIngredient.minQuantity = Integer.parseInt(minQuantityStr);
        if (quantityStr != null && !quantityStr.isEmpty())
            currIngredient.quantity = Integer.parseInt(quantityStr);
        if (unitPriceStr != null && !unitPriceStr.isEmpty())
            currIngredient.unitPrice = Double.parseDouble(unitPriceStr);
        if (supplierStr != null && !supplierStr.isEmpty())
            currIngredient.supplier = supplierStr;
        
        return DatabaseController.editIngredient(currIngredient);
    }

    @GetMapping("/ingredient/update")
    public boolean update() {
        return DatabaseController.editIngredient(this);
    }

    @Override
    public String toString() {
        return "Ingredient{" +
                "_id=" + _id +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", minQuantity=" + minQuantity +
                ", unitPrice=" + unitPrice +
                ", supplier='" + supplier + '\'' +
                '}';
    }
}
