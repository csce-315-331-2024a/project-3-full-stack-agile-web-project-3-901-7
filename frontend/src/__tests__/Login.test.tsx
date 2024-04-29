import { render } from "@testing-library/react";
import { Login } from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const customRender = (ui:any, options?:any) => {
    return render(
        <GoogleOAuthProvider clientId="12221267435-lsk9h3j605atjq4n35dvpsf2gun7dh6a.apps.googleusercontent.com">
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </GoogleOAuthProvider>,
        options
    )
}

describe("Login Page Tests", () => {
    it("should render login page with signup as cashier without crashing", () => {
        customRender(<Login type="cashier" signup/>);
    })
    it("should render login page without signup as cashier without crashing", () => {
        customRender(<Login type="cashier"/>);
    })
    it("should render login page as customer without crashing", () => {
        customRender(<Login type="customer"/>)
    })
    it("should render login page as manager without crashing", () => {
        customRender(<Login type="manager" />);
    })
    it("should render login page as admin without crashing", () => {
        customRender(<Login type="admin"/>)
    })
});