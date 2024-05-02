package com.revs.grill;

import java.util.*;
import java.sql.Date;

public class Order {
    public int _id;
    public int numItems;
    public String orderInfo;
    public Map<Integer, Integer> itemToQuantity;
    public double total;
    public java.sql.Date dateTime;
    public String status; // completed, in progress, received, null

    public Order() {
        this._id = -1;
        this.numItems = 0;
        this.orderInfo = "";
        this.itemToQuantity = new HashMap<>();
        this.total = 0;
        this.status = null;
    }

    public Order orderConstructor() {
        return new Order();
    }

    public Order(int id, int numItems, String orderInfo, Map<Integer, Integer> itemToQuantity, double total, String status) {
        this._id = id;
        this.numItems = numItems;
        this.orderInfo = orderInfo;
        this.itemToQuantity = itemToQuantity;
        this.total = total;
        this.status = status;
    }

    public Order orderConstrutor2(int id, int numItems, String orderInfo, Map<Integer, Integer> itemToQuantity,
            double total, String status) {
        return new Order(id, numItems, orderInfo, itemToQuantity, total, status);
    }

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

    public void addItem(int itemId, int addQuantity) {
        Item newItem = Item.findOneById(itemId);
        this.total += newItem.price;
        this.numItems++;

        int currQuantity = itemToQuantity.containsKey(itemId) ? itemToQuantity.get(itemId) : 0;
        itemToQuantity.put(itemId, currQuantity + addQuantity);
    }

    public int getItemQuantity(int itemId) {
        if (this.itemToQuantity.containsKey(itemId))
            return this.itemToQuantity.get(itemId);
        else
            return 0;
    }

    public void write() {
        this.serializeOrderInfo();
        this.dateTime = new java.sql.Date(System.currentTimeMillis());
        this._id = Database.insertOrder(this);
    }

    public static List<Order> findAll(int limit) {
        return Database.getAllOrders(limit);
    }

    public static List<Order> findById(List<Integer> orderIds) {
        return Database.getOrdersById(orderIds);
    }

    public static Order findOneById(int orderId) {
        return findById(Arrays.asList(orderId)).get(0);
    }

    public static List<Order> findInDateRange(Date start, Date end) {
        return Database.getOrdersByDateRange(start, end);
    }

    public static List<Order> findByStatus(String status) {
        return Database.getOrdersByStatus(status);
    }

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

    public static boolean removeById(int orderId) {
        return Database.deleteOrder(Order.findOneById(orderId));
    }

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