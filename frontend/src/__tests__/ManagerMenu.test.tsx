import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditMenuItemPage from "../pages/Manager/Menu/EditMenuItem";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import NewMenuItemPage from "../pages/Manager/Menu/NewMenuItem";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { TextSizeProvider } from "../TextSizeContext";


describe("EditMenuItem.tsx", () => {
    afterEach(() => {
        vi.clearAllMocks();
    })
    it("should render without crashing", () => {
        vi.mock("react-router-dom", async (importOriginal) => {
            const actual:any = await importOriginal();
            return {
                ...actual,
                useParams: () => ({ itemId: "1" }),
            }
        })
        render(<EditMenuItemPage />, { wrapper: BrowserRouter});
    })
    it("pass in undefined when no item id is provided", () => {
        vi.mock("react-router-dom", async (importOriginal) => {
            const actual:any = await importOriginal();
            return {
                ...actual,
                useParams: () => ({ itemId: undefined }),
            }
        })
        render(<EditMenuItemPage />, { wrapper: BrowserRouter});
    })
})

describe("NewMenuItem.tsx", () => {
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
    const testItem = {
        _id: 1,
        name: "Bacon Cheeseburger",
        price: 8.29,
        category: "Burger",
        ingredientInfo: "bacon",
        ingredients: [
          {
            _id: 1,
            name: "bacon",
            quantity: 10,
            minQuantity: 10,
            unitPrice: 5.59,
            supplier: "BaconSupplier"
          }
        ],
        startDate: "2022-02-01",
        endDate: null,
        picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
        itemDesc: "itemDesc",
        available: false,
        id: 1
    }
    const testIngredients = [
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
    ]
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
    beforeEach(() => {
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
    })
    afterEach(() => {
        vi.clearAllMocks();
    })
    it("should render without crashing", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => testItem
        }).mockResolvedValueOnce({
            json: async () => testIngredients
        }).mockResolvedValueOnce({
            json: async () => [testItem]
        })
        customRender(<NewMenuItemPage itemId={1} />);
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(3);
        })
    })
    it("input fields work", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => testIngredients
        }).mockResolvedValueOnce({
            json: async () => [testItem]
        })
        customRender(<NewMenuItemPage />);
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(2);
        })
        const inputFields = screen.getAllByRole("textbox");
        const name = inputFields[0];
        const price = inputFields[1];
        const desc = inputFields[2];
        const category = screen.getByDisplayValue("Burger");
        const ingredient = screen.getByDisplayValue("grilled chicken");
        fireEvent.change(name, { target: { value: "New Item" }});
        fireEvent.change(price, { target: { value: "10.99" }});
        fireEvent.change(desc, { target: { value: "New Item Description" }});
        fireEvent.change(category, { target: { checked: true }});
        fireEvent.change(ingredient, { target: { checked: true }});
    })
    it("check cancel button works", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => testIngredients
        }).mockResolvedValueOnce({
            json: async () => [testItem]
        })
        customRender(<NewMenuItemPage />);
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(2);
        })
        fireEvent.click(screen.getByText("Cancel"));
    })
    it("update item works as expected", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => testItem
        }).mockResolvedValueOnce({
            json: async () => testIngredients
        }).mockResolvedValueOnce({
            json: async () => [testItem]
        })
        customRender(<NewMenuItemPage itemId={1} />);
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(3);
        })
        fireEvent.click(screen.getByText("Update Item"));
        fireEvent.click(screen.getByText("Confirm"));
    })
})