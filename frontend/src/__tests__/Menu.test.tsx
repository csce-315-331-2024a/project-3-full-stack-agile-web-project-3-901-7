import { render, screen, waitFor } from "@testing-library/react";
import Menu from "../pages/Menu";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

const mockFetch = vi.fn();
global.fetch = mockFetch;

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
                }
            ]
        })
    })
    afterEach(() => {
        vi.clearAllMocks();
    })

    it("should render without crashing", () => {
        render(<Menu/>, { wrapper: BrowserRouter });
    })
    it("should render all menu category", async () => {
        render(<Menu/>, { wrapper: BrowserRouter });
        
        await waitFor(() => {
            expect(screen.getByText("Test Name 1")).toBeTruthy();
            expect(screen.getByText("Test Name 2")).toBeTruthy();
        })

        expect(screen.getByText("Test Category 1")).toBeTruthy();
        expect(screen.getByText("Test Category 2")).toBeTruthy();

    })
    it("should render all item details", async () => {
        render(<Menu/>, { wrapper: BrowserRouter });

        await waitFor(() => {
            expect(screen.getByText("Test Name 1")).toBeTruthy();
            expect(screen.getByText("Test Description 1")).toBeTruthy();
            expect(screen.getByText("10")).toBeTruthy();

            expect(screen.getByText("Test Name 2")).toBeTruthy();
            expect(screen.getByText("Test Description 2")).toBeTruthy();
            expect(screen.getByText("20")).toBeTruthy();
        })
    })
});