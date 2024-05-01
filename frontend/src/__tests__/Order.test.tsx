import { BrowserRouter } from "react-router-dom";
import Order from "../pages/Order/Order";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TextSizeProvider } from "../TextSizeContext";
import { vi } from "vitest"

const customRender = (ui:any, options?:any) => {
    return render(
        <BrowserRouter>
            <TextSizeProvider>
            {ui}
            </TextSizeProvider>
        </BrowserRouter>,
        options
    )
}

const mockFetch = vi.fn();
global.fetch = mockFetch;


describe("Order Page Tests", () => {
    beforeEach(() => {
        mockFetch.mockResolvedValueOnce({
            json: async () => [
                {
                    _id: 1,
                    name: "Test Name 1",
                    price: 10.22,
                    category: "Burger",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 1",
                },
                {
                    _id: 2,
                    name: "Test Name 2",
                    price: 20,
                    category: "Chicken",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 2",
                },
                {
                    _id: 3,
                    name: "Test Name 3",
                    price: 30,
                    category: "Side",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 3",
                }
            ]
        })
    })
    afterEach(() => {
        vi.clearAllMocks();
    })

    it("should render order page without crashing", () => {
        customRender(<Order/>);
    })
    it("should render loading state initially", () => {
        customRender(<Order/>);
        expect(screen.getByText("Loading...")).toBeTruthy();
    })
    it("should display item belonging to burger category after loading", async () => {
        customRender(<Order/>);
        await waitFor(() => {
            expect(screen.getByText("Test Name 1")).toBeTruthy();
            expect(screen.getByText("$10.22")).toBeTruthy();
        })
    })
    it("clicking on another category should display items belonging to that category", async () => {
        customRender(<Order/>);
        await waitFor(() => {
            expect(screen.getByText("Burger")).toBeTruthy();
        })
        fireEvent.click(screen.getByText("Chicken"));
        expect(screen.getByText("Test Name 2")).toBeTruthy();
        fireEvent.click(screen.getByText("Side"));
        expect(screen.getByText("Test Name 3")).toBeTruthy();
    })
    it("on click change quantity buttons/inputs should work properly", async () => {
        customRender(<Order/>);
        await waitFor(() => {
            expect(screen.getByText("Burger")).toBeTruthy();
        })
        // get the add button (sibling of 0)
        const inputVal:any = screen.getByDisplayValue("0");
        const addBtn = inputVal.previousElementSibling;
        const subBtn = inputVal.nextElementSibling;
        fireEvent.click(addBtn);
        expect(inputVal.value).toBe("1");
        fireEvent.click(subBtn);
        expect(inputVal.value).toBe("0");
        fireEvent.change(inputVal, {target: {value: "5"}});
        expect(inputVal.value).toBe("5");
        fireEvent.change(inputVal, {target: {value: "-5"}});
        expect(inputVal.value).toBe("0");
        fireEvent.change(inputVal, {target: {value: ""}});
        expect(inputVal.value).toBe("0");
    })
    it("additional add quantity button tests", async () => {
        customRender(<Order/>);
        await waitFor(() => {
            expect(screen.getByText("Burger")).toBeTruthy();
        })
        const inputVal:any = screen.getByDisplayValue("0");
        const addBtn = inputVal.previousElementSibling;
        const subBtn = inputVal.nextElementSibling;
        fireEvent.click(addBtn);
        fireEvent.click(addBtn);
        expect(inputVal.value).toBe("2");
        fireEvent.click(subBtn);
        fireEvent.click(subBtn);
        expect(inputVal.value).toBe("0");
    })
    it("additional change input tests", async () => {
        customRender(<Order/>);
        await waitFor(() => {
            expect(screen.getByText("Burger")).toBeTruthy();
        })
        const inputVal:any = screen.getByDisplayValue("0");
        fireEvent.change(inputVal, {target: {value: "2"}});
        expect(inputVal.value).toBe("2");
        fireEvent.change(inputVal, {target: {value: "0"}});
    })
})

describe("Additional Order Tests", () => {
    beforeEach(() => {
        mockFetch.mockResolvedValueOnce({
            json: async () => [
                {
                    _id: 1,
                    name: "Test Name 1",
                    price: 10.22,
                    category: "Burger",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 1",
                },
                {
                    _id: 2,
                    name: "Test Name 2",
                    price: 20,
                    category: "Chicken",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 2",
                },
                {
                    _id: 3,
                    name: "Test Name 3",
                    price: 30,
                    category: "Side",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 3",
                }
            ]
        }).mockResolvedValueOnce({
            json: async () => ({
                success: true
            })
        })
    })
    afterEach(() => {
        vi.clearAllMocks();
    })

    it("help request gets sent properly", async () => {
        customRender(<Order/>);
        await waitFor(() => {
            expect(screen.getByText("Burger")).toBeTruthy();
        })
        const helpBtn = screen.getByText("Call Help");
        fireEvent.click(helpBtn);
        await waitFor(() => {
            expect(screen.getByText("close")).toBeTruthy();
        })
    })
})

describe("Additional Order Tests", () => {
    beforeEach(() => {
        mockFetch.mockResolvedValueOnce({
            json: async () => [
                {
                    _id: 1,
                    name: "Test Name 1",
                    price: 10.22,
                    category: "Burger",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 1",
                },
                {
                    _id: 2,
                    name: "Test Name 2",
                    price: 20,
                    category: "Chicken",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 2",
                },
                {
                    _id: 3,
                    name: "Test Name 3",
                    price: 30,
                    category: "Side",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 3",
                }
            ]
        }).mockResolvedValueOnce({
            json: async () => ({
                success: false
            })
        })
    })
    afterEach(() => {
        vi.clearAllMocks();
    })

    it("help request gets sent properly", async () => {
        customRender(<Order/>);
        await waitFor(() => {
            expect(screen.getByText("Burger")).toBeTruthy();
        })
        const helpBtn = screen.getByText("Call Help");
        fireEvent.click(helpBtn);
    })
})

describe("Order Receipt Tests", () => {
    beforeEach(() => {
        mockFetch.mockResolvedValueOnce({
            json: async () => [
                {
                    _id: 1,
                    name: "Test Name 1",
                    price: 10.22,
                    category: "Burger",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 1",
                },
                {
                    _id: 2,
                    name: "Test Name 2",
                    price: 20,
                    category: "Chicken",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 2",
                },
                {
                    _id: 3,
                    name: "Test Name 3",
                    price: 30,
                    category: "Side",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 3",
                }
            ]
        }).mockResolvedValueOnce({
            json: async () => ({
                success: true
            })
        })
    })
    afterEach(() => {
        vi.clearAllMocks();
    })

    it("on click change quantity buttons/inputs should work properly", async () => {
        customRender(<Order/>);
        await waitFor(() => {
            expect(screen.getByText("Burger")).toBeTruthy();
        })
        // get the add button (sibling of 0)
        const inputVal1:any = screen.getByDisplayValue("0");
        fireEvent.change(inputVal1, {target: {value: "69"}});
        expect(inputVal1.value).toBe("69");
        const inputVal2:any = screen.getAllByDisplayValue("69")[1];
        const addBtn = inputVal2.previousElementSibling;
        const subBtn = inputVal2.nextElementSibling;
        fireEvent.click(addBtn);
        expect(inputVal2.value).toBe("70");
        fireEvent.click(subBtn);
        expect(inputVal2.value).toBe("69");
        fireEvent.change(inputVal2, {target: {value: "42"}});
        expect(inputVal2.value).toBe("42");
        fireEvent.change(inputVal2, {target: {value: "-42"}});
        expect(inputVal2.value).toBe("0");
        fireEvent.change(inputVal2, {target: {value: ""}});
        expect(inputVal2.value).toBe("");

        // fireEvent.change(inputVal1, {target: {value: "1"}});
        // const inputVal3:any = screen.getAllByDisplayValue("1")[1];
        // const subBtn2 = inputVal3.nextElementSibling;
        // fireEvent.click(subBtn2);
        // expect(inputVal3).toBeFalsy();

        const sendOrderBtn = screen.getByText("Checkout");
        fireEvent.click(sendOrderBtn);
    })
})