package com.revs.grill;

import java.sql.*;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.apache.commons.lang3.tuple.MutablePair;

/**
 *
 */
class ResponseStatus {
    public boolean success;

    /**
     * @param status
     */
    public ResponseStatus(boolean status) {
        success = status;
    }

    /**
     * @param status
     */
    public ResponseStatus(int status) {
        success = status > 0;
    }
}

/**
 *
 */
class AuthBody {
    public String email;
    public String password;
}

/**
 *
 */
class UserInsertBody {
    public UserInfo userInfo;
    public String password;

    /**
     *
     */
    public UserInsertBody() {
        this.userInfo = new UserInfo();
        this.password = "";
    }

    /**
     * @param userInfo
     * @param password
     */
    public UserInsertBody(UserInfo userInfo, String password) {
        this.userInfo = userInfo;
        this.password = password;
    }
}


/**
 *
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DatabaseController {
    private static final int NUM_STATIONS = 5;
    private static boolean[] isHelpNeeded = new boolean[NUM_STATIONS]; 
    private static Random random = new Random();

    /**
     *
     */
    public DatabaseController() {
        Database.createConnection();
    }

    /**
     * @return
     */
    @GetMapping("/user/findAll")
    public static List<UserInfo> getAllUsers() {
        return User.toInfoList(Database.getAllUsers());
    }

    /**
     * @param userIds
     * @return
     */
    @GetMapping("/user/findById")
    public static List<UserInfo> getUsersById(@RequestParam("userIds") List<Integer> userIds) {
        return User.toInfoList(Database.getUsersById(userIds));
    }

    /**
     * @param userId
     * @return
     */
    @GetMapping("/user/findOneById")
    public static UserInfo getOneUserById(@RequestParam("userId") int userId) {
        List<Integer> userIds = new ArrayList<>();
        userIds.add(userId);

        return User.toInfoList(Database.getUsersById(userIds)).get(0);
    }

    /**
     * @param auth
     * @return
     */
    @PostMapping("/user/login")
    public static UserInfo authenticateUser(@RequestBody AuthBody auth) {
        return Database.authenticateUser(auth.email, auth.password);
    }

    /**
     * @param body
     * @return
     */
    @PostMapping("/user/signup")
    public static ResponseStatus insertUser(@RequestBody UserInsertBody body) {
        return new ResponseStatus(Database.insertUser(new User(body.userInfo), body.password));
    }

    /**
     * @return
     */
    @GetMapping("/role/findAll")
    public static List<Role> getAllRoles() {
        return Database.getAllRoles();
    }

    /**
     * @param email
     * @return
     */
    @GetMapping("/role/findByEmail")
    public static Role getRoleByEmail(@RequestParam String email) {
        return Database.getRoleByEmail(email);
    }

    /**
     * @param role
     * @return
     */
    @PostMapping("/role/insert")
    public static ResponseStatus insertRole(@RequestBody Role role) {
        return new ResponseStatus(Database.insertRole(role));
    }

    /**
     * @param role
     * @return
     */
    @PostMapping("/role/edit")
    public static ResponseStatus editRole(@RequestBody Role role) {
        return new ResponseStatus(Database.editRole(role));
    }

    /**
     * @param role
     * @return
     */
    @PostMapping("/role/delete")
    public static ResponseStatus deleteRole(@RequestBody Role role) {
        return new ResponseStatus(Database.deleteRole(role));
    }

    /**
     * @return
     */
    @GetMapping("/log/findAll")
    public static List<WorkLog> getAllWorkLogs() {
        return Database.getAllWorkLogs();
    }

    /**
     * @param ids
     * @return
     */
    @GetMapping("/log/findById")
    public static List<WorkLog> getLogById(@RequestParam("ids") List<Integer> ids) {
        return Database.getLogById(ids);
    }

    /**
     * @param wl
     * @return
     */
    @PostMapping("/log/insert")
    public static ResponseStatus insertWorkLog(@RequestBody WorkLog wl) {
        return new ResponseStatus(Database.insertWorkLog(wl));
    }

    /**
     * @param wl
     * @return
     */
    @PostMapping("/log/edit")
    public static ResponseStatus editWorkLog(@RequestBody WorkLog wl) {
        return new ResponseStatus(Database.editWorkLog(wl));
    }

    /**
     * @return
     */
    @GetMapping("/item/findAll")
    public static List<Item> getAllItems() {
        return Database.getAllItems();
    }

    /**
     * @return
     */
    @GetMapping("/item/findAllAvailable")
    public static List<Item> getAllAvailableItems() {
        return Database.getAllAvailableItems();
    }

    /**
     * @param itemIds
     * @return
     */
    @GetMapping("/item/findById")
    public static List<Item> getItemsById(@RequestParam("itemIds") List<Integer> itemIds) {
        return Database.getItemsById(itemIds);
    }

    /**
     * @param itemId
     * @return
     */
    @GetMapping("/item/findOneById")
    public static Item getOneItemById(@RequestParam("itemId") int itemId) {
        return Item.findOneById(itemId);
    }

    /**
     * @param category
     * @return
     */
    @GetMapping("/item/findByCategory")
    public static List<Item> getItemsById(@RequestParam("category") String category) {
        return Database.getItemsByCategory(category);
    }

    /**
     * @param item
     * @return
     */
    @PostMapping("/item/insert")
    public static ResponseStatus insertItem(@RequestBody Item item) {
        return new ResponseStatus(Database.insertItem(item));
    }

    /**
     * @param item
     * @return
     */
    @PostMapping("/item/edit")
    public static ResponseStatus editItem(@RequestBody Item item) {
        return new ResponseStatus(Database.editItem(item));
    }

    /**
     * @param itemId
     * @return
     */
    @PostMapping("/item/deleteById")
    public static ResponseStatus deleteItem(@RequestParam("itemId") int itemId) {
        return new ResponseStatus(Database.deleteItem(itemId));
    }

    /**
     * @param order
     * @return
     */
    @PostMapping("/order/insert")
    public static ResponseStatus insertOrder(@RequestBody Order order) {
        if (order.numItems > 0)
        {
            return new ResponseStatus(Database.insertOrder(order));
        }
        return new ResponseStatus(false);
    }

    /**
     * @param order
     * @return
     */
    @PostMapping("/order/edit")
    public static ResponseStatus editOrder(@RequestBody Order order) {
        return new ResponseStatus(Database.editOrder(order));
    }

    /**
     * @param orderId
     * @return
     */
    @PostMapping("/order/deleteById")
    public static ResponseStatus deleteOrder(@RequestParam("orderId") int orderId) {
        return new ResponseStatus(Database.deleteOrder(Order.findOneById(orderId)));
    }

    /**
     * @param limit
     * @return
     */
    @GetMapping("/order/findAll")
    public static List<Order> getAllOrders(@RequestParam("limit") int limit) {
        return Database.getAllOrders(limit);
    }

    /**
     * @param start
     * @param end
     * @return
     */
    @GetMapping("/order/findInDateRange")
    public static List<Order> getOrdersByDateRange(@RequestParam("start") Date start, @RequestParam("end") Date end) {
        return Database.getOrdersByDateRange(start, end);
    }

    /**
     * @param orderIds
     * @return
     */
    @GetMapping("/order/findById")
    public static List<Order> getOrdersById(@RequestParam("orderIds") List<Integer> orderIds) {
        return Database.getOrdersById(orderIds);
    }

    /**
     * @param orderId
     * @return
     */
    @GetMapping("/order/findOneById")
    public static Order getOneOrderById(@RequestParam("orderId") int orderId) {
        return Order.findOneById(orderId);
    }

    /**
     * @param status
     * @return
     */
    @GetMapping("/order/findByStatus")
    public static List<Order> getOrdersByStatus(@RequestParam("status") String status) {
        return Database.getOrdersByStatus(status);
    }

    /**
     * @return
     */
    @GetMapping("/ingredient/findAll")
    public static List<Ingredient> getAllIngredients() {
        return Database.getAllIngredients();
    }

    /**
     * @param ingredientIds
     * @return
     */
    @GetMapping("/ingredient/findById")
    public static List<Ingredient> getIngredientsById(@RequestParam("ingredientIds") List<Integer> ingredientIds) {
        return Database.getIngredientsById(ingredientIds);
    }

    /**
     * @param ingredientId
     * @return
     */
    @GetMapping("/ingredient/findOneById")
    public static Ingredient getOneIngredientById(@RequestParam("ingredientId") int ingredientId) {
        return Ingredient.findOneById(ingredientId);
    }

    /**
     * @param ingredientName
     * @return
     */
    @GetMapping("/ingredient/findByName")
    public static List<Ingredient> getIngredientsByName(@RequestParam("ingredientName") String ingredientName) {
        return Database.getIngredientsByName(ingredientName);
    }

    /**
     * @param ingredient
     * @return
     */
    @PostMapping("/ingredient/insert")
    public static int insertIngredient(@RequestBody Ingredient ingredient) {
        return Database.insertIngredient(ingredient);
    }

    /**
     * @param ingredient
     * @return
     */
    @PostMapping("/ingredient/edit")
    public static boolean editIngredient(@RequestBody Ingredient ingredient) {
        return Database.editIngredient(ingredient);
    }

    /**
     * @param ingredientId
     * @return
     */
    @PostMapping("/ingredient/deleteById")
    public static boolean deleteIngredient(@RequestParam("ingredientId") int ingredientId) {
        return Database.deleteIngredient(ingredientId);
    }

    /**
     * @param startTimeCode
     * @return
     */
    @GetMapping("/ingredient/findExcess")
    public static List<Ingredient> getExcessIngredients(@RequestParam("start") long startTimeCode) {
        return Database.getExcessIngredients(new Date(startTimeCode));
    }

    /**
     * @param startTimeCode
     * @param endTimeCode
     * @return
     */
    @GetMapping("/inventoryUsed")
    public static Map<String, Integer> getAmtInventoryUsed(@RequestParam("start") long startTimeCode, @RequestParam("end") long endTimeCode) {
        return Database.getAmtInventoryUsed(new Date(startTimeCode), new Date(endTimeCode));
    }

    /**
     * @param startTimeCode
     * @param endTimeCode
     * @return
     */
    @GetMapping("/salesReport")
    public static Map<String, Double> getSalesReport(@RequestParam("start") long startTimeCode, @RequestParam("end") long endTimeCode) {
        return Database.getSalesReport(new Date(startTimeCode), new Date(endTimeCode));
    }

    /**
     * @param startTimeCode
     * @param endTimeCode
     * @return
     */
    @GetMapping("/item/sellsTogether")
    public static List<SoldTogether> getSellsTog(@RequestParam("start") long startTimeCode, @RequestParam("end") long endTimeCode) {
        return Database.getSellsTog(new Date(startTimeCode), new Date(endTimeCode));
    }

    /**
     * @return
     */
    @GetMapping("/helpStations")
    public static List<Boolean> getHelpStations() {
        List<Boolean> helpNeededList = new ArrayList<>();
        for (int i = 0; i < NUM_STATIONS; i++) {
            helpNeededList.add(isHelpNeeded[i]);
        }
        return helpNeededList;
    }

    /**
     * @return
     */
    @PostMapping("/requestHelp")
    public static ResponseStatus requestHelp() {
        int station = random.nextInt(NUM_STATIONS);
        isHelpNeeded[station] = true;
        return new ResponseStatus(true);
    }

    /**
     * @param station
     * @return
     */
    @PostMapping("/resolveHelp")
    public static ResponseStatus resolveHelp(@RequestParam("station") int station) {
        if (station < 0 || station >= NUM_STATIONS)
            return new ResponseStatus(false);
        
        isHelpNeeded[station] = false;
        return new ResponseStatus(true);
    }
}
