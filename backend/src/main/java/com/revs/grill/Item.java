package com.revs.grill;
import java.util.*;
import java.sql.Date;

public class Item {
    public int _id;
    public String name;
    public double price;
    public String category;
    public String ingredientInfo;
    public List<Ingredient> ingredients;
    public java.sql.Date startDate;
    public java.sql.Date endDate;

    public Item() {
        _id = -1;
        name = "";
        price = 0;
        category = "";
        ingredients = new ArrayList<>();
        startDate = null;
        endDate = null;
    }
    
    public Item itemConstructor() {
        return new Item();
    }

    
    public Item(String name, double price, String category, Date startDate, Date endDate) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    
    public Item itemConstructor2(String name, double price, String category, Date startDate, Date endDate) {
        return new Item(name, price, category, startDate, endDate);
    }

    
    public Item(String name, double price, String category, Date startDate, Date endDate, List<Integer> ingredientIds) {
        this(name, price, category, startDate, endDate);
        this.ingredients = Ingredient.findById(ingredientIds);
    }
    
    public Item itemConstructor3(String name, double price, String category, Date startDate, Date endDate, List<Integer> ingredientIds) {
        return new Item(name, price, category, startDate, endDate, ingredientIds);
    } 
    
    public static Item findOneById(int id) {
        return findById(Arrays.asList(id)).get(0);
    }
    
    public static List<Item> findById(List<Integer> ids) {
        return Database.getItemsById(ids);
    }
    
    public static boolean removeById(int itemId) {
        return Database.deleteItem(itemId);
    }
    
    public static boolean updateById(int itemId, String nameStr, String priceStr, String categoryStr, Date startDate,
            Date endDate, String ingredientStr) {
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

        return Database.editItem(currItem);
    }

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

    public void serializeItemInfo() {
        List<String> ingNames = new ArrayList<>();
        for (Ingredient ing : ingredients)
            ingNames.add(ing.name);

        this.ingredientInfo = String.join(",", ingNames);
    }

    public void write() {
        this.serializeItemInfo();
        this._id = Database.insertItem(this);
    }

    public boolean update() {
        return Database.editItem(this);
    }

    public int getId() {
        return _id;
    }

    @Override
    public String toString() {
        return "Item{" +
                "_id=" + _id +
                ", name='" + name + '\'' +
                ", price=" + price + '\'' +
                ", category='" + category + '\'' +
                ", ingredients=" + ingredientInfo + '\'' +
                ", startDate=" + startDate + '\'' +
                ", endDate=" + endDate +
                '}';
    }
}