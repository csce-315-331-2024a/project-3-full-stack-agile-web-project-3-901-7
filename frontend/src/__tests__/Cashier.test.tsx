import { BrowserRouter } from "react-router-dom";
import Cashier from "../pages/Cashier/Cashier";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { TextSizeProvider } from "../TextSizeContext";
import CashierLog from "../pages/Cashier/CashierLog";
import { vi } from "vitest";

vi.mock("../pages/Login", () => ({
    getUserAuth: vi.fn().mockResolvedValue({
        _id: 123,
        email: "weiwu@tamu.edu",
        name: "Warren Wu",
        given_name: "Warren",
        family_name: "Wu",
        picture: "https://lh3.googleusercontent.com/a/ACg8ocL9v0n1KM6ZOtKSYKkwg7IdtlwYGUmKlK4uJnx5WYunJuKQ06ao=s96-c",
    })
}))

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

const testData = {_id:7,email:"weiwu@tamu.edu",type:"admin"}
const testLogData = [
    {
      log_id: 27,
      emp_id: 1,
      checkin: "2024-04-29T02:35:16.172+00:00",
      checkout: "2024-04-29T02:35:16.172+00:00",
      comments: ""
    }
  ]

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
    it("should render cashier log without crashing", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => testData
        }).mockResolvedValueOnce({
            json: async () => testLogData
        })
        customRender(<CashierLog/>)
        await waitFor(() => {
            expect(screen.getByText("Add New Log")).toBeTruthy();
        })
    })
    it("handle edit works properly", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => testData
        }).mockResolvedValueOnce({
            json: async () => testLogData
        })
        customRender(<CashierLog/>)
        await waitFor(() => {
            const addLogBtn = screen.getByText("Add Log");
            fireEvent.click(addLogBtn);
        })

    })
})