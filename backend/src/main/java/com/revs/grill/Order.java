package com.revs.grill;
import java.util.*;
import java.sql.Date;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Order {
    public int _id;
    public int numItems;
    public String orderInfo;
    public Map<Integer, Integer> itemToQuantity;
    public double total;
    public java.sql.Date dateTime;

    public Order() {
        this._id = -1;
        this.numItems = 0;
        this.orderInfo = "";
        this.itemToQuantity = new HashMap<>();
        this.total = 0;
    }

    @GetMapping("/order/constructor")
    public Order orderConstructor() {
        return new Order();
    }

    public Order(int id, int numItems, String orderInfo, Map<Integer, Integer> itemToQuantity, double total)
    {
        this._id = id;
        this.numItems = numItems;
        this.orderInfo = orderInfo;
        this.itemToQuantity = itemToQuantity;
        this.total = total;
    }

    @GetMapping("/order/constructor2")
    public Order orderConstrutor2(int id, int numItems, String orderInfo, Map<Integer, Integer> itemToQuantity, double total){
        return new Order(id, numItems, orderInfo, itemToQuantity, total);
    }

    @GetMapping("/order/serializeinfo")
    public void serializeOrderInfo() {
        List<Integer> itemIds = new ArrayList<>(itemToQuantity.keySet());
        this.numItems = 0;
        List<String> itemNames = new ArrayList<>();
        for (Item item : Item.findById(itemIds)){
            int currQuantity = itemToQuantity.containsKey(item._id) ? itemToQuantity.get(item._id) : 0;
            this.numItems += currQuantity;
            itemNames.add(item.name + "(" + currQuantity + ")");
        }
        
        this.orderInfo = String.join(",", itemNames);
    }

    @GetMapping("/order/additem")
    public void addItem(int itemId, int addQuantity) {
        Item newItem = Item.findOneById(itemId);
        this.total += newItem.price;
        this.numItems++;

        int currQuantity = itemToQuantity.containsKey(itemId) ? itemToQuantity.get(itemId) : 0;
        itemToQuantity.put(itemId, currQuantity + addQuantity);
    }

    @GetMapping("/order/getitemquantity")
    public int getItemQuantity(int itemId) {
        if (this.itemToQuantity.containsKey(itemId))
            return this.itemToQuantity.get(itemId);
        else
            return 0;
    }

    @GetMapping("/order/write")
    public void write() {
        this.serializeOrderInfo();
        this.dateTime = new java.sql.Date(System.currentTimeMillis());
        this._id = DatabaseController.insertOrder(this);
    }

    @GetMapping("/order/findall")
    public static List<Order> findAll(int limit) {
        return DatabaseController.getAllOrders(limit);
    }

    @GetMapping("/order/byid")
    public static List<Order> findById(List<Integer> orderIds) {
        return DatabaseController.getOrdersById(orderIds);
    }

    @GetMapping("/order/onebyid")
    public static Order findOneById(int orderId) {
        return findById(Arrays.asList(orderId)).get(0);
    }

    @GetMapping("/order/indaterange")
    public static List<Order> findInDateRange(Date start, Date end) {
        return DatabaseController.getOrdersByDateRange(start, end);
    }

    @GetMapping("/order/updatebyid")
    public static boolean updateById(int orderId, String numItems, String orderInfo, String total) {
        Order order = findOneById(orderId);

        if (!numItems.isEmpty())
            order.numItems = Integer.parseInt(numItems);
        if (!orderInfo.isEmpty())
            order.orderInfo = orderInfo;
        if (!total.isEmpty())
            order.total = Double.parseDouble(total);

        return DatabaseController.editOrder(order);
    }

    @GetMapping("/order/removebyid")
    public static boolean removeById(int orderId) {
        return DatabaseController.deleteOrder(Order.findOneById(orderId));
    }
    
    @Override
    public String toString() {
        return "Order{" +
                "_id=" + _id +
                ", numItems=" + numItems +
                ", items=" + itemToQuantity +
                ", total=" + total +
                ", dateTime='" + dateTime + '\'' +
                '}';
    }
}