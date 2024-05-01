import { BrowserRouter } from "react-router-dom";
import Cashier from "../pages/Cashier/Cashier";
import { render, waitFor, screen } from "@testing-library/react";
import { TextSizeProvider } from "../TextSizeContext";
import CashierLog from "../pages/Cashier/CashierLog";
import { vi } from "vitest";

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

describe("Cashier Page Tests", () => {
    beforeEach(() => {
        mockFetch.mockResolvedValueOnce({
            json: async () => ({
                _id: 7,
                email:"weiwu@tamu.edu",
                type:"admin"
            })
        })
    })
    afterEach(() => {
        vi.clearAllMocks();
    })

    it("should render cashier page without crashing", () => {
        customRender(<Cashier/>);
    })
    it("should render cashier log without crashing", () => {
        customRender(<CashierLog/>)
    })
})