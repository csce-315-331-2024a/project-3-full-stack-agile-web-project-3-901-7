import { fireEvent, render, screen } from "@testing-library/react"
import Landing from "../pages/Landing"
import { BrowserRouter } from "react-router-dom";

describe("Landing Page Tests", () => {
        it("should render without crashing", () => {
            render(<Landing/>, { wrapper: BrowserRouter });
        })
        it("navigates to correct route when buttons are clicked", () => {
            render(<Landing/>, { wrapper: BrowserRouter });
            fireEvent.click(screen.getByText("I am a customer"));
            expect(window.location.pathname).toBe('/menu');
            fireEvent.click(screen.getByText("I am a cashier"));
            expect(window.location.pathname).toBe('/cashier/login');
            fireEvent.click(screen.getByText("I am a manager"));
            expect(window.location.pathname).toBe('/manager/login');
            fireEvent.click(screen.getByText("I am an administrator"));
            expect(window.location.pathname).toBe('/admin/login');
        })
})