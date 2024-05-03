import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Landing from "../pages/Landing"
import { BrowserRouter } from "react-router-dom";
import { TextSizeProvider } from "../TextSizeContext";
import { Item } from "../types/dbTypes";
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


const items:Item[] = [
    {
        _id: 1,
        name: "Test Name 1",
        price: 10.22,
        category: "Burger",
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
        category: "Chicken",
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
        category: "Side",
        ingredientInfo: "bacon,cheese",
        startDate: new Date(),
        endDate: null,
        picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
        itemDesc: "Test Description 3",
    }
]

describe("Landing Page Tests", () => {
    beforeEach(() => {
        mockFetch.mockResolvedValueOnce({
            json: async () => items
        })
    })
    afterEach(() => {
        vi.clearAllMocks();
    })

    it("should render without crashing", () => {
        customRender(<Landing/>);
    })
    it("should show loading screen while waiting for data to fetch", () => {
        const { getByText } = customRender(<Landing />);
        expect(getByText("Loading...")).toBeTruthy();
    })
    it("should show landing page once data is fetched", async () => {
        customRender(<Landing/>);
        waitFor(() => {
            expect(screen.getByText("Welcome to Rev's Grill!")).toBeTruthy();
            // expect image to have item name as image alt
            expect(screen.getByAltText("Test Name 1")).toBeTruthy();
            // expect buttons to map to route properly
            fireEvent.click(screen.getByText("I am a customer"));
            expect(window.location.pathname).toBe("/menu");
        })
    })
})