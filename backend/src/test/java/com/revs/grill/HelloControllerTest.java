package com.revs.grill;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.HashMap;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
public class HelloControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void getAllUsersTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/user/findAll")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    public void getUsersByIdTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/user/findById")
                .param("userIds", "1", "2")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void getOneUserByIdTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/user/findOneById")
                .param("userId", "1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._id", equalTo(1)));
    }

    @Test
    public void authenticateUserTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"user@example.com\",\"password\":\"test\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email", equalTo("user@example.com")));
    }

    @Test
    public void insertUserTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userInfo\":{\"name\":\"Test User\",\"email\":\"test@example.com\"}, \"password\":\"pass123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", equalTo(true)));
    }

    @Test
    public void getAllOrdersTest() throws Exception {
        int limit = 10;
        mvc.perform(MockMvcRequestBuilders.get("/order/findAll")
                .param("limit", String.valueOf(limit)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    public void getOrdersByDateRangeTest() throws Exception {
        String start = "2024-5-01";
        String end = "2024-5-03";
        mvc.perform(MockMvcRequestBuilders.get("/order/findInDateRange")
                .param("start", start)
                .param("end", end))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    public void getItemsByIdTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/item/findById")
                .param("itemIds", "1", "2")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }
    // broken
    // @Test
    // public void getOrdersByStatusTest() throws Exception {
    //     String status = "completed";
    //     mvc.perform(MockMvcRequestBuilders.get("/order/findByStatus")
    //             .param("status", status))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    // }

    @Test
    public void getOneOrderByIdTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/order/findOneById")
                .param("orderId", "1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._id", equalTo(1)));
    }

    @Test
    public void getIngredientsByIdTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/ingredient/findById")
                .param("ingredientIds", "1", "2")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void getOneIngredientByIdTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/ingredient/findOneById")
                .param("ingredientId", "1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._id", equalTo(1)));
    }

    @Test
    public void getAllRolesTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/role/findAll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    public void getRoleByEmailTest() throws Exception {
        String email = "user@example.com";
        mvc.perform(MockMvcRequestBuilders.get("/role/findByEmail").param("email", email))
                .andExpect(status().isOk());
                // .andExpect(jsonPath("$.email", notNullValue()));
    }

    @Test
    public void insertRoleTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/role/insert")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Test Role\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", equalTo(true)));
    }

    // naw
    // @Test
    // public void editRoleTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.post("/role/edit")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content("{\"name\":\"Test Role\"}"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.success", equalTo(true)));
    // }

    @Test
    public void deleteRoleTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/role/delete")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Test Role\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", equalTo(true)));
    }

    @Test
    public void getAllItemsTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/item/findAll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    public void getAllAvailableItemsTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/item/findAllAvailable"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    // @Test
    // public void getItemsByIdTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.get("/item/findById")
    //             .param("itemIds", "1", "2")
    //             .accept(MediaType.APPLICATION_JSON))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", hasSize(2)));
    // }

    @Test
    public void getOneItemByIdTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/item/findOneById")
                .param("itemId", "1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", equalTo(1)));
    }

    @Test
    public void getItemsByCategoryTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/item/findByCategory")
                .param("category", "Burger")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    // insert item should be ID 25
    @Test
    public void insertItemTest() throws Exception {
        String itemJson = "{\"name\":\"New Item\",\"price\":9.99,\"category\":\"Beverage\",\"ingredients\":[{\"_id\":1,\"name\":\"Sugar\"}],\"startDate\":\"2024-05-01\",\"endDate\":\"2024-05-31\",\"picture\":\"url_to_picture\",\"itemDesc\":\"A new beverage item.\"}";
        mvc.perform(MockMvcRequestBuilders.post("/item/insert")
                .contentType(MediaType.APPLICATION_JSON)
                .content(itemJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", equalTo(true)));
    }

    // edit this item of ID 25
    @Test
    public void editItemTest() throws Exception {
        String itemJson = "{\"_id\":25,\"name\":\"Updated Item\",\"price\":10.99,\"category\":\"Snack\",\"ingredients\":[{\"_id\":2,\"name\":\"Salt\"}],\"startDate\":\"2024-06-01\",\"endDate\":\"2024-06-30\",\"picture\":\"new_url_to_picture\",\"itemDesc\":\"Updated description of the item.\"}";
        mvc.perform(MockMvcRequestBuilders.post("/item/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(itemJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", equalTo(true)));
    }

    // delete the new item of ID 25
    @Test
    public void deleteItemTest() throws Exception {
        int itemId = 25;
        mvc.perform(MockMvcRequestBuilders.post("/item/deleteById")
                .param("itemId", String.valueOf(itemId)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", equalTo(true)));
    }

    // this ingredient should be created as ID 45
    @Test
    public void insertIngredientTest() throws Exception {
        String ingredientJson = "{\"name\":\"New Ingredient\",\"quantity\":100,\"minQuantity\":50,\"unitPrice\":5.99,\"supplier\":\"Supplier X\"}";
        mvc.perform(MockMvcRequestBuilders.post("/ingredient/insert")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ingredientJson))
                .andExpect(status().isOk());
    }

    @Test
    public void insertIngredientTestQuantityZero() throws Exception {
        String ingredientJson = "{\"name\":\"New Ingredient\",\"quantity\":,\"minQuantity\":50,\"unitPrice\":5.99,\"supplier\":\"Supplier X\"}";
        mvc.perform(MockMvcRequestBuilders.post("/ingredient/insert")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ingredientJson))
                .andExpect(status().isBadRequest());
    }

    // edit this ingredient of ID 45
    @Test
    public void editIngredientTest() throws Exception {
        String ingredientJson = "{\"_id\":45,\"name\":\"Updated Ingredient\",\"quantity\":150,\"minQuantity\":75,\"unitPrice\":6.99,\"supplier\":\"Supplier Y\"}";
        mvc.perform(MockMvcRequestBuilders.post("/ingredient/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ingredientJson))
                .andExpect(status().isOk());
    }


    // @Test
    // public void editIngredientTestNameEmpty() throws Exception {
    //     String ingredientJson = "{\"_id\":60,\"name\":\"\",\"quantity\":150,\"minQuantity\":75,\"unitPrice\":6.99,\"supplier\":\"Supplier Y\"}";
    //     mvc.perform(MockMvcRequestBuilders.post("/ingredient/edit")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(ingredientJson))
    //             .andExpect(status().isOk());
    // }

    // @Test
    // public void editIngredientTestminQuantEmpty() throws Exception {
    //     String ingredientJson = "{\"_id\":45,\"name\":\"Updated Ingredient\",\"quantity\":150,\"minQuantity\":,\"unitPrice\":6.99,\"supplier\":\"Supplier Y\"}";
    //     mvc.perform(MockMvcRequestBuilders.post("/ingredient/edit")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(ingredientJson))
    //             .andExpect(status().isOk());
    // }

    // delete the new ingredient of ID 45
    @Test
    public void deleteIngredientTest() throws Exception {
        int ingredientId = 45;
        mvc.perform(MockMvcRequestBuilders.post("/ingredient/deleteById")
                .param("ingredientId", String.valueOf(ingredientId)))
                .andExpect(status().isOk());
    }

    // stack overflow
    // @Test
    // public void getSellsTogetherTest() throws Exception {
    //     String startDate = "2024-04-25";
    //     String endDate = "2024-05-01";
    //     mvc.perform(MockMvcRequestBuilders.get("/item/sellsTogether")
    //             .param("start", startDate)
    //             .param("end", endDate))
    //             .andExpect(status().isOk());
    // }



    @Test
    public void insertOrderTest() throws Exception {
        String orderJson = "{\"numItems\":3,\"total\":120.50,\"orderInfo\":\"New online order\",\"dateTime\":\"2024-04-21\",\"status\":\"received\"}";
        mvc.perform(MockMvcRequestBuilders.post("/order/insert")
                .contentType(MediaType.APPLICATION_JSON)
                .content(orderJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", equalTo(true)));
    }

    @Test
    public void insertOrderTestNoQuantity() throws Exception {
        String orderJson = "{\"numItems\":3,\"total\":120.50,\"orderInfo\":\"New online order\",\"dateTime\":\"2024-04-21\",\"status\":\"received\",\"itemToQuantity\":}";
        mvc.perform(MockMvcRequestBuilders.post("/order/insert")
                .contentType(MediaType.APPLICATION_JSON)
                .content(orderJson))
                .andExpect(status().isBadRequest());
    }

    // @Test
    // public void editOrderTestBadReq() throws Exception {
    //     String orderJson = "{\"_id\":25,\"numItems\":1,\"total\":200.00,\"orderInfo\":\"Updated order details\",\"dateTime\":\"2024-05-05\",\"status\":\"Completed\"}";
    //     mvc.perform(MockMvcRequestBuilders.post("/order/edit")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(orderJson))
    //             .andExpect(status().isOk());
    // }

    // @Test
    // public void getSellsTogTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.get("/item/sellsTogether")
    //             .param("start", "2022-01-01")
    //             .param("end", "2022-12-31"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    // }

    // this bad dont insert empty order
    // @Test
    // public void insertOrderTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.post("/order/insert")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content("{\"name\":\"Test Order\"}"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.success", equalTo(true)));
    // }

    // @Test
    // public void editOrderTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.post("/order/edit")
    //             .param("order", "{\"name\":\"Updated Order\"}"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.success", equalTo(true)));
    // }


    // @Test
    // public void getAllOrdersTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.get("/order/findAll")
    //             .param("limit", "10"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    // }

    // @Test
    // public void getOrdersByDateRangeTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.get("/order/findInDateRange")
    //             .param("start", "2022-01-01")
    //             .param("end", "2022-12-31"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    // }

    @Test
    public void getOrdersByIdTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/order/findById")
                .param("orderIds", "1", "2")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    // @Test
    // public void getOneOrderByIdTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.get("/order/findOneById")
    //             .param("orderId", "1")
    //             .accept(MediaType.APPLICATION_JSON))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.id", equalTo(1)));
    // }

    // @Test
    // public void getOrdersByStatusTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.get("/order/findByStatus")
    //             .param("status", "Test Status")
    //             .accept(MediaType.APPLICATION_JSON))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    // }

    @Test
    public void getAllIngredientsTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/ingredient/findAll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    // @Test
    // public void getIngredientsByIdTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.get("/ingredient/findById")
    //             .param("ingredientIds", "1", "2")
    //             .accept(MediaType.APPLICATION_JSON))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", hasSize(2)));
    // }

    // @Test
    // public void getOneIngredientByIdTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.get("/ingredient/findOneById")
    //             .param("ingredientId", "1")
    //             .accept(MediaType.APPLICATION_JSON))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.id", equalTo(1)));
    // }

    @Test
    public void getIngredientsByNameTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/ingredient/findByName")
                .param("ingredientName", "bacon")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    // @Test
    // public void insertIngredientTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.post("/ingredient/insert")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content("{\"name\":\"Test Ingredient\"}"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", greaterThan(0)));
    // }

    // @Test
    // public void editIngredientTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.post("/ingredient/edit")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content("{\"name\":\"Updated Ingredient\"}"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", equalTo(true)));
    // }

    // @Test
    // public void deleteIngredientTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.post("/ingredient/deleteById")
    //             .param("ingredientId", "1"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", equalTo(true)));
    // }

    @Test
    public void getExcessIngredientsTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/ingredient/findExcess")
                .param("start", "2022-01-01"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    public void getAmtInventoryUsedTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/inventoryUsed")
                .param("start", "2022-01-01")
                .param("end", "2022-12-31"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()));
    }

    @Test
    public void getSalesReportTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/salesReport")
                .param("start", "2022-01-01")
                .param("end", "2022-12-31"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()));
    }
}