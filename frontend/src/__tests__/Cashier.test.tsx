import { BrowserRouter } from "react-router-dom";
import Cashier from "../pages/Cashier/Cashier";
import { render } from "@testing-library/react";

describe("Cashier Page Tests", () => {
    it("should render cashier page without crashing", () => {
        render(<Cashier/>, { wrapper: BrowserRouter });
    })
})