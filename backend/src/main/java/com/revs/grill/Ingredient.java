package com.revs.grill;
import java.util.*;

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

    public Ingredient(String name, int quantity, int minQuantity, double unitPrice, String supplier) {
        this.name = name;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.unitPrice = unitPrice;
        this.supplier = supplier;
    }
    
    public boolean lowStock() {
        return (this.minQuantity >= this.quantity);
    }
    
    public static Ingredient findOneById(int id) {
        return findById(Arrays.asList(id)).get(0);
    }
    
    public static List<Ingredient> findById(List<Integer> ids) {
        return Database.getIngredientsById(ids);
    }
    
    public static List<Ingredient> findByName(String searchName) {
        return Database.getIngredientsByName(searchName);
    }
    
    public static boolean removeById(int ingredientId) {
        return Database.deleteIngredient(ingredientId);
    }
    
    public void write() {
        this._id = Database.insertIngredient(this);
    }
    
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
        
        return Database.editIngredient(currIngredient);
    }
    
    public boolean update() {
        return Database.editIngredient(this);
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
