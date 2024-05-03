import { BrowserRouter } from "react-router-dom"
import { TextSizeProvider } from "../TextSizeContext"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Kitchen from "../pages/Cashier/Kitchen"
import { Order } from "../components/EditOrderPopUp"
import { vi } from "vitest";

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

const mockReceivedOrders: Order[] = [
    {
        _id: 1,
        numItems: 2,
        orderInfo: "Cheeseburger,Fries",
        itemToQuantity: new Map([
            [1, 2],
            [2, 3],
        ]),
        total: 14.99,
        dateTime: new Date('2024-12-12'),
        status: 'received',
    },
];

const mockInProgressOrders: Order[] = [
    {
        _id: 1,
        numItems: 2,
        orderInfo: "Cheeseburger,Fries",
        itemToQuantity: new Map([
            [1, 2],
            [2, 3],
        ]),
        total: 14.99,
        dateTime: new Date('2024-12-12'),
        status: 'in progress',
    },
];

const mockItem = {
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


const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Kitchen Page Tests [Good]", () => {
    beforeEach(() => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockReceivedOrders
        }).mockResolvedValueOnce({
            ok: true,
            json: async () => mockInProgressOrders
        }).mockResolvedValueOnce({
            ok: true,
            json: async () => mockItem
        })
    })
    afterEach(() => {
        vi.clearAllMocks();
    })
    it("render kitchen page without issues", () => {
        customRender(<Kitchen/>)
    })
    it("should fetch received orders and in progress orders", async () => {
        customRender(<Kitchen/>)
        expect(mockFetch).toHaveBeenCalledTimes(2)
        await waitFor(() => {
            expect(screen.getByText("Received Orders")).toBeTruthy()
            expect(screen.getByText("In Progress Orders")).toBeTruthy()
            const startOrderBtn = screen.getByText("Start Order")
            fireEvent.click(startOrderBtn)
        })
    })
    
})

describe("Kitchen Page Tests [Bad]", () => {
    afterEach(() => {
        vi.clearAllMocks();
    })
    it("testing not ok response", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => mockReceivedOrders
        }).mockResolvedValueOnce({
            ok: false,
            json: async () => mockInProgressOrders
        })
        customRender(<Kitchen/>)
        expect(mockFetch).toHaveBeenCalledTimes(2)
        await waitFor(() => {
            expect(screen.getByText("Received Orders")).toBeTruthy()
            expect(screen.getByText("In Progress Orders")).toBeTruthy()
        })
    })
    it("testing if data is not an array", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {}
        }).mockResolvedValueOnce({
            ok: true,
            json: async () => {}
        })
        customRender(<Kitchen/>)
        expect(mockFetch).toHaveBeenCalledTimes(2)
        await waitFor(() => {
            expect(screen.getByText("Received Orders")).toBeTruthy()
            expect(screen.getByText("In Progress Orders")).toBeTruthy()
        })
    })
})