import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import SalesTrends from "../pages/Manager/SalesTrends";
import AdminOrder from "../pages/Manager/NewOrder";
import OrderHistory from "../pages/Manager/OrderHistory";
import ManagerMenu from "../pages/Manager/Menu/ManagerMenu";
import { vi } from "vitest";
import { TextSizeProvider } from "../TextSizeContext";
import ManagerTable from "../pages/Manager/Menu/ManagerTable";
import { Order } from "../components/EditOrderPopUp";

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

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Manager Menu Tests Fetching", () => {
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
    it("should render sales trend page without crashing", async () => {
        customRender(<ManagerMenu />);
    })
})

describe("Manager Table Tests", () => {
    const headerColumns = ['Name', 'Age'];
    const thumbnails = ['image1.jpg', 'image2.jpg'];
    const data = [
      [1, 'John', 25],
      [2, 'Alice', 30]
    ];

    it('renders table headers correctly', () => {
        render(<ManagerTable headerColumns={headerColumns} data={data} />);
    });
})

const salesReport = {
    "Water": 158652.06,
    "Pepsi": 176130.18,
  }
const excessData = [
    {
      _id: 1,
      name: "bacon",
      quantity: 10,
      minQuantity: 10,
      unitPrice: 5.59,
      supplier: "BaconSupplier"
    },
]

describe("SalesTrend.tsx", async () => {
    it("fetch sales trend data", () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => {}
        }).mockResolvedValueOnce({
            json: async () => salesReport
        }).mockResolvedValueOnce({
            json: async () => excessData
        }).mockResolvedValueOnce({
            json: async () => []
        })
        customRender(<SalesTrends />);
    })
})

const mockOrders: Order[] = [
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
    {
        _id: 2,
        numItems: 2,
        orderInfo: "Cheeseburger,Fries",
        itemToQuantity: new Map([
            [1, 2],
            [2, 3],
        ]),
        total: 14.99,
        dateTime: new Date('2024-12-03'),
        status: 'completed',
    },
    {
        _id: 3,
        numItems: 2,
        orderInfo: "Cheeseburger,Fries",
        itemToQuantity: new Map([
            [1, 2],
            [2, 3],
        ]),
        total: 14.99,
        dateTime: new Date('2024-12-18'),
        status: 'in progress',
    },
];

describe("OrderHistory.tsx", () => {
    it("fetch order history data", () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => mockOrders
        })
        customRender(<OrderHistory />);
    })
})

const items = [
    {
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
]

describe("NewOrder.tsx", () => {
    afterEach(() => {
        vi.clearAllMocks();
    })
    it("fetch order history data", () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => items
        })
        customRender(<AdminOrder />);
    })
    it("ensure search item works properly", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => items
        })
        customRender(<AdminOrder />);
        await waitFor(() => {
            const inputField = screen.getByPlaceholderText("search item");
            fireEvent.change(inputField, {target: {value: "Bacon"}});
        })
    })
    it("test speed ordering works", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => items
        })
        customRender(<AdminOrder />);
        await waitFor(() => {
            const itemIdInputField = screen.getByPlaceholderText("Enter item id to quickly order...")
            const qtyInputField = screen.getByPlaceholderText("Enter quantity...")
            const submitButton = screen.getByText("add")
            fireEvent.change(itemIdInputField, {target: {value: "1"}});
            fireEvent.change(qtyInputField, {target: {value: "2"}});
            fireEvent.click(submitButton);
        })
    })
    it("test item add/sub/input work properly", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => items
        })
        customRender(<AdminOrder />);
        await waitFor(() => {
            const inputField = screen.getByDisplayValue("0");
            const addBtn:any = inputField.previousElementSibling;
            const subBtn:any = inputField.nextElementSibling;
            fireEvent.click(addBtn);
            fireEvent.click(subBtn);
            fireEvent.change(inputField, {target: {value: "5"}});
        })
    })
})