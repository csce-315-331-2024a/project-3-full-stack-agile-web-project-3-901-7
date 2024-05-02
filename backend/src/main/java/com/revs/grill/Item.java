package com.revs.grill;

import java.util.*;
import java.sql.Date;

/**
 * The `Item` class represents an item in a menu or inventory.
 * It contains information such as the item's ID, name, price, category,
 * ingredients, start and end dates,
 * picture, and description. It also provides methods for creating, finding,
 * updating, and removing items,
 * as well as checking availability and serializing item information.
 */
public class Item {
    public int _id;
    public String name;
    public double price;
    public String category;
    public String ingredientInfo;
    public List<Ingredient> ingredients;
    public java.sql.Date startDate;
    public java.sql.Date endDate;
    public String picture;
    public String itemDesc;

    /**
     * Default constructor for the Item class.
     * Initializes the instance variables with default values.
     */
    public Item() {
        _id = -1;
        name = "";
        price = 0;
        category = "";
        ingredients = new ArrayList<>();
        startDate = null;
        endDate = null;
        picture = "";
        itemDesc = "";
    }

    /**
     * Creates a new Item object using the default constructor.
     * 
     * @return A new Item object.
     */
    public Item itemConstructor() {
        return new Item();
    }

    /**
     * Creates a new Item object with the specified parameters.
     * 
     * @param name      The name of the item.
     * @param price     The price of the item.
     * @param category  The category of the item.
     * @param startDate The start date of the item.
     * @param endDate   The end date of the item.
     * @param picture   The picture of the item.
     * @param itemDesc  The description of the item.
     */
    public Item(String name, double price, String category, Date startDate, Date endDate, String picture,
            String itemDesc) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.picture = picture;
        this.itemDesc = itemDesc;
    }

    /**
     * Creates a new Item object using the specified parameters.
     * 
     * @param name      The name of the item.
     * @param price     The price of the item.
     * @param category  The category of the item.
     * @param startDate The start date of the item.
     * @param endDate   The end date of the item.
     * @param picture   The picture of the item.
     * @param itemDesc  The description of the item.
     * @return A new Item object.
     */
    public Item itemConstructor2(String name, double price, String category, Date startDate, Date endDate,
            String picture, String itemDesc) {
        return new Item(name, price, category, startDate, endDate, picture, itemDesc);
    }

    /**
     * Creates a new Item object with the specified parameters and sets the
     * ingredients.
     * 
     * @param name          The name of the item.
     * @param price         The price of the item.
     * @param category      The category of the item.
     * @param startDate     The start date of the item.
     * @param endDate       The end date of the item.
     * @param ingredientIds The list of ingredient IDs.
     * @param picture       The picture of the item.
     * @param itemDesc      The description of the item.
     */
    public Item(String name, double price, String category, Date startDate, Date endDate, List<Integer> ingredientIds,
            String picture, String itemDesc) {
        this(name, price, category, startDate, endDate, picture, itemDesc);
        this.ingredients = Ingredient.findById(ingredientIds);
    }

    /**
     * Creates a new Item object using the specified parameters and sets the
     * ingredients.
     * 
     * @param name          The name of the item.
     * @param price         The price of the item.
     * @param category      The category of the item.
     * @param startDate     The start date of the item.
     * @param endDate       The end date of the item.
     * @param ingredientIds The list of ingredient IDs.
     * @param picture       The picture of the item.
     * @param itemDesc      The description of the item.
     * @return A new Item object.
     */
    public Item itemConstructor3(String name, double price, String category, Date startDate, Date endDate,
            List<Integer> ingredientIds, String picture, String itemDesc) {
        return new Item(name, price, category, startDate, endDate, ingredientIds, picture, itemDesc);
    }

    /**
     * Finds an item by its ID.
     * 
     * @param id The ID of the item.
     * @return The item with the specified ID.
     */
    public static Item findOneById(int id) {
        return findById(Arrays.asList(id)).get(0);
    }

    /**
     * Finds items by their IDs.
     * 
     * @param ids The list of item IDs.
     * @return The list of items with the specified IDs.
     */
    public static List<Item> findById(List<Integer> ids) {
        return Database.getItemsById(ids);
    }

    /**
     * Finds items by their category.
     * 
     * @param category The category of the items.
     * @return The list of items with the specified category.
     */
    public static List<Item> findByCategory(String category) {
        return Database.getItemsByCategory(category);
    }

    /**
     * Removes an item by its ID.
     * 
     * @param itemId The ID of the item to be removed.
     * @return true if the item was successfully removed, false otherwise.
     */
    public static boolean removeById(int itemId) {
        return Database.deleteItem(itemId);
    }

    /**
     * Updates an item by its ID with the specified parameters.
     * 
     * @param itemId        The ID of the item to be updated.
     * @param nameStr       The new name of the item.
     * @param priceStr      The new price of the item.
     * @param categoryStr   The new category of the item.
     * @param startDate     The new start date of the item.
     * @param endDate       The new end date of the item.
     * @param ingredientStr The new ingredient IDs of the item.
     * @param picture       The new picture of the item.
     * @param itemDesc      The new description of the item.
     * @return true if the item was successfully updated, false otherwise.
     */
    public static boolean updateById(int itemId, String nameStr, String priceStr, String categoryStr, Date startDate,
            Date endDate, String ingredientStr, String picture, String itemDesc) {
        Item currItem = findOneById(itemId);

        if (!nameStr.isEmpty())
            currItem.name = nameStr;
        if (!priceStr.isEmpty())
            currItem.price = Double.parseDouble(priceStr);
        if (categoryStr != null)
            currItem.category = categoryStr;
        if (!(startDate == null))
            currItem.startDate = startDate;
        if (!(endDate == null))
            currItem.endDate = endDate;
        if (!ingredientStr.isEmpty()) {
            currItem.ingredients.clear();
            List<Integer> ingredientIds = new ArrayList<>();
            for (String ingIdString : ingredientStr.split(",")) {
                ingredientIds.add(Integer.parseInt(ingIdString));
            }
            currItem.ingredients = Ingredient.findById(ingredientIds);
            currItem.serializeItemInfo();
        }
        if (!picture.isEmpty()) {
            currItem.picture = picture;
        }
        if (!itemDesc.isEmpty()) {
            currItem.itemDesc = itemDesc;
        }

        return Database.editItem(currItem);
    }

    /**
     * Checks if the item is available.
     * 
     * @return true if the item is available, false otherwise.
     */
    public boolean isAvailable() {
        for (Ingredient ingredient : ingredients) {
            if (ingredient.quantity < ingredient.minQuantity) {
                return false;
            }
        }
        Date currentDate = new java.sql.Date(System.currentTimeMillis());

        if ((category.equals("Seasonal")) &&
                (currentDate.before(startDate) || currentDate.after(endDate))) {
            return false;
        }

        return true;
    }

    /**
     * Serializes the item information.
     */
    public void serializeItemInfo() {
        List<String> ingNames = new ArrayList<>();
        for (Ingredient ing : ingredients)
            ingNames.add(ing.name);

        this.ingredientInfo = String.join(",", ingNames);
    }

    /**
     * Writes the item to the database.
     */
    public void write() {
        this.serializeItemInfo();
        this._id = Database.insertItem(this);
    }

    /**
     * Updates the item in the database.
     * 
     * @return true if the item was successfully updated, false otherwise.
     */
    public boolean update() {
        return Database.editItem(this);
    }

    /**
     * Gets the ID of the item.
     * 
     * @return The ID of the item.
     */
    public int getId() {
        return _id;
    }

    /**
     * Returns a string representation of the item.
     * 
     * @return A string representation of the item.
     */
    @Override
    public String toString() {
        return "Item{" +
                "_id=" + _id +
                ", name='" + name + '\'' +
                ", price=" + price + '\'' +
                ", category='" + category + '\'' +
                ", ingredients=" + ingredientInfo + '\'' +
                ", startDate=" + startDate + '\'' +
                ", endDate=" + endDate + '\'' +
                ", picture=" + picture + '\'' +
                ", itemDesc=" + itemDesc +
                '}';
    }
}