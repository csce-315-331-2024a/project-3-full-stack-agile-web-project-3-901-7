import { render } from "@testing-library/react"
import Landing from "../pages/Landing"
import { BrowserRouter } from "react-router-dom";

describe("Landing Page Tests", () => {
    it("should render without crashing", () => {
        render(<Landing/>, { wrapper: BrowserRouter });
    })
})