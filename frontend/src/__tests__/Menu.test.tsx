import { render, screen, waitFor } from "@testing-library/react";
import Menu from "../pages/Menu";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import MenuPage1 from "../pages/MenuPage1";
import MenuPage2 from "../pages/MenuPage2";
import MenuPage3 from "../pages/MenuPage3";
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

describe("Menu Page Tests", () => {
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

    it("should render menu without crashing", () => {
        customRender(<Menu/>);
    })
    it("should render all menu category", async () => {
        customRender(<Menu/>);
        
        await waitFor(() => {
            expect(screen.getByText("Test Name 1")).toBeTruthy();
            expect(screen.getByText("Test Name 2")).toBeTruthy();
        })
        
        expect(screen.getByText("Test Category 1")).toBeTruthy();
        expect(screen.getByText("Test Category 2")).toBeTruthy();

    })
    it("should render all item details", async () => {
        customRender(<Menu/>);
        await waitFor(() => {
            expect(screen.getByText("Test Name 1")).toBeTruthy();
            expect(screen.getByText("Test Description 1")).toBeTruthy();
            expect(screen.getByText("10")).toBeTruthy();

            expect(screen.getByText("Test Name 2")).toBeTruthy();
            expect(screen.getByText("Test Description 2")).toBeTruthy();
            expect(screen.getByText("20")).toBeTruthy();

            expect(screen.getByText("Test Name 3")).toBeTruthy();
            expect(screen.getByText("Test Description 3")).toBeTruthy();
            expect(screen.getByText("30")).toBeTruthy();
        })
    })
    it("should render menu 1 without crashing", () => {
        customRender(<MenuPage1/>);
    })
    it("should render all menu 1 item details", async () => {
        customRender(<MenuPage1/>);
        await waitFor(() => {
            expect(screen.getByText("Test Name 1")).toBeTruthy();
        })
        
        expect(screen.getByText("Test Name 1")).toBeTruthy();
        expect(screen.getByText("$10.00")).toBeTruthy();
    })
    it("should render menu 2 without crashing", () => {
        customRender(<MenuPage2/>);
    })
    it("should render all menu 2 item details", async () => {
        customRender(<MenuPage2/>);
        await waitFor(() => {
            expect(screen.getByText("Test Name 2")).toBeTruthy();
        })
        
        expect(screen.getByText("Test Name 2")).toBeTruthy();
        expect(screen.getByText("$20.00")).toBeTruthy();
    })
    it("should render menu 3 without crashing", () => {
        customRender(<MenuPage3/>);
    })
    it("should render all menu 3 item details", async () => {
        customRender(<MenuPage3/>);
        await waitFor(() => {
            expect(screen.getByText("Test Name 3")).toBeTruthy();
        })
        
        expect(screen.getByText("Test Name 3")).toBeTruthy();
        expect(screen.getByText("$30.00")).toBeTruthy();
    })
});

