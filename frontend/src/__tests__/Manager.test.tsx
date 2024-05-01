import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import SalesTrends from "../pages/Manager/SalesTrends";
import AdminOrder from "../pages/Manager/NewOrder";
import EditOrderHistory from "../pages/Manager/EditOrderHistory";
import OrderHistory from "../pages/Manager/OrderHistory";
import EditMenuItemPage from "../pages/Manager/Menu/EditMenuItem";
import NewMenuItemPage from "../pages/Manager/Menu/NewMenuItem";
import ManagerMenu from "../pages/Manager/Menu/ManagerMenu";
import Inventory from "../pages/Manager/Inventory";
import { vi } from "vitest";
import { TextSizeProvider } from "../TextSizeContext";
import Manager from "../pages/Manager/Manager";
import ManagerTable from "../pages/Manager/Menu/ManagerTable";

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

describe("Manager NewMenuItem.tsx Tests", () => {
    
    it("should render new menu item page without crashing", () => {
        render(<NewMenuItemPage itemId={2}/>);
    })
})

describe("Manager Page Tests", () => {
    it("should render sales trend page without crashing", () => {
        render(<SalesTrends/>, { wrapper: BrowserRouter });
    })
    it("should render admin order page without crashing", () => {
        render(<AdminOrder/>, { wrapper: BrowserRouter });
    })
    it("should render order history page without crashing", () => {
        render(<OrderHistory/>, { wrapper: BrowserRouter });
    })
    it("should render edit menu item page without crashing", () => {
        render(<EditMenuItemPage/>, { wrapper: BrowserRouter });
    })
    it("should render new menu item page without crashing", () => {
        render(<NewMenuItemPage/>, {wrapper:BrowserRouter});
    })
    it("should render inventory page without crashing", () => {
        render(<Inventory/>, {wrapper:BrowserRouter});
    })
})