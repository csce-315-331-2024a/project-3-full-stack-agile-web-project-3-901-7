import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest"
import Inventory from "../pages/Manager/Inventory";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { TextSizeProvider } from "../TextSizeContext";

vi.mock("../pages/Login", () => ({
    getUserAuth: vi.fn().mockResolvedValue({
        _id: 123,
        email: "weiwu@tamu.edu",
        name: "Warren Wu",
        given_name: "Warren",
        family_name: "Wu",
        picture: "https://lh3.googleusercontent.com/a/ACg8ocL9v0n1KM6ZOtKSYKkwg7IdtlwYGUmKlK4uJnx5WYunJuKQ06ao=s96-c",
    })
}))

const mockFetch = vi.fn();
global.fetch = mockFetch;

const customRender = (ui:any, options?:any) => {
    return render(
        <GoogleOAuthProvider clientId="12221267435-lsk9h3j605atjq4n35dvpsf2gun7dh6a.apps.googleusercontent.com">
            <BrowserRouter>
                <TextSizeProvider>
                {ui}
                </TextSizeProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>,
        options
    )
}

const mockIngredientData = [
    {
        _id: 17,
        name: "grilled chicken",
        quantity: 80,
        minQuantity: 8,
        unitPrice: 7.99,
        supplier: "MeatSupplier"
      },
      {
        _id: 18,
        name: "crispy chicken tenders",
        quantity: 100,
        minQuantity: 10,
        unitPrice: 6.99,
        supplier: "MeatSupplier"
      },
      {
        _id: 20,
        name: "Buffalo Sauce",
        quantity: 40,
        minQuantity: 4,
        unitPrice: 3.49,
        supplier: "SauceSupplier"
      },
      {
        _id: 21,
        name: "BBQ sauce",
        quantity: 50,
        minQuantity: 5,
        unitPrice: 2.99,
        supplier: "SauceSupplier"
      },
      {
        _id: 22,
        name: "Honey mustard sauce",
        quantity: 30,
        minQuantity: 3,
        unitPrice: 3.99,
        supplier: "SauceSupplier"
      },
      {
        _id: 23,
        name: "rancy sauce",
        quantity: 20,
        minQuantity: 2,
        unitPrice: 3.49,
        supplier: "SauceSupplier"
      },
      {
        _id: 34,
        name: "napkins",
        quantity: 500,
        minQuantity: 50,
        unitPrice: 0.19,
        supplier: "DisposableSupplier"
      },
      {
        _id: 39,
        name: "hot dog sausages",
        quantity: 50,
        minQuantity: 5,
        unitPrice: 4.99,
        supplier: "MeatSupplier"
      },
      {
        _id: 16,
        name: "gravy",
        quantity: 26,
        minQuantity: 3,
        unitPrice: 4.99,
        supplier: "SauceSupplier"
      },
      {
        _id: 25,
        name: "onion rings",
        quantity: 36,
        minQuantity: 4,
        unitPrice: 4.99,
        supplier: "VegetableSupplier"
      },
      {
        _id: 35,
        name: "utensils",
        quantity: 140,
        minQuantity: 15,
        unitPrice: 0.79,
        supplier: "DisposableSupplier"
      },
      {
        _id: 14,
        name: "salt",
        quantity: 486,
        minQuantity: 50,
        unitPrice: 0.99,
        supplier: "SeasoningSupplier"
      },
]

describe("Inventory.tsx", () => {
    afterEach(() => {
        vi.clearAllMocks();
    })
    it("fetch data and render Inventory page properly", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockIngredientData
        })
        customRender(<Inventory />)
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(screen.getByText("grilled chicken")).toBeTruthy();
        })
    })
    it("throw fetch error", () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => mockIngredientData
        })
        customRender(<Inventory />)
    })
    it("click header to sort", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockIngredientData
        })
        customRender(<Inventory />)
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(screen.getByText("grilled chicken")).toBeTruthy();
        })
        fireEvent.click(screen.getByText("Ingredient ID ▲"));
        fireEvent.click(screen.getByText("Ingredient ID ▼"));
        fireEvent.click(screen.getByText("Name"));
        fireEvent.click(screen.getByText("Name ▲"));
        fireEvent.click(screen.getByText("Name ▼"));
        fireEvent.click(screen.getByText("Quantity"));
        fireEvent.click(screen.getByText("Quantity ▲"));
        fireEvent.click(screen.getByText("Quantity ▼"));
        fireEvent.click(screen.getByText("Min Quantity"));
        fireEvent.click(screen.getByText("Min Quantity ▲"));
        fireEvent.click(screen.getByText("Min Quantity ▼"));
        fireEvent.click(screen.getByText("Unit Price"));
        fireEvent.click(screen.getByText("Unit Price ▲"));
        fireEvent.click(screen.getByText("Unit Price ▼"));
        fireEvent.click(screen.getByText("Supplier"));
        fireEvent.click(screen.getByText("Supplier ▲"));
        fireEvent.click(screen.getByText("Supplier ▼"));
    })
    it("click - button to delete ingredient", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockIngredientData
        })
        customRender(<Inventory />)
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(screen.getByText("grilled chicken")).toBeTruthy();
        })
        fireEvent.click(screen.getAllByText("-")[0]);
        // confirm deletion
        fireEvent.click(screen.getByText("Delete"));
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(2);
        })
    })
    it("click + to add new ingredient", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockIngredientData
        })
        customRender(<Inventory />)
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(screen.getByText("grilled chicken")).toBeTruthy();
        })
        fireEvent.click(screen.getByText("+"));
        fireEvent.click(screen.getByText("Save"));
        fireEvent.click(screen.getByText("Close"));
        await waitFor(() => {
            expect(screen.getByText("Enter name")).toBeTruthy();
        })
    })
    it("check low stock and reorder low stock buttons work properly", async() => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockIngredientData
        })
        customRender(<Inventory />)
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
        })
        fireEvent.click(screen.getByText("Show Low-Stock"));
        fireEvent.click(screen.getByText("Reorder Stock"));
    })
    it("checking added ingredient is valid", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockIngredientData
        })
        customRender(<Inventory />)
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
        })
        fireEvent.click(screen.getByText("+"));
        const name = screen.getByText("Enter name");
        fireEvent.doubleClick(name);
    })
})