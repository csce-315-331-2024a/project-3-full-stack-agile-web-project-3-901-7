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
 * Represents the status of a response.
 */
class ResponseStatus {
    public boolean success;

    /**
     * Constructs a new ResponseStatus object with the specified success status.
     *
     * @param status the success status
     */
    public ResponseStatus(boolean status) {
        success = status;
    }

    /**
     * Constructs a new ResponseStatus object with the specified status code.
     * The success status is determined based on the value of the status code.
     *
     * @param status the status code
     */
    public ResponseStatus(int status) {
        success = status > 0;
    }
}

/**
 * Represents the authentication body containing email and password.
 */
class AuthBody {
    public String email;
    public String password;
}

/**
 * Represents the body of a user insertion request.
 */
class UserInsertBody {
    public UserInfo userInfo;
    public String password;

    /**
     * Default constructor for UserInsertBody.
     * Initializes the userInfo with a new instance of UserInfo and sets the
     * password to an empty string.
     */
    public UserInsertBody() {
        this.userInfo = new UserInfo();
        this.password = "";
    }

    /**
     * Constructor for UserInsertBody.
     * 
     * @param userInfo The user information.
     * @param password The user password.
     */
    public UserInsertBody(UserInfo userInfo, String password) {
        this.userInfo = userInfo;
        this.password = password;
    }
}

/**
 * Responsible for handling HTTP requests related to the database operations.
 * It provides various endpoints for retrieving, inserting, editing, and
 * deleting data from the database.
 * This class uses the `Database` class to interact with the underlying
 * database.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DatabaseController {
    private static final int NUM_STATIONS = 5;
    private static boolean[] isHelpNeeded = new boolean[NUM_STATIONS];
    private static Random random = new Random();

    /**
     * Default constructor for the DatabaseController.
     * Establishes a connection to the database using the `Database` class.
     */
    public DatabaseController() {
        Database.createConnection();
    }

    /**
     * Retrieves a list of all users from the database.
     *
     * @return a list of User objects representing all users in the database, or
     *         null if an error occurs
     */
    @GetMapping("/user/findAll")
    public static List<UserInfo> getAllUsers() {
        return User.toInfoList(Database.getAllUsers());
    }

    /**
     * Retrieves a list of User objects based on the provided user IDs.
     *
     * @param userIds the list of user IDs to retrieve
     * @return a list of User objects matching the provided user IDs, or null if an
     *         error occurs
     */
    @GetMapping("/user/findById")
    public static List<UserInfo> getUsersById(@RequestParam("userIds") List<Integer> userIds) {
        return User.toInfoList(Database.getUsersById(userIds));
    }

    /**
     * Retrieves a single User object based on the provided user ID.
     *
     * @param userId the user ID to retrieve
     * @return a User objects matching the provided user ID, or null if an
     *         error occurs
     */
    @GetMapping("/user/findOneById")
    public static UserInfo getOneUserById(@RequestParam("userId") int userId) {
        List<Integer> userIds = new ArrayList<>();
        userIds.add(userId);

        return User.toInfoList(Database.getUsersById(userIds)).get(0);
    }

    /**
     * Authenticates a user with the provided email and password.
     * 
     * @param email    The email of the user to authenticate.
     * @param password The password of the user to authenticate.
     * @return The authenticated User object, or null if the user could not be
     */
    @PostMapping("/user/login")
    public static UserInfo authenticateUser(@RequestBody AuthBody auth) {
        return Database.authenticateUser(auth.email, auth.password);
    }

    /**
     * Inserts a new user into the database.
     *
     * @param user     The User object representing the user to be inserted.
     * @param password The password for the user.
     * @return The generated ID of the inserted user, or -1 if an error occurred.
     */
    @PostMapping("/user/signup")
    public static ResponseStatus insertUser(@RequestBody UserInsertBody body) {
        return new ResponseStatus(Database.insertUser(new User(body.userInfo), body.password));
    }

    /**
     * Retrieves all roles from the database.
     *
     * @return a list of Role objects representing all roles in the database, or
     *         null if an error occurs
     */
    @GetMapping("/role/findAll")
    public static List<Role> getAllRoles() {
        return Database.getAllRoles();
    }

    /**
     * Retrieves a role based on the provided email.
     * 
     * @param email The email of the user to retrieve the role for.
     * @return The Role object representing the role of the user with the provided
     *         email, or null if an error occurs
     */
    @GetMapping("/role/findByEmail")
    public static Role getRoleByEmail(@RequestParam String email) {
        return Database.getRoleByEmail(email);
    }

    /**
     * Inserts a new role into the database.
     * 
     * @param role The Role object containing the email and type of the role.
     * @return The generated ID of the inserted role, or -1 if an error occurred.
     */
    @PostMapping("/role/insert")
    public static ResponseStatus insertRole(@RequestBody Role role) {
        return new ResponseStatus(Database.insertRole(role));
    }

    /**
     * Edits the role in the database with the provided information.
     * 
     * @param role The Role object containing the updated role information.
     * @return The ID of the edited role in the database, or -1 if an error
     *         occurred.
     */
    @PostMapping("/role/edit")
    public static ResponseStatus editRole(@RequestBody Role role) {
        return new ResponseStatus(Database.editRole(role));
    }

    /**
     * Deletes a role from the database.
     *
     * @param role the role to be deleted
     * @return true if the role is successfully deleted, false otherwise
     */
    @PostMapping("/role/delete")
    public static ResponseStatus deleteRole(@RequestBody Role role) {
        return new ResponseStatus(Database.deleteRole(role));
    }

    /**
     * Retrieves all work logs from the database.
     *
     * @return a list of WorkLog objects representing all work logs in the database,
     *         or null if an error occurs
     */
    @GetMapping("/log/findAll")
    public static List<WorkLog> getAllWorkLogs() {
        return Database.getAllWorkLogs();
    }

    /**
     * Retrieves a list of work logs based on the provided list of IDs.
     *
     * @param ids The list of IDs to retrieve work logs for.
     * @return A list of WorkLog objects corresponding to the provided IDs, or null
     *         if an error occurs.
     */
    @GetMapping("/log/findById")
    public static List<WorkLog> getLogById(@RequestParam("ids") List<Integer> ids) {
        return Database.getLogById(ids);
    }

    /**
     * Inserts a work log into the database.
     *
     * @param wl the WorkLog object containing the details of the work log to be
     *           inserted
     * @return the generated ID of the inserted work log, or -1 if an error occurs
     */
    @PostMapping("/log/insert")
    public static ResponseStatus insertWorkLog(@RequestBody WorkLog wl) {
        return new ResponseStatus(Database.insertWorkLog(wl));
    }

    /**
     * Edits a work log entry in the database.
     * 
     * @param wl The WorkLog object containing the updated information.
     * @return The ID of the edited work log entry, or -1 if an error occurred.
     */
    @PostMapping("/log/edit")
    public static ResponseStatus editWorkLog(@RequestBody WorkLog wl) {
        return new ResponseStatus(Database.editWorkLog(wl));
    }

    /**
     * Retrieves all items from the database.
     *
     * @return a list of Item objects representing all items in the database, or
     *         null if an error occurs
     */
    @GetMapping("/item/findAll")
    public static List<Item> getAllItems() {
        return Database.getAllItems();
    }

    /**
     * Retrieves a list of all available items from the database.
     *
     * @return a list of available items
     */
    @GetMapping("/item/findAllAvailable")
    public static List<Item> getAllAvailableItems() {
        return Database.getAllAvailableItems();
    }

    /**
     * Retrieves a list of items from the database based on the provided item IDs.
     *
     * @param itemIds The list of item IDs to retrieve.
     * @return A list of Item objects matching the provided item IDs, or null if an
     *         error occurs.
     */
    @GetMapping("/item/findById")
    public static List<Item> getItemsById(@RequestParam("itemIds") List<Integer> itemIds) {
        return Database.getItemsById(itemIds);
    }

    /**
     * Finds an item by its ID.
     * 
     * @param id The ID of the item.
     * @return The item with the specified ID.
     */
    @GetMapping("/item/findOneById")
    public static Item getOneItemById(@RequestParam("itemId") int itemId) {
        return Item.findOneById(itemId);
    }

    /**
     * Retrieves a list of items from the database based on the specified category.
     *
     * @param category the category of items to retrieve
     * @return a list of items matching the specified category, or null if an error
     *         occurs
     */
    @GetMapping("/item/findByCategory")
    public static List<Item> getItemsById(@RequestParam("category") String category) {
        return Database.getItemsByCategory(category);
    }

    /**
     * Inserts an item into the database.
     *
     * @param item The item to be inserted.
     * @return The generated ID of the inserted item in the database, or -1 if the
     *         insertion failed.
     */
    @PostMapping("/item/insert")
    public static ResponseStatus insertItem(@RequestBody Item item) {
        return new ResponseStatus(Database.insertItem(item));
    }

    /**
     * Updates an item in the database with the provided information.
     * This method updates the item's name, price, category, ingredients, start
     * date, end date,
     * picture, and item description.
     *
     * @param item The item object containing the updated information.
     * @return true if the item was successfully updated, false otherwise.
     */
    @PostMapping("/item/edit")
    public static ResponseStatus editItem(@RequestBody Item item) {
        return new ResponseStatus(Database.editItem(item));
    }

    /**
     * Deletes an item from the database based on the provided item ID.
     *
     * @param itemId the ID of the item to be deleted
     * @return true if the item was successfully deleted, false otherwise
     */
    @PostMapping("/item/deleteById")
    public static ResponseStatus deleteItem(@RequestParam("itemId") int itemId) {
        return new ResponseStatus(Database.deleteItem(itemId));
    }

    /**
     * Inserts an item into the database.
     *
     * @param item The item to be inserted.
     * @return The generated ID of the inserted item in the database, or false
     *         ResponseStatus if the number of items is less than 0.
     */
    @PostMapping("/order/insert")
    public static ResponseStatus insertOrder(@RequestBody Order order) {
        if (order.numItems > 0) {
            return new ResponseStatus(Database.insertOrder(order));
        }
        return new ResponseStatus(false);
    }

    /**
     * Updates an existing order in the database.
     *
     * @param order The Order object representing the updated order.
     * @return true if the order was successfully updated, false otherwise.
     */
    @PostMapping("/order/edit")
    public static ResponseStatus editOrder(@RequestBody Order order) {
        return new ResponseStatus(Database.editOrder(order));
    }

    /**
     * Deletes an order from the database based on the provided order ID.
     *
     * @param orderId the ID of the order to be deleted
     * @return true if the order was successfully deleted, false otherwise
     */
    @PostMapping("/order/deleteById")
    public static ResponseStatus deleteOrder(@RequestParam("orderId") int orderId) {
        return new ResponseStatus(Database.deleteOrder(Order.findOneById(orderId)));
    }

    /**
     * Retrieves a list of all orders from the database.
     *
     * @param limit The maximum number of orders to retrieve.
     * @return A list of Order objects representing the retrieved orders.
     *         Returns null if an error occurs during the retrieval process.
     */
    @GetMapping("/order/findAll")
    public static List<Order> getAllOrders(@RequestParam("limit") int limit) {
        return Database.getAllOrders(limit);
    }

    /**
     * Retrieves a list of orders within a specified date range.
     *
     * @param start the start date of the range
     * @param end   the end date of the range
     * @return a list of orders within the specified date range, or null if an error
     *         occurs
     */
    @GetMapping("/order/findInDateRange")
    public static List<Order> getOrdersByDateRange(@RequestParam("start") Date start, @RequestParam("end") Date end) {
        return Database.getOrdersByDateRange(start, end);
    }

    /**
     * Retrieves a list of orders based on the provided order IDs.
     *
     * @param orderIds A list of order IDs to retrieve orders for.
     * @return A list of Order objects matching the provided order IDs, or null if
     *         an error occurs.
     */
    @GetMapping("/order/findById")
    public static List<Order> getOrdersById(@RequestParam("orderIds") List<Integer> orderIds) {
        return Database.getOrdersById(orderIds);
    }

    /**
     * Retrieves an order from the database with the specified order ID.
     * 
     * @param orderId The ID of the order to retrieve.
     * @return The order with the specified ID.
     */
    @GetMapping("/order/findOneById")
    public static Order getOneOrderById(@RequestParam("orderId") int orderId) {
        return Order.findOneById(orderId);
    }

    /**
     * Retrieves a list of orders with the specified status from the database.
     *
     * @param status the status of the orders to retrieve
     * @return a list of orders with the specified status, or null if an error
     *         occurs
     */
    @GetMapping("/order/findByStatus")
    public static List<Order> getOrdersByStatus(@RequestParam("status") String status) {
        return Database.getOrdersByStatus(status);
    }

    /**
     * Retrieves all ingredients from the database.
     *
     * @return a list of Ingredient objects representing all ingredients in the
     *         database,
     *         or null if an error occurs during the database operation
     */
    @GetMapping("/ingredient/findAll")
    public static List<Ingredient> getAllIngredients() {
        return Database.getAllIngredients();
    }

    /**
     * Retrieves a list of ingredients based on the provided ingredient IDs.
     *
     * @param ingredientIds A list of ingredient IDs to retrieve.
     * @return A list of Ingredient objects matching the provided ingredient IDs, or
     *         null if an error occurs.
     */
    @GetMapping("/ingredient/findById")
    public static List<Ingredient> getIngredientsById(@RequestParam("ingredientIds") List<Integer> ingredientIds) {
        return Database.getIngredientsById(ingredientIds);
    }

    /**
     * Finds an ingredient by its ID.
     * 
     * @param ingredientId the ID of the ingredient to find
     * @return the ingredient with the specified ID, or null if not found
     */
    @GetMapping("/ingredient/findOneById")
    public static Ingredient getOneIngredientById(@RequestParam("ingredientId") int ingredientId) {
        return Ingredient.findOneById(ingredientId);
    }

    /**
     * Retrieves a list of ingredients from the database that match the given name.
     *
     * @param ingredientName the name to search for (can be a partial match)
     * @return a list of Ingredient objects that match the given name, or null if an
     *         error occurs
     */
    @GetMapping("/ingredient/findByName")
    public static List<Ingredient> getIngredientsByName(@RequestParam("ingredientName") String ingredientName) {
        return Database.getIngredientsByName(ingredientName);
    }

    /**
     * Inserts an ingredient into the database.
     *
     * @param ingredient the ingredient to be inserted
     * @return the generated ID of the inserted ingredient in the database, or -1 if
     *         the insertion failed
     */
    @PostMapping("/ingredient/insert")
    public static int insertIngredient(@RequestBody Ingredient ingredient) {
        return Database.insertIngredient(ingredient);
    }

    /**
     * Updates an ingredient in the database with the provided information.
     * 
     * @param ingredient The Ingredient object containing the updated information.
     * @return true if the ingredient was successfully updated, false otherwise.
     */
    @PostMapping("/ingredient/edit")
    public static boolean editIngredient(@RequestBody Ingredient ingredient) {
        return Database.editIngredient(ingredient);
    }

    /**
     * Deletes an ingredient from the database and its relevant correlations in the
     * junction table.
     * 
     * @param ingredientId the ID of the ingredient to be deleted
     * @return true if the ingredient was successfully deleted, false otherwise
     */
    @PostMapping("/ingredient/deleteById")
    public static boolean deleteIngredient(@RequestParam("ingredientId") int ingredientId) {
        return Database.deleteIngredient(ingredientId);
    }

    /**
     * Retrieves a list of excess ingredients based on the specified start date.
     * Excess ingredients are those that have been consumed less than 10% between
     * the start date and the current date.
     *
     * @param startTimeCode the start date to filter the ingredients
     * @return a list of excess ingredients
     */
    @GetMapping("/ingredient/findExcess")
    public static List<Ingredient> getExcessIngredients(@RequestParam("start") long startTimeCode) {
        return Database.getExcessIngredients(new Date(startTimeCode));
    }

    /**
     * Retrieves the amount of inventory used between the specified start and end
     * dates.
     * 
     * @param startTimeCode the start date
     * @param endTimeCode   the end date
     * @return a map containing the names of ingredients as keys and the total
     *         amount used as values
     */
    @GetMapping("/inventoryUsed")
    public static Map<String, Integer> getAmtInventoryUsed(@RequestParam("start") long startTimeCode,
            @RequestParam("end") long endTimeCode) {
        return Database.getAmtInventoryUsed(new Date(startTimeCode), new Date(startTimeCode));
    }

    /**
     * Retrieves the sales report for a given time period.
     *
     * @param startTimeCode the start date of the time period
     * @param endTimeCode   the end date of the time period
     * @return a map containing the item names as keys and their corresponding total
     *         sales as values
     */
    @GetMapping("/salesReport")
    public static Map<String, Double> getSalesReport(@RequestParam("start") long startTimeCode,
            @RequestParam("end") long endTimeCode) {
        return Database.getSalesReport(new Date(startTimeCode), new Date(endTimeCode));
    }

    /**
     * Retrieves a list of items that are frequently sold together within a
     * specified date range.
     *
     * @param startTimeCode The start date of the range.
     * @param endTimeCode   The end date of the range.
     * @return A list of SoldTogether objects representing the items that are
     *         frequently sold together.
     */
    @GetMapping("/item/sellsTogether")
    public static List<SoldTogether> getSellsTog(@RequestParam("start") long startTimeCode,
            @RequestParam("end") long endTimeCode) {
        return Database.getSellsTog(new Date(startTimeCode), new Date(endTimeCode));
    }

    /**
     * Retrieves the list of help stations indicating whether help is needed at each
     * station.
     *
     * @return A list of booleans representing the help needed status for each
     *         station.
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
     * Sends a help request to a specified station.
     * 
     * @return a ResponseStatus object indicating the success status of the
     *         operation
     */
    @PostMapping("/requestHelp")
    public static ResponseStatus requestHelp() {
        int station = random.nextInt(NUM_STATIONS);
        isHelpNeeded[station] = true;
        return new ResponseStatus(true);
    }

    /**
     * Resolves the help request for the specified station.
     * 
     * @param station the station to resolve the help request for
     * @return a ResponseStatus object indicating the success status of the
     *         operation
     */
    @PostMapping("/resolveHelp")
    public static ResponseStatus resolveHelp(@RequestParam("station") int station) {
        if (station < 0 || station >= NUM_STATIONS)
            return new ResponseStatus(false);

        isHelpNeeded[station] = false;
        return new ResponseStatus(true);
    }
}
