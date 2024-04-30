import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Landing from "../pages/Landing"
import { BrowserRouter } from "react-router-dom";

describe("Landing Page Tests", () => {
        it("should render without crashing", () => {
            render(<Landing/>, { wrapper: BrowserRouter });
        })
        it("navigates to correct route when buttons are clicked", () => {
            render(<Landing/>, { wrapper: BrowserRouter });

            waitFor(() => {
                const customerButton = screen.getByText("Loading");
                expect(customerButton).toBeTruthy();
            })
        })
})