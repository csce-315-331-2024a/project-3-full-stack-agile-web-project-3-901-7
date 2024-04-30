import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import AdminRoles from "../pages/Admin/AdminRoles";

describe("All Admin Page Tests", () => {
    it("should render admin page without crashing", () => {
        render(<Admin/>, { wrapper: BrowserRouter });
    })
    it("should render admin roles page without crashing", () => {
        render(<AdminRoles />, { wrapper: BrowserRouter});
    })
})