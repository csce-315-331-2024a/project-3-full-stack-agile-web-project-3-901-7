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

@SpringBootTest
@AutoConfigureMockMvc
public class HelloControllerTest {

	@Autowired
	private MockMvc mvc;

	@Test
	public void getHello() throws Exception {
		mvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().string(equalTo("wassup bro :)")));
	}

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

    // @Test
    // public void editRoleTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.post("/role/edit")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content("{\"name\":\"Updated Role\"}"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.success", equalTo(true)));
    // }

    @Test
    public void deleteRoleTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/role/delete")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Role to delete\"}"))
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

    // @Test
    // public void getOneItemByIdTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.get("/item/findOneById")
    //             .param("itemId", "1")
    //             .accept(MediaType.APPLICATION_JSON))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.id", equalTo(1)));
    // }

    @Test
    public void getItemsByCategoryTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/item/findByCategory")
                .param("category", "Test Category")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    public void insertItemTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/item/insert")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Test Item\",\"category\":\"Test Category\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", equalTo(true)));
    }

    @Test
    public void editItemTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/item/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Updated Item\",\"category\":\"Updated Category\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", equalTo(true)));
    }

    // @Test
    // public void deleteItemTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.post("/item/deleteById")
    //             .param("itemId", "1"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.success", equalTo(true)));
    // }

    // @Test
    // public void getSellsTogTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.get("/item/sellsTogether")
    //             .param("start", "2022-01-01")
    //             .param("end", "2022-12-31"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    // }

    // this shit bad dont insert empty order
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
    // public void deleteOrderTest() throws Exception {
    //     mvc.perform(MockMvcRequestBuilders.post("/order/deleteById")
    //             .param("order", "{\"name\":\"Order to delete\"}"))
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
                .param("ingredientName", "Test Ingredient")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    public void insertIngredientTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/ingredient/insert")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Test Ingredient\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", greaterThan(0)));
    }

    @Test
    public void editIngredientTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/ingredient/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Updated Ingredient\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", equalTo(true)));
    }

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
