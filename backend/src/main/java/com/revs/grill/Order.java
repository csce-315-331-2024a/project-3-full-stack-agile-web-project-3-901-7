package com.revs.grill;

import java.util.*;
import java.sql.Date;

/**
 * Represents an order in the system.
 */
public class Order {
    public int _id;
    public int numItems;
    public String orderInfo;
    public Map<Integer, Integer> itemToQuantity;
    public double total;
    public java.sql.Date dateTime;
    public String status; // completed, in progress, received, null

    /**
     * Default constructor for the Order class.
     */
    public Order() {
        this._id = -1;
        this.numItems = 0;
        this.orderInfo = "";
        this.itemToQuantity = new HashMap<>();
        this.total = 0;
        this.status = null;
    }

    /**
     * Creates a new Order object using the default constructor.
     * 
     * @return The newly created Order object.
     */
    public Order orderConstructor() {
        return new Order();
    }

    /**
     * Creates a new Order object with the specified parameters.
     * 
     * @param id             The ID of the order.
     * @param numItems       The number of items in the order.
     * @param orderInfo      Additional information about the order.
     * @param itemToQuantity A map of item IDs to their quantities in the order.
     * @param total          The total cost of the order.
     * @param status         The status of the order.
     */
    public Order(int id, int numItems, String orderInfo, Map<Integer, Integer> itemToQuantity, double total,
            String status) {
        this._id = id;
        this.numItems = numItems;
        this.orderInfo = orderInfo;
        this.itemToQuantity = itemToQuantity;
        this.total = total;
        this.status = status;
    }

    /**
     * Creates a new Order object with the specified parameters.
     * 
     * @param id             The ID of the order.
     * @param numItems       The number of items in the order.
     * @param orderInfo      Additional information about the order.
     * @param itemToQuantity A map of item IDs to their quantities in the order.
     * @param total          The total cost of the order.
     * @param status         The status of the order.
     * @return The newly created Order object.
     */
    public Order orderConstrutor2(int id, int numItems, String orderInfo, Map<Integer, Integer> itemToQuantity,
            double total, String status) {
        return new Order(id, numItems, orderInfo, itemToQuantity, total, status);
    }

    /**
     * Serializes the order information by generating a comma-separated string of
     * item names and quantities.
     */
    public void serializeOrderInfo() {
        List<Integer> itemIds = new ArrayList<>(itemToQuantity.keySet());
        this.numItems = 0;
        List<String> itemNames = new ArrayList<>();
        for (Item item : Item.findById(itemIds)) {
            int currQuantity = itemToQuantity.containsKey(item._id) ? itemToQuantity.get(item._id) : 0;
            this.numItems += currQuantity;
            itemNames.add(item.name + "(" + currQuantity + ")");
        }

        this.orderInfo = String.join(",", itemNames);
    }

    /**
     * Adds an item to the order with the specified item ID and quantity.
     * 
     * @param itemId      The ID of the item to add.
     * @param addQuantity The quantity of the item to add.
     */
    public void addItem(int itemId, int addQuantity) {
        Item newItem = Item.findOneById(itemId);
        this.total += newItem.price;
        this.numItems++;

        int currQuantity = itemToQuantity.containsKey(itemId) ? itemToQuantity.get(itemId) : 0;
        itemToQuantity.put(itemId, currQuantity + addQuantity);
    }

    /**
     * Retrieves the quantity of the item with the specified item ID in the order.
     * 
     * @param itemId The ID of the item.
     * @return The quantity of the item in the order.
     */
    public int getItemQuantity(int itemId) {
        if (this.itemToQuantity.containsKey(itemId))
            return this.itemToQuantity.get(itemId);
        else
            return 0;
    }

    /**
     * Writes the order to the database by serializing the order information,
     * setting the date and time, and inserting it into the database.
     */
    public void write() {
        this.serializeOrderInfo();
        this.dateTime = new java.sql.Date(System.currentTimeMillis());
        this._id = Database.insertOrder(this);
    }

    /**
     * Retrieves a list of orders from the database with the specified limit.
     * 
     * @param limit The maximum number of orders to retrieve.
     * @return A list of orders.
     */
    public static List<Order> findAll(int limit) {
        return Database.getAllOrders(limit);
    }

    /**
     * Retrieves a list of orders from the database with the specified order IDs.
     * 
     * @param orderIds The IDs of the orders to retrieve.
     * @return A list of orders.
     */
    public static List<Order> findById(List<Integer> orderIds) {
        return Database.getOrdersById(orderIds);
    }

    /**
     * Retrieves an order from the database with the specified order ID.
     * 
     * @param orderId The ID of the order to retrieve.
     * @return The order with the specified ID.
     */
    public static Order findOneById(int orderId) {
        return findById(Arrays.asList(orderId)).get(0);
    }

    /**
     * Retrieves a list of orders from the database within the specified date range.
     * 
     * @param start The start date of the range.
     * @param end   The end date of the range.
     * @return A list of orders within the date range.
     */
    public static List<Order> findInDateRange(Date start, Date end) {
        return Database.getOrdersByDateRange(start, end);
    }

    /**
     * Retrieves a list of orders from the database with the specified status.
     * 
     * @param status The status of the orders to retrieve.
     * @return A list of orders with the specified status.
     */
    public static List<Order> findByStatus(String status) {
        return Database.getOrdersByStatus(status);
    }

    /**
     * Updates the order with the specified order ID using the provided information.
     * 
     * @param orderId   The ID of the order to update.
     * @param numItems  The new number of items in the order.
     * @param orderInfo The new additional information about the order.
     * @param total     The new total cost of the order.
     * @return True if the order was successfully updated, false otherwise.
     */
    public static boolean updateById(int orderId, String numItems, String orderInfo, String total) {
        Order order = findOneById(orderId);

        if (!numItems.isEmpty())
            order.numItems = Integer.parseInt(numItems);
        if (!orderInfo.isEmpty())
            order.orderInfo = orderInfo;
        if (!total.isEmpty())
            order.total = Double.parseDouble(total);

        return Database.editOrder(order);
    }

    /**
     * Removes the order with the specified order ID from the database.
     * 
     * @param orderId The ID of the order to remove.
     * @return True if the order was successfully removed, false otherwise.
     */
    public static boolean removeById(int orderId) {
        return Database.deleteOrder(Order.findOneById(orderId));
    }

    /**
     * Returns a string representation of the Order object.
     * 
     * @return A string representation of the Order object.
     */
    @Override
    public String toString() {
        return "Order{" +
                "_id=" + _id +
                ", numItems=" + numItems +
                ", items=" + itemToQuantity +
                ", total=" + total +
                ", dateTime='" + dateTime + '\'' +
                ", orderInfo='" + orderInfo + '\'' +
                ", status='" + status +
                '}';
    }
}