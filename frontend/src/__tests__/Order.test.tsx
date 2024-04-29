import { BrowserRouter } from "react-router-dom";
import Order from "../pages/Order/Order";
import { render } from "@testing-library/react";
import OrderHistory from "../pages/Manager/OrderHistory";
import OrderItems from "../pages/Order/OrderItems";
import OrderReceipt from "../pages/Order/OrderReceipt";

describe("Order Page Tests", () => {
    it("should render order page without crashing", () => {
        render(<Order/>, { wrapper: BrowserRouter });
    })
    it("should render order header component without crashing", () => {
        render(<OrderHistory/>, { wrapper: BrowserRouter });
    })
    it("should render order items component without crashing", () => {
        render(<OrderItems items={[]} currCategory={""}/>, {wrapper:BrowserRouter})
    })
    it("should render order receipt component without crashing", () => {
        render(<OrderReceipt items={[]}/>, {wrapper:BrowserRouter})
    })
})