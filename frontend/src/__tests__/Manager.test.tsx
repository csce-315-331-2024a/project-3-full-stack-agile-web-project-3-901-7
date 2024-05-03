import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import SalesTrends from "../pages/Manager/SalesTrends";
import AdminOrder from "../pages/Manager/NewOrder";
import EditOrderHistory from "../pages/Manager/EditOrderHistory";
import OrderHistory from "../pages/Manager/OrderHistory";
import EditMenuItemPage from "../pages/Manager/Menu/EditMenuItem";
import NewMenuItemPage from "../pages/Manager/Menu/NewMenuItem";
import ManagerMenu from "../pages/Manager/Menu/ManagerMenu";
import Inventory from "../pages/Manager/Inventory";

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
    it("should render manager menu page without crashing", () => {
        render(<ManagerMenu/>, {wrapper:BrowserRouter});
    })
    it("should render inventory page without crashing", () => {
        render(<Inventory/>, {wrapper:BrowserRouter});
    })
})