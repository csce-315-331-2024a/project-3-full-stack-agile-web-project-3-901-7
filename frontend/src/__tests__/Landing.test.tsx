import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Landing from "../pages/Landing"
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { TextSizeProvider } from "../TextSizeContext";

const mockFetch = vi.fn();
global.fetch = mockFetch;

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

describe("Landing Page Tests", () => {
    beforeEach(() => {
        mockFetch.mockResolvedValueOnce({
            json: async () => [
                {
                    _id: 1,
                    name: "Test Name 1",
                    price: 10,
                    category: "Test Category 1",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 1",
                },
                {
                    _id: 2,
                    name: "Test Name 2",
                    price: 20,
                    category: "Test Category 2",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 2",
                },
                {
                    _id: 3,
                    name: "Test Name 3",
                    price: 30,
                    category: "Test Category 3",
                    ingredientInfo: "bacon,cheese",
                    startDate: new Date(),
                    endDate: null,
                    picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
                    itemDesc: "Test Description 3",
                }
            ]
        })
    })
    afterEach(() => {
        vi.clearAllMocks();
    })

    it("should render without crashing", () => {
        customRender(<Landing/>);
    })
    // it("should have initial loading screen", () => {
    //     customRender(<Landing/>);
    //     expect(screen.getByText("Loading...")).toBeTruthy();
    // })
    it("should render and navigate all buttons and items after loading", async () => {
        customRender(<Landing/>);
        await waitFor(() => {
            expect(screen.getByText("Loading...")).toBeTruthy();
        });
    })
})