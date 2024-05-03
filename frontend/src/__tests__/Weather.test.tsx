import { render } from "@testing-library/react";
import Weather from "../pages/Weather";
import { BrowserRouter } from "react-router-dom";

describe("Weather Page Tests", () => {
    it("should render weather page without crashing", () => {
        render(<Weather/>, { wrapper: BrowserRouter });
    })
})