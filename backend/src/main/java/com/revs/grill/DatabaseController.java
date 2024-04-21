package com.revs.grill;

import java.sql.*;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.apache.commons.lang3.tuple.MutablePair;

class ResponseStatus {
    public boolean success;

    public ResponseStatus(boolean status) {
        success = status;
    }

    public ResponseStatus(int status) {
        success = status > 0;
    }
}

class AuthBody {
    String email;
    String password;
}

class UserInsertBody {
    UserInfo userInfo;
    String password;
}

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DatabaseController {

    public DatabaseController() {
        Database.createConnection();
    }

    @GetMapping("/user/findAll")
    public static List<UserInfo> getAllUsers() {
        return User.toInfoList(Database.getAllUsers());
    }

    @GetMapping("/user/findById")
    public static List<UserInfo> getUsersById(@RequestParam("userIds") List<Integer> userIds) {
        return User.toInfoList(Database.getUsersById(userIds));
    }

    @GetMapping("/user/findOneById")
    public static UserInfo getOneUserById(@RequestParam("userId") int userId) {
        List<Integer> userIds = new ArrayList<>();
        userIds.add(userId);

        return User.toInfoList(Database.getUsersById(userIds)).get(0);
    }

    @PostMapping("/user/login")
    public static UserInfo authenticateUser(@RequestBody AuthBody auth) {
        return Database.authenticateUser(auth.email, auth.password);
    }

    @PostMapping("/user/signup")
    public static ResponseStatus insertUser(@RequestBody UserInsertBody body) {
        return new ResponseStatus(Database.insertUser(new User(body.userInfo), body.password));
    }

    @GetMapping("/role/findAll")
    public static List<Role> getAllRoles() {
        return Database.getAllRoles();
    }

    @GetMapping("/role/findByEmail")
    public static Role getRoleByEmail(@RequestParam String email) {
        return Database.getRoleByEmail(email);
    }

    @PostMapping("/role/insert")
    public static ResponseStatus insertRole(@RequestBody Role role) {
        return new ResponseStatus(Database.insertRole(role));
    }

    @PostMapping("/role/edit")
    public static ResponseStatus editRole(@RequestBody Role role) {
        return new ResponseStatus(Database.editRole(role));
    }

    @PostMapping("/role/delete")
    public static ResponseStatus deleteRole(@RequestBody Role role) {
        return new ResponseStatus(Database.deleteRole(role));
    }

    @GetMapping("/item/findAll")
    public static List<Item> getAllItems() {
        return Database.getAllItems();
    }

    @GetMapping("/item/findById")
    public static List<Item> getItemsById(@RequestParam("itemIds") List<Integer> itemIds) {
        return Database.getItemsById(itemIds);
    }

    @GetMapping("/item/findOneById")
    public static Item getOneItemById(@RequestParam("itemId") int itemId) {
        return Item.findOneById(itemId);
    }

    @GetMapping("/item/findByCategory")
    public static List<Item> getItemsById(@RequestParam("category") String category) {
        return Database.getItemsByCategory(category);
    }

    @PostMapping("/item/insert")
    public static ResponseStatus insertItem(@RequestBody Item item) {
        return new ResponseStatus(Database.insertItem(item));
    }

    @PostMapping("/item/edit")
    public static ResponseStatus editItem(@RequestBody Item item) {
        return new ResponseStatus(Database.editItem(item));
    }

    @PostMapping("/item/deleteById")
    public static ResponseStatus deleteItem(@RequestParam("itemId") int itemId) {
        return new ResponseStatus(Database.deleteItem(itemId));
    }

    @GetMapping("/item/sellsTogether")
    public static List<MutablePair<MutablePair<Item, Item>, Integer>> getSellsTog(@RequestParam("start") Date start,
            @RequestParam("end") Date end) {
        return getSellsTog(start, end);
    }

    @PostMapping("/order/insert")
    public static ResponseStatus insertOrder(@RequestBody Order order) {
        return new ResponseStatus(Database.insertOrder(order));
    }

    @PostMapping("/order/edit")
    public static ResponseStatus editOrder(@RequestParam("order") Order order) {
        return new ResponseStatus(Database.editOrder(order));
    }

    @PostMapping("/order/deleteById")
    public static ResponseStatus deleteOrder(@RequestParam("order") Order order) {
        return new ResponseStatus(Database.deleteOrder(order));
    }

    @GetMapping("/order/findAll")
    public static List<Order> getAllOrders(@RequestParam("limit") int limit) {
        return Database.getAllOrders(limit);
    }

    @GetMapping("/order/findInDateRange")
    public static List<Order> getOrdersByDateRange(@RequestParam("start") Date start, @RequestParam("end") Date end) {
        return Database.getOrdersByDateRange(start, end);
    }

    @GetMapping("/order/findById")
    public static List<Order> getOrdersById(@RequestParam("orderIds") List<Integer> orderIds) {
        return Database.getOrdersById(orderIds);
    }

    @GetMapping("/order/findOneById")
    public static Order getOneOrderById(@RequestParam("orderId") int orderId) {
        return Order.findOneById(orderId);
    }

    @GetMapping("/ingredient/findAll")
    public static List<Ingredient> getAllIngredients() {
        return Database.getAllIngredients();
    }

    @GetMapping("/ingredient/findById")
    public static List<Ingredient> getIngredientsById(@RequestParam("ingredientIds") List<Integer> ingredientIds) {
        return Database.getIngredientsById(ingredientIds);
    }

    @GetMapping("/ingredient/findOneById")
    public static Ingredient getOneIngredientById(@RequestParam("ingredientId") int ingredientId) {
        return Ingredient.findOneById(ingredientId);
    }

    @GetMapping("/ingredient/findByName")
    public static List<Ingredient> getIngredientsByName(@RequestParam("ingredientName") String ingredientName) {
        return Database.getIngredientsByName(ingredientName);
    }

    @PostMapping("/ingredient/insert")
    public static int insertIngredient(@RequestBody Ingredient ingredient) {
        return Database.insertIngredient(ingredient);
    }

    @PostMapping("/ingredient/edit")
    public static boolean editIngredient(@RequestBody Ingredient ingredient) {
        return Database.editIngredient(ingredient);
    }

    @PostMapping("/ingredient/deleteById")
    public static boolean deleteIngredient(@RequestParam("ingredientId") int ingredientId) {
        return Database.deleteIngredient(ingredientId);
    }

    @GetMapping("/ingredient/findExcess")
    public static List<Ingredient> getExcessIngredients(@RequestParam("start") Date start) {
        return Database.getExcessIngredients(start);
    }

    @GetMapping("/inventoryUsed")
    public static Map<String, Integer> getAmtInventoryUsed(@RequestParam("start") Date start,
            @RequestParam("end") Date end) {
        return Database.getAmtInventoryUsed(start, end);
    }

    @GetMapping("/salesReport")
    public static Map<String, Double> getSalesReport(@RequestParam("start") Date start, @RequestParam("end") Date end) {
        return Database.getSalesReport(start, end);
    }
}
