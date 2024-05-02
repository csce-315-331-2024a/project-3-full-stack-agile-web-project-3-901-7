package com.revs.grill;

import java.util.*;

/**
 * Represents an ingredient used in a recipe or dish.
 */
public class Ingredient {
    public int _id;
    public String name;
    public int quantity;
    public int minQuantity;
    public double unitPrice;
    public String supplier;

    /**
     * Default constructor for Ingredient class.
     * Initializes all fields to default values.
     */
    public Ingredient() {
        this._id = -1;
        this.name = "";
        this.quantity = 0;
        this.minQuantity = 0;
        this.unitPrice = 0;
        this.supplier = "";
    }

    /**
     * Parameterized constructor for Ingredient class.
     * Initializes the fields with the provided values.
     * 
     * @param name        the name of the ingredient
     * @param quantity    the quantity of the ingredient
     * @param minQuantity the minimum quantity required for the ingredient
     * @param unitPrice   the unit price of the ingredient
     * @param supplier    the supplier of the ingredient
     */
    public Ingredient(String name, int quantity, int minQuantity, double unitPrice, String supplier) {
        this.name = name;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.unitPrice = unitPrice;
        this.supplier = supplier;
    }

    /**
     * Checks if the ingredient is low in stock.
     * 
     * @return true if the ingredient is low in stock, false otherwise
     */
    public boolean lowStock() {
        return (this.minQuantity >= this.quantity);
    }

    /**
     * Finds an ingredient by its ID.
     * 
     * @param id the ID of the ingredient to find
     * @return the ingredient with the specified ID, or null if not found
     */
    public static Ingredient findOneById(int id) {
        return findById(Arrays.asList(id)).get(0);
    }

    /**
     * Finds ingredients by their IDs.
     * 
     * @param ids the list of ingredient IDs to find
     * @return the list of ingredients with the specified IDs
     */
    public static List<Ingredient> findById(List<Integer> ids) {
        return Database.getIngredientsById(ids);
    }

    /**
     * Finds ingredients by their name.
     * 
     * @param searchName the name to search for
     * @return the list of ingredients with the specified name
     */
    public static List<Ingredient> findByName(String searchName) {
        return Database.getIngredientsByName(searchName);
    }

    /**
     * Removes an ingredient by its ID.
     * 
     * @param ingredientId the ID of the ingredient to remove
     * @return true if the ingredient was successfully removed, false otherwise
     */
    public static boolean removeById(int ingredientId) {
        return Database.deleteIngredient(ingredientId);
    }

    /**
     * Writes the ingredient to the database.
     * Sets the ID of the ingredient after writing.
     */
    public void write() {
        this._id = Database.insertIngredient(this);
    }

    /**
     * Updates an ingredient by its ID.
     * 
     * @param itemId         the ID of the ingredient to update
     * @param nameStr        the new name of the ingredient (optional)
     * @param quantityStr    the new quantity of the ingredient (optional)
     * @param minQuantityStr the new minimum quantity of the ingredient (optional)
     * @param unitPriceStr   the new unit price of the ingredient (optional)
     * @param supplierStr    the new supplier of the ingredient (optional)
     * @return true if the ingredient was successfully updated, false otherwise
     */
    public static boolean updateById(int itemId, String nameStr, String quantityStr, String minQuantityStr,
            String unitPriceStr, String supplierStr) {
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

    /**
     * Updates the ingredient in the database.
     * 
     * @return true if the ingredient was successfully updated, false otherwise
     */
    public boolean update() {
        return Database.editIngredient(this);
    }

    /**
     * Returns a string representation of the ingredient.
     * 
     * @return a string representation of the ingredient
     */
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
