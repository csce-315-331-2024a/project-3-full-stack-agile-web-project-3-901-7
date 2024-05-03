import { render } from "@testing-library/react";
import EditMenuItemPage from "../pages/Manager/Menu/EditMenuItem";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import NewMenuItemPage from "../pages/Manager/Menu/NewMenuItem";


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
    it("should render without crashing", () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => testItem
        }).mockResolvedValueOnce({
            json: async () => testIngredients
        }).mockResolvedValueOnce({
            json: async () => [testItem]
        })
        render(<NewMenuItemPage itemId={1} />);
    })
})