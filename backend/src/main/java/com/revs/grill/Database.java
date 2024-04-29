package com.revs.grill;

import java.io.FileInputStream;
import java.sql.*;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Properties;

import org.apache.commons.lang3.tuple.MutablePair;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

class SoldTogether {
    public int count;
    public Item item1;
    public Item item2;

    public SoldTogether(int count, Item item1, Item item2) {
        this.count = count;
        this.item1 = item1;
        this.item2 = item2;
    }
}

@Configuration
@PropertySource("classpath:application.properties")
public class Database {
    public static Connection connection = null;

    private static String databaseName;

    private static String databaseUser;

    private static String databasePassword;

    public static void createConnection() {
        if (connection != null)
            return;

        try {
            Properties p = new Properties();
            p.load(Database.class.getClassLoader().getResourceAsStream("application.properties"));
            databaseName = p.getProperty("database.name");
            databaseUser = p.getProperty("database.user");
            databasePassword = p.getProperty("database.password");
            String database_url = String.format("jdbc:postgresql://csce-315-db.engr.tamu.edu/%s", databaseName);
            connection = DriverManager.getConnection(database_url, databaseUser, databasePassword);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static List<Ingredient> runIngredientQuery(PreparedStatement queryStatement) throws SQLException {
        if (connection == null) {
            createConnection();
        }
        List<Ingredient> ingredients = new ArrayList<>();

        ResultSet resultSet = queryStatement.executeQuery();

        while (resultSet.next()) {
            Ingredient ingredient = new Ingredient();
            ingredient._id = resultSet.getInt("ingredientId");
            ingredient.name = resultSet.getString("name");
            ingredient.quantity = resultSet.getInt("quantity");
            ingredient.minQuantity = resultSet.getInt("minQuantity");
            ingredient.unitPrice = resultSet.getDouble("unitPrice");
            ingredient.supplier = resultSet.getString("supplier");
            ingredients.add(ingredient);
        }

        resultSet.close();
        queryStatement.close();

        return ingredients;
    }

    private static List<Item> runItemQuery(PreparedStatement queryStatement, boolean fillIngredients)
            throws SQLException {
        if (connection == null) {
            createConnection();
        }
        List<Item> items = new ArrayList<>();

        ResultSet resultSet = queryStatement.executeQuery();

        while (resultSet.next()) {
            Item item = new Item();
            item._id = resultSet.getInt("itemId");
            item.name = resultSet.getString("name");
            item.price = resultSet.getDouble("price");
            item.category = resultSet.getString("category");
            item.ingredientInfo = resultSet.getString("ingredients");
            item.startDate = resultSet.getDate("startDate");
            item.endDate = resultSet.getDate("endDate");
            item.picture = resultSet.getString("picture");
            item.itemDesc = resultSet.getString("itemDesc");

            if (fillIngredients) {
                PreparedStatement ingStatement = connection.prepareStatement(
                        "SELECT item.name as itemname, item.itemid as itemid2, ing.* \n" +
                                "FROM \n" +
                                "Items item \n" +
                                "JOIN ItemIngredient_Junction ii ON item.itemid = ii.itemId \n" +
                                "JOIN Ingredients ing ON ii.ingredientId = ing.ingredientId \n" +
                                "WHERE \n" +
                                "item.name = ?;");
                ingStatement.setString(1, item.name);
                item.ingredients = runIngredientQuery(ingStatement);
            }

            items.add(item);
        }

        resultSet.close();
        queryStatement.close();

        return items;
    }

    private static List<User> runUserQuery(PreparedStatement queryStatement)
            throws SQLException {
        if (connection == null) {
            createConnection();
        }
        List<User> users = new ArrayList<>();

        ResultSet resultSet = queryStatement.executeQuery();

        while (resultSet.next()) {
            User user = new User();
            user._id = resultSet.getInt("userId");
            user.email = resultSet.getString("email");
            user.name = resultSet.getString("name");
            user.given_name = resultSet.getString("firstName");
            user.family_name = resultSet.getString("lastName");
            user.picture = resultSet.getString("picture");
            user.setHash(resultSet.getString("hash"));
            user.setSalt(resultSet.getString("salt"));

            users.add(user);
        }

        resultSet.close();
        queryStatement.close();

        return users;
    }

    private static List<Role> runRoleQuery(PreparedStatement queryStatement)
            throws SQLException {
        if (connection == null) {
            createConnection();
        }
        List<Role> roles = new ArrayList<>();

        ResultSet resultSet = queryStatement.executeQuery();

        while (resultSet.next()) {
            Role role = new Role();
            role._id = resultSet.getInt("roleId");
            role.email = resultSet.getString("email");
            role.type = resultSet.getString("type");

            roles.add(role);
        }

        resultSet.close();
        queryStatement.close();

        return roles;
    }

    private static List<WorkLog> runWorkLogQuery(PreparedStatement queryStatement)
            throws SQLException {
        if (connection == null) {
            createConnection();
        }
        List<WorkLog> log = new ArrayList<>();

        ResultSet resultSet = queryStatement.executeQuery();

        while (resultSet.next()) {
            WorkLog wl = new WorkLog();
            wl.log_id = resultSet.getInt("log_id");
            wl.emp_id = resultSet.getInt("id");
            wl.checkin = resultSet.getTimestamp("check_in_time");
            wl.checkout = resultSet.getTimestamp("check_out_time");
            wl.comments = resultSet.getString("comments");
            log.add(wl);
        }

        resultSet.close();
        queryStatement.close();

        return log;
    }

    private static List<Order> runOrderQuery(PreparedStatement queryStatement) throws SQLException {
        if (connection == null) {
            createConnection();
        }
        List<Order> orders = new ArrayList<>();

        ResultSet resultSet = queryStatement.executeQuery();

        while (resultSet.next()) {
            Order order = new Order();
            order._id = resultSet.getInt("orderId");
            order.numItems = resultSet.getInt("numItems");
            order.dateTime = resultSet.getDate("dateTime");
            order.total = resultSet.getDouble("total");
            order.orderInfo = resultSet.getString("orderInfo");
            order.status = resultSet.getString("status");

            PreparedStatement orderItemStatement = connection.prepareStatement(
                    "SELECT * \n" +
                            "FROM OrderItem_Junction oij \n" +
                            "JOIN Items i ON oij.itemId = i.itemId \n" +
                            "WHERE oij.orderId = ?;");

            orderItemStatement.setInt(1, order._id);

            ResultSet orderItemResult = orderItemStatement.executeQuery();
            while (orderItemResult.next()) {
                int numOfItem = orderItemResult.getInt("numOfItem");
                int itemId = orderItemResult.getInt("itemId");
                order.itemToQuantity.put(itemId, numOfItem);
            }

            orderItemResult.close();
            orderItemStatement.close();
            order.serializeOrderInfo();

            orders.add(order);
        }

        resultSet.close();
        queryStatement.close();

        return orders;
    }

    public static List<User> getAllUsers() {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM Users");
            return runUserQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List<User> getUsersById(List<Integer> userIds) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM Users WHERE userId IN " + buildPlaceholderString(userIds.size()));
            int index = 1;
            for (Integer userId : userIds) {
                statement.setInt(index++, userId);
            }

            return runUserQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static int insertUser(User user, String password) {
        try {
            if (password.length() > 0) {
                user.hashPassword(password);
            } else {
                user.setHash("");
                user.setSalt("");
            }

            String userInsertQuery = "INSERT INTO Users (email, name, firstName, lastName, picture, salt, hash) VALUES (?, ?, ?, ?, ?, ?, ?);";
            PreparedStatement userInsertStatement = connection.prepareStatement(userInsertQuery,
                    Statement.RETURN_GENERATED_KEYS);

            userInsertStatement.setString(1, user.email);
            userInsertStatement.setString(2, user.name);
            userInsertStatement.setString(3, user.given_name);
            userInsertStatement.setString(4, user.family_name);
            userInsertStatement.setString(5, user.picture);
            userInsertStatement.setString(6, user.getSalt());
            userInsertStatement.setString(7, user.getHash());

            userInsertStatement.executeUpdate();

            // get generated id of item in database
            ResultSet generatedKeys = userInsertStatement.getGeneratedKeys();

            if (!generatedKeys.next()) {
                userInsertStatement.close();
                return -1;
            }

            int userId = generatedKeys.getInt(1);
            return userId;

        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    public static User authenticateUser(String email, String password) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM users WHERE email='" + email + "';");
            List<User> users = runUserQuery(statement);
            if (users.size() < 1) {
                return null;
            }

            User user = users.get(0);
            if (user.authenticate(password))
                return user;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return null;
    }

    public static List<Role> getAllRoles() {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM Roles;");
            return runRoleQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Role getRoleByEmail(String email) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM Roles WHERE email = ?;");
            statement.setString(1, email);
            List<Role> roleMatches = runRoleQuery(statement);
            if (roleMatches.size() < 1)
                return null;
            return roleMatches.get(0);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static int editRole(Role role) {
        try {
            String roleInsertQuery = "UPDATE Roles SET email = ?, type = ? WHERE roleId = ?;";
            PreparedStatement roleInsertStatement = connection.prepareStatement(roleInsertQuery,
                    Statement.RETURN_GENERATED_KEYS);

            roleInsertStatement.setString(1, role.email);
            roleInsertStatement.setString(2, role.type);
            roleInsertStatement.setInt(3, role._id);

            roleInsertStatement.executeUpdate();

            // get generated id of item in database
            ResultSet generatedKeys = roleInsertStatement.getGeneratedKeys();

            if (!generatedKeys.next()) {
                roleInsertStatement.close();
                return -1;
            }

            int roleId = generatedKeys.getInt(1);
            return roleId;

        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    public static int insertRole(Role role) {
        try {
            String roleInsertQuery = "INSERT INTO Roles (email, type) VALUES (?, ?);";
            PreparedStatement roleInsertStatement = connection.prepareStatement(roleInsertQuery,
                    Statement.RETURN_GENERATED_KEYS);

            roleInsertStatement.setString(1, role.email);
            roleInsertStatement.setString(2, role.type);

            roleInsertStatement.executeUpdate();

            // get generated id of item in database
            ResultSet generatedKeys = roleInsertStatement.getGeneratedKeys();

            if (!generatedKeys.next()) {
                roleInsertStatement.close();
                return -1;
            }

            int roleId = generatedKeys.getInt(1);
            return roleId;

        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    public static boolean deleteRole(Role role) {
        try {
            String roleDeleteQuery = "DELETE FROM Roles WHERE roleId = ?;";
            PreparedStatement roleDeleteStatement = connection.prepareStatement(roleDeleteQuery,
                    Statement.RETURN_GENERATED_KEYS);

            roleDeleteStatement.setInt(1, role._id);

            roleDeleteStatement.executeUpdate();
            roleDeleteStatement.close();

            return true;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static List<WorkLog> getAllWorkLogs() {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM cashier_work_log;");
            return runWorkLogQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static int insertWorkLog(WorkLog wl) {
        try {
            String logInsertQuery = "INSERT INTO cashier_work_log (id, check_in_time, check_out_time, comments) VALUES (?, ?, ?, ?);";
            PreparedStatement logInsertStatement = connection.prepareStatement(logInsertQuery,
                    Statement.RETURN_GENERATED_KEYS);

            logInsertStatement.setInt(1, wl.emp_id);
            logInsertStatement.setTimestamp(2, wl.checkin);
            logInsertStatement.setTimestamp(3, wl.checkout);
            logInsertStatement.setString(4, wl.comments);
            logInsertStatement.executeUpdate();

            // get generated id of item in database
            ResultSet generatedKeys = logInsertStatement.getGeneratedKeys();

            if (!generatedKeys.next()) {
                logInsertStatement.close();
                return -1;
            }

            int logId = generatedKeys.getInt(1);
            return logId;

        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    public static List<WorkLog> getLogById(List<Integer> ids) {
        try {
            String query = "SELECT * FROM cashier_work_log WHERE id IN " + buildPlaceholderString(ids.size());
            PreparedStatement statement = connection.prepareStatement(query);

            int index = 1;
            for (Integer id : ids) {
                statement.setInt(index++, id);
            }

            return runWorkLogQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }


    public static List<Item> getAllItems() {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM Items");
            return runItemQuery(statement, true);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List<Item> getAllAvailableItems() {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM Items");
            List<Item> items = runItemQuery(statement, true);
            List<Item> avail = new ArrayList<>();
            for (Item item: items) {
                if (item.isAvailable()) { avail.add(item); }
            }
            return avail;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List<Item> getItemsById(List<Integer> itemIds) {
        try {
            String query = "SELECT * FROM Items WHERE itemId IN " + buildPlaceholderString(itemIds.size());
            PreparedStatement statement = connection.prepareStatement(query);

            int index = 1;
            for (Integer itemId : itemIds) {
                statement.setInt(index++, itemId);
            }

            return runItemQuery(statement, true);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List<Item> getItemsByCategory(String category) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM Items WHERE category = ?");
            statement.setString(1, category);
            return runItemQuery(statement, true);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static int insertOrder(Order order) {
        try {
            // insert item into database
            String orderInsertQuery = "INSERT INTO Orders (numItems, total, orderInfo, dateTime, status) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement orderInsertStatement = connection.prepareStatement(orderInsertQuery,
                    Statement.RETURN_GENERATED_KEYS);
            orderInsertStatement.setInt(1, order.numItems);
            orderInsertStatement.setDouble(2, order.total);
            orderInsertStatement.setString(3, order.orderInfo);
            orderInsertStatement.setDate(4, order.dateTime);
            orderInsertStatement.setString(5, order.status);
            orderInsertStatement.executeUpdate();

            // get generated id of item in database
            ResultSet generatedKeys = orderInsertStatement.getGeneratedKeys();

            if (!generatedKeys.next()) {
                orderInsertStatement.close();
                return -1;
            }

            int orderId = generatedKeys.getInt(1);

            // add item ingredients to item-ingredient junction
            if (order.itemToQuantity != null && !order.itemToQuantity.isEmpty()) {
                String insertOrderItemQuery = "INSERT INTO OrderItem_Junction (numOfItem, orderId, itemId) VALUES (?, ?, ?)";
                PreparedStatement insertOrderItemStatement = connection.prepareStatement(insertOrderItemQuery);

                String updateIngredientQuantityQuery = "" +
                        "UPDATE Ingredients \n" +
                        "SET quantity = quantity - 1 \n" +
                        "WHERE ingredientId IN ( \n" +
                        " SELECT ii.ingredientId \n" +
                        " FROM OrderItem_Junction oij \n" +
                        " JOIN ItemIngredient_Junction ii ON oij.itemId = ii.itemId \n" +
                        " WHERE oij.itemId IN " + buildPlaceholderString(order.itemToQuantity.size())
                        + " \n" +
                        ");";
                PreparedStatement updateIngredientQuantityStatement = connection
                        .prepareStatement(updateIngredientQuantityQuery);

                int index = 1;
                for (int itemId : order.itemToQuantity.keySet()) {
                    updateIngredientQuantityStatement.setInt(index++, itemId);

                    insertOrderItemStatement.setInt(1, order.getItemQuantity(itemId));
                    insertOrderItemStatement.setInt(2, orderId);
                    insertOrderItemStatement.setInt(3, itemId);
                    insertOrderItemStatement.addBatch();
                }

                updateIngredientQuantityStatement.executeUpdate();
                insertOrderItemStatement.executeBatch();

                updateIngredientQuantityStatement.close();
                insertOrderItemStatement.close();
            }

            orderInsertStatement.close();
            return orderId;

        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }

    }

    public static boolean editOrder(Order order) {
        try {
            // update order table
            String orderUpdateQuery = "UPDATE Orders SET numItems = ?, total = ?, orderInfo = ?, dateTime = ?, status = ? WHERE orderId = ?";
            PreparedStatement orderUpdateStatement = connection.prepareStatement(orderUpdateQuery);
            orderUpdateStatement.setInt(1, order.numItems);
            orderUpdateStatement.setDouble(2, order.total);
            orderUpdateStatement.setString(3, order.orderInfo);
            orderUpdateStatement.setDate(4, order.dateTime);
            orderUpdateStatement.setString(5, order.status);
            orderUpdateStatement.setInt(6, order._id);
            orderUpdateStatement.executeUpdate();

            // remove existing order-item junctions
            String oijRemoveQuery = "DELETE FROM OrderItem_Junction WHERE orderId = ?";
            PreparedStatement oijRemoveStatement = connection.prepareStatement(oijRemoveQuery);
            oijRemoveStatement.setInt(1, order._id);
            oijRemoveStatement.executeUpdate();

            // add order-item junctions again
            String insertOrderItemQuery = "INSERT INTO OrderItem_Junction (numOfItem, orderId, itemId) VALUES (?, ?, ?)";
            PreparedStatement insertOrderItemStatement = connection.prepareStatement(insertOrderItemQuery);

            for (int itemId : order.itemToQuantity.keySet()) {
                insertOrderItemStatement.setInt(1, order.getItemQuantity(itemId));
                insertOrderItemStatement.setInt(2, order._id);
                insertOrderItemStatement.setInt(3, itemId);
                insertOrderItemStatement.addBatch();
            }
            insertOrderItemStatement.executeBatch();

            orderUpdateStatement.close();
            oijRemoveStatement.close();
            insertOrderItemStatement.close();

            return true;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean deleteOrder(Order order) {
        try {
            // delete order from order table
            String orderDeleteQuery = "DELETE FROM Orders WHERE orderId = ?";
            PreparedStatement orderDeleteStatement = connection.prepareStatement(orderDeleteQuery);
            orderDeleteStatement.setInt(1, order._id);
            orderDeleteStatement.executeUpdate();

            // remove existing order-item junctions
            String oijRemoveQuery = "DELETE FROM OrderItem_Junction WHERE orderId = ?";
            PreparedStatement oijRemoveStatement = connection.prepareStatement(oijRemoveQuery);
            oijRemoveStatement.setInt(1, order._id);
            oijRemoveStatement.executeUpdate();

            // close statements
            orderDeleteStatement.close();
            oijRemoveStatement.close();

            return true;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static int insertItem(Item item) {
        int itemId = -1;

        try {
            // insert item into database
            String itemInsertQuery = "INSERT INTO Items (name, price, category, ingredients, startDate, endDate, picture, itemDesc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement itemInsertStatement = connection.prepareStatement(itemInsertQuery, Statement.RETURN_GENERATED_KEYS);
            itemInsertStatement.setString(1, item.name);
            itemInsertStatement.setDouble(2, item.price);
            itemInsertStatement.setString(3, item.category);
            itemInsertStatement.setString(4, item.ingredientInfo);
            itemInsertStatement.setDate(5, item.startDate);
            itemInsertStatement.setDate(6, item.endDate);
            itemInsertStatement.setString(7, item.picture);
            itemInsertStatement.setString(8, item.itemDesc);
            itemInsertStatement.executeUpdate();

            // get generated id of item in database
            ResultSet generatedKeys = itemInsertStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                itemId = generatedKeys.getInt(1);

                // add item ingredients to item-ingredient junction
                if (item.ingredients != null && !item.ingredients.isEmpty()) {
                    String ingredientInsertQuery = "INSERT INTO ItemIngredient_Junction (itemId, ingredientId) VALUES (?, ?)";
                    PreparedStatement ingredientInsertStatement = connection.prepareStatement(ingredientInsertQuery);

                    String ingredientList = "";
                    int i = 0;
                    for (Ingredient ingredient : item.ingredients) {
                        if (i < item.ingredients.size() - 1) {
                            ingredientList += ingredient.name;
                            ingredientList += ",";
                        } else {
                            ingredientList += ingredient.name;
                        }
                        ingredientInsertStatement.setInt(1, itemId);
                        ingredientInsertStatement.setInt(2, ingredient._id);
                        ingredientInsertStatement.addBatch();
                        i++;
                    }
                    ingredientInsertStatement.executeBatch();
                    ingredientInsertStatement.close();

                    // set the varchar in item ingredients with a list of ingredients
                    String ingredientItemQuery = "UPDATE Items SET ingredients = ? WHERE itemId = ?";
                    PreparedStatement ingredientItemStatement = connection.prepareStatement(ingredientItemQuery);
                    ingredientItemStatement.setString(1, ingredientList);
                    ingredientItemStatement.setInt(2, itemId);
                    ingredientItemStatement.executeBatch();
                    ingredientItemStatement.close();

                }
            }

            itemInsertStatement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return itemId;
    }

    public static boolean editItem(Item item) {
        try {
            // insert item into database
            String itemInsertQuery = "UPDATE Items SET name = ?, price = ?, category = ?, ingredients = ?, startDate = ?, endDate = ?, picture = ?, itemDesc = ? WHERE itemId = ?";
            PreparedStatement itemInsertStatement = connection.prepareStatement(itemInsertQuery);
            itemInsertStatement.setString(1, item.name);
            itemInsertStatement.setDouble(2, item.price);
            itemInsertStatement.setString(3, item.category);
            itemInsertStatement.setString(4, item.ingredientInfo);
            itemInsertStatement.setDate(5, item.startDate);
            itemInsertStatement.setDate(6, item.endDate);
            itemInsertStatement.setString(7, item.picture);
            itemInsertStatement.setString(8, item.itemDesc);
            itemInsertStatement.setInt(9, item._id);
            itemInsertStatement.executeUpdate();

            // remove existing order-item junctions
            String iijRemoveQuery = "DELETE FROM ItemIngredient_Junction WHERE itemId = ?";
            PreparedStatement iijRemoveStatement = connection.prepareStatement(iijRemoveQuery);
            iijRemoveStatement.setInt(1, item._id);
            iijRemoveStatement.executeUpdate();

            // add order-item junctions again
            String insertItemIngQuery = "INSERT INTO ItemIngredient_Junction (itemId, ingredientId) VALUES (?, ?)";
            PreparedStatement insertItemIngStatement = connection.prepareStatement(insertItemIngQuery);

            for (Ingredient ing : item.ingredients) {
                insertItemIngStatement.setInt(1, item._id);
                insertItemIngStatement.setInt(2, ing._id);
                insertItemIngStatement.addBatch();
            }
            insertItemIngStatement.executeBatch();

            // close statements
            insertItemIngStatement.close();
            iijRemoveStatement.close();
            itemInsertStatement.close();

            return true;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean deleteItem(int itemId) {
        try {
            // delete item from database
            String itemDeleteQuery = "DELETE FROM Items WHERE itemId = ?";
            PreparedStatement itemDeleteStatement = connection.prepareStatement(itemDeleteQuery,
                    Statement.RETURN_GENERATED_KEYS);
            itemDeleteStatement.setInt(1, itemId);
            itemDeleteStatement.executeUpdate();
            itemDeleteStatement.close();

            // delete item id relevant ingredient correlations in junction table
            String itemIngredientDeleteQuery = "DELETE FROM ItemIngredient_Junction WHERE itemId = ?";
            PreparedStatement itemIngredientDeleteStatement = connection.prepareStatement(itemIngredientDeleteQuery,
                    Statement.RETURN_GENERATED_KEYS);
            itemIngredientDeleteStatement.setInt(1, itemId);
            itemIngredientDeleteStatement.executeUpdate();
            itemIngredientDeleteStatement.close();

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public static List<Ingredient> getAllIngredients() {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM Ingredients");
            return runIngredientQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List<Ingredient> getIngredientsById(List<Integer> ingredientIds) {
        try {
            String query = "SELECT * FROM Ingredients WHERE ingredientId IN "
                    + buildPlaceholderString(ingredientIds.size());
            PreparedStatement statement = connection.prepareStatement(query);

            int index = 1;
            for (Integer ingredientId : ingredientIds) {
                statement.setInt(index++, ingredientId);
            }

            return runIngredientQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List<Ingredient> getIngredientsByName(String testName) {
        try {
            String query = "SELECT * FROM Ingredients WHERE name LIKE ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, "%" + testName + "%");

            return runIngredientQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static int insertIngredient(Ingredient ingredient) {
        int ingredientId = -1;

        try {
            // insert ingredient into database
            String ingInsertQuery = "INSERT INTO Ingredients (name, quantity, minQuantity, unitPrice, supplier) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement ingInsertStatement = connection.prepareStatement(ingInsertQuery,
                    Statement.RETURN_GENERATED_KEYS);
            ingInsertStatement.setString(1, ingredient.name);
            ingInsertStatement.setInt(2, ingredient.quantity);
            ingInsertStatement.setInt(3, ingredient.minQuantity);
            ingInsertStatement.setDouble(4, ingredient.unitPrice);
            ingInsertStatement.setString(5, ingredient.supplier);
            ingInsertStatement.executeUpdate();

            // get generated id of ingredient in database
            ResultSet generatedKeys = ingInsertStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                ingredientId = generatedKeys.getInt(1);
            }

            ingInsertStatement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return ingredientId;
    }

    public static boolean editIngredient(Ingredient ingredient) {
        try {
            String ingredientEditQuery = "UPDATE Ingredients SET name = ?, quantity = ?, minQuantity = ?, unitPrice = ?, supplier = ? WHERE ingredientId = ?";
            PreparedStatement ingredientEditStatement = connection.prepareStatement(ingredientEditQuery);
            ingredientEditStatement.setString(1, ingredient.name);
            ingredientEditStatement.setInt(2, ingredient.quantity);
            ingredientEditStatement.setInt(3, ingredient.minQuantity);
            ingredientEditStatement.setDouble(4, ingredient.unitPrice);
            ingredientEditStatement.setString(5, ingredient.supplier);
            ingredientEditStatement.setInt(6, ingredient._id);
            ingredientEditStatement.executeUpdate();
            ingredientEditStatement.close();
            return true;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean deleteIngredient(int ingredientId) {
        try {
            // delete item from database
            String ingDeleteQuery = "DELETE FROM Ingredients WHERE ingredientId = ?";
            PreparedStatement ingDeleteStatement = connection.prepareStatement(ingDeleteQuery,
                    Statement.RETURN_GENERATED_KEYS);
            ingDeleteStatement.setInt(1, ingredientId);
            ingDeleteStatement.executeUpdate();
            ingDeleteStatement.close();

            // delete item id relevant ingredient correlations in junction table
            String itemIngredientDeleteQuery = "DELETE FROM ItemIngredient_Junction WHERE ingredientId = ?";
            PreparedStatement itemIngredientDeleteStatement = connection.prepareStatement(itemIngredientDeleteQuery,
                    Statement.RETURN_GENERATED_KEYS);
            itemIngredientDeleteStatement.setInt(1, ingredientId);
            itemIngredientDeleteStatement.executeUpdate();
            itemIngredientDeleteStatement.close();

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public static List<Order> getAllOrders(int limit) {
        try {
            PreparedStatement statement = connection
                    .prepareStatement("SELECT * FROM Orders ORDER BY dateTime DESC LIMIT ?");
            statement.setInt(1, limit);
            return runOrderQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List<Order> getOrdersByDateRange(Date start, Date end) {
        try {
            PreparedStatement statement = connection
                    .prepareStatement("SELECT * FROM Orders WHERE dateTime >= ? AND dateTime <= ?");
            statement.setDate(1, start);
            statement.setDate(2, end);
            return runOrderQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List<Order> getOrdersById(List<Integer> orderIds) {
        try {
            String query = "SELECT * FROM Orders WHERE orderId IN " + buildPlaceholderString(orderIds.size());
            PreparedStatement statement = connection.prepareStatement(query);

            int index = 1;
            for (Integer orderId : orderIds) {
                statement.setInt(index++, orderId);
            }

            return runOrderQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List<Order> getOrdersByStatus(String status) {
        try {
            PreparedStatement statement = connection
                    .prepareStatement("SELECT * FROM Orders WHERE status = ?");
            statement.setString(1, status);
            return runOrderQuery(statement);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Map<String, Integer> getAmtInventoryUsed(Date start, Date end) {
        Map<String, Integer> inventoryUsed = new HashMap<>();
        try {
            String sql = "SELECT i.name, SUM(oi.numOfItem) AS totalUsed " +
                    "FROM Orders o " +
                    "JOIN OrderItem_Junction oi ON o.orderId = oi.orderId " +
                    "JOIN Items it ON oi.itemId = it.itemId " +
                    "JOIN ItemIngredient_Junction iij ON it.itemId = iij.itemId " +
                    "JOIN Ingredients i ON iij.ingredientId = i.ingredientId " +
                    "WHERE o.dateTime BETWEEN ? AND ? " +
                    "GROUP BY i.name";
            PreparedStatement pstmt = connection.prepareStatement(sql);
            pstmt.setDate(1, start);
            pstmt.setDate(2, end);
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                String ingredientName = rs.getString("name");
                int totalUsed = rs.getInt("totalUsed");
                inventoryUsed.put(ingredientName, totalUsed);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return inventoryUsed;
    }

    public static Map<String, Double> getSalesReport(Date start, Date end) {
        Map<String, Double> sales = new HashMap<>();
        try {
            String sql = "SELECT it.name AS item_name, SUM(oi.numOfItem * it.price) AS total_sales " +
                    "FROM Orders o " +
                    "JOIN OrderItem_Junction oi ON o.orderId = oi.orderId " +
                    "JOIN Items it ON oi.itemId = it.itemId " +
                    "WHERE o.dateTime BETWEEN ? AND ? " +
                    "GROUP BY it.name; ";

            PreparedStatement pstmt = connection.prepareStatement(sql);
            pstmt.setDate(1, start);
            pstmt.setDate(2, end);
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                String menuItemName = rs.getString("item_name");
                double total = rs.getDouble("total_sales");
                sales.put(menuItemName, total);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sales;
    }

    public static List<Ingredient> getExcessIngredients(Date start) {
        try {
            Date end = new Date(System.currentTimeMillis());

            String excessQuery = "" +
                    "SELECT DISTINCT \n" +
                    "ing.*, \n" +
                    "((ing.quantity_at_start - ing.quantity_at_end) / ing.quantity_at_start) * 100 AS percentage_consumed \n"
                    +
                    "FROM ( \n" +
                    "SELECT \n" +
                    "i.*, \n" +
                    "LAG(i.quantity) OVER (PARTITION BY i.ingredientId ORDER BY o.dateTime) AS quantity_at_start, \n" +
                    "i.quantity AS quantity_at_end \n" +
                    "FROM \n" +
                    "Ingredients i \n" +
                    "JOIN ItemIngredient_Junction ii ON i.ingredientId = ii.ingredientId \n" +
                    "JOIN OrderItem_Junction oij ON ii.itemId = oij.itemId \n" +
                    "JOIN Orders o ON oij.orderId = o.orderId \n" +
                    "WHERE \n" +
                    "o.dateTime BETWEEN ? AND ? \n" +
                    ") ing \n" +
                    "WHERE \n" +
                    "ing.quantity_at_start IS NOT NULL \n" +
                    "AND ((ing.quantity_at_start - ing.quantity_at_end) / ing.quantity_at_start) * 100 < 10;";

            PreparedStatement excessStatement = connection.prepareStatement(excessQuery);
            excessStatement.setDate(1, start);
            excessStatement.setDate(2, end);

            return runIngredientQuery(excessStatement);

        } catch (SQLException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public static List<SoldTogether> getSellsTog(Date start, Date end) {
        List<SoldTogether> sellsTog = new ArrayList<>();
        try {
            String sql = "" +
                    "WITH OrderItems AS ( \n" +
                    "SELECT \n" +
                    "oij1.orderId AS order1, \n" +
                    "oij1.itemId AS item1, \n" +
                    "oij2.orderId AS order2, \n" +
                    "oij2.itemId AS item2 \n" +
                    "FROM \n" +
                    "OrderItem_Junction oij1 \n" +
                    "JOIN OrderItem_Junction oij2 ON oij1.orderId = oij2.orderId \n" +
                    "AND oij1.itemId < oij2.itemId \n" +
                    "JOIN Orders o1 ON oij1.orderId = o1.orderId \n" +
                    "JOIN Orders o2 ON oij2.orderId = o2.orderId \n" +
                    "WHERE \n" +
                    "o1.dateTime BETWEEN ? AND ? \n" +
                    "AND o2.dateTime BETWEEN ? AND ? \n" +
                    ") \n" +
                    "SELECT \n" +
                    "item1, item2, \n" +
                    "COUNT(*) AS frequency \n" +
                    "FROM \n" +
                    "OrderItems \n" +
                    "GROUP BY \n" +
                    "item1, item2 \n" +
                    "ORDER BY \n" +
                    "frequency DESC \n" +
                    "LIMIT 10;";

            PreparedStatement pstmt = connection.prepareStatement(sql);
            pstmt.setDate(1, start);
            pstmt.setDate(2, end);
            pstmt.setDate(3, start);
            pstmt.setDate(4, end);
            ResultSet resultSet = pstmt.executeQuery();

            while (resultSet.next()) {
                int item1Id = resultSet.getInt("item1");
                int item2Id = resultSet.getInt("item2");
                int frequency = resultSet.getInt("frequency");

                sellsTog.add(new SoldTogether(frequency, Item.findOneById(item1Id), Item.findOneById(item2Id)));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return sellsTog;
    }

    private static String buildPlaceholderString(int numParameters) {
        String str = "(";
        for (int i = 0; i < numParameters; i++) {
            str += "?";
            if (i < numParameters - 1) {
                str += ",";
            }
        }
        str += ")";
        return str;
    }
}
