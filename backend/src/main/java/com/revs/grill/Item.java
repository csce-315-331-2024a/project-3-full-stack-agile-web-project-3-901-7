package com.revs.grill;
import java.util.*;
import java.sql.Date;

/**
 *
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
     *
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
     * @return
     */
    public Item itemConstructor() {
        return new Item();
    }

    /**
     * @param name
     * @param price
     * @param category
     * @param startDate
     * @param endDate
     * @param picture
     * @param itemDesc
     */
    public Item(String name, double price, String category, Date startDate, Date endDate, String picture, String itemDesc) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.picture = picture;
        this.itemDesc= itemDesc;
    }

    /**
     * @param name
     * @param price
     * @param category
     * @param startDate
     * @param endDate
     * @param picture
     * @param itemDesc
     * @return
     */
    public Item itemConstructor2(String name, double price, String category, Date startDate, Date endDate, String picture, String itemDesc) {
        return new Item(name, price, category, startDate, endDate, picture, itemDesc);
    }

    /**
     * @param name
     * @param price
     * @param category
     * @param startDate
     * @param endDate
     * @param ingredientIds
     * @param picture
     * @param itemDesc
     */
    public Item(String name, double price, String category, Date startDate, Date endDate, List<Integer> ingredientIds, String picture, String itemDesc) {
        this(name, price, category, startDate, endDate, picture, itemDesc);
        this.ingredients = Ingredient.findById(ingredientIds);
    }

    /**
     * @param name
     * @param price
     * @param category
     * @param startDate
     * @param endDate
     * @param ingredientIds
     * @param picture
     * @param itemDesc
     * @return
     */
    public Item itemConstructor3(String name, double price, String category, Date startDate, Date endDate, List<Integer> ingredientIds, String picture, String itemDesc) {
        return new Item(name, price, category, startDate, endDate, ingredientIds, picture, itemDesc);
    }

    /**
     * @param id
     * @return
     */
    public static Item findOneById(int id) {
        return findById(Arrays.asList(id)).get(0);
    }

    /**
     * @param ids
     * @return
     */
    public static List<Item> findById(List<Integer> ids) {
        return Database.getItemsById(ids);
    }

    /**
     * @param category
     * @return
     */
    public static List<Item> findByCategory(String category) {
        return Database.getItemsByCategory(category);
    }

    /**
     * @param itemId
     * @return
     */
    public static boolean removeById(int itemId) {
        return Database.deleteItem(itemId);
    }

    /**
     * @param itemId
     * @param nameStr
     * @param priceStr
     * @param categoryStr
     * @param startDate
     * @param endDate
     * @param ingredientStr
     * @param picture
     * @param itemDesc
     * @return
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
     * @return
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
     *
     */
    public void serializeItemInfo() {
        List<String> ingNames = new ArrayList<>();
        for (Ingredient ing : ingredients)
            ingNames.add(ing.name);

        this.ingredientInfo = String.join(",", ingNames);
    }

    /**
     *
     */
    public void write() {
        this.serializeItemInfo();
        this._id = Database.insertItem(this);
    }

    /**
     * @return
     */
    public boolean update() {
        return Database.editItem(this);
    }

    /**
     * @return
     */
    public int getId() {
        return _id;
    }

    /**
     * @return
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