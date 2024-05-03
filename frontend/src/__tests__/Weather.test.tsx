import { render } from "@testing-library/react";
import Weather from "../pages/Weather";
import { BrowserRouter } from "react-router-dom";
import { TextSizeProvider } from "../TextSizeContext";
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

describe("Weather Page Tests", () => {
    it("should render weather page without crashing", () => {
        customRender(<Weather />);
    })
    it("should display loading screen when fetching data", () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => {
                return {
                    location: {
                        name: "College Station",
                        region: "Texas",
                        country: "USA",
                    },
                    current: {
                        temp_f: 75,
                        condition: {
                            text: "Sunny",
                            icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
                        },
                    },
                    forecast: {
                        forecastday: [
                            {
                                date: "2021-09-20",
                                day: {
                                    maxtemp_f: 80,
                                    mintemp_f: 70,
                                    condition: {
                                        text: "Sunny",
                                        icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
                                    },
                                },
                            },
                            {
                                date: "2021-09-21",
                                day: {
                                    maxtemp_f: 85,
                                    mintemp_f: 75,
                                    condition: {
                                        text: "Sunny",
                                        icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
                                    },
                                },
                            },
                            {
                                date: "2021-09-22",
                                day: {
                                    maxtemp_f: 90,
                                    mintemp_f: 80,
                                    condition: {
                                        text: "Sunny",
                                        icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
                                    },
                                },
                            },
                        ],
                    },
                };
            },
        });
        const { getByText } = customRender(<Weather />);
        expect(getByText("Loading...")).toBeTruthy();
    })
    it("should render weather data", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => {
                return {
                    location: {
                        name: "College Station",
                        region: "Texas",
                        country: "USA",
                    },
                    current: {
                        temp_f: 75,
                        condition: {
                            text: "Sunny",
                            icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
                        },
                    },
                    forecast: {
                        forecastday: [
                            {
                                date: "2021-09-20",
                                day: {
                                    maxtemp_f: 80,
                                    mintemp_f: 70,
                                    condition: {
                                        text: "Sunny",
                                        icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
                                    },
                                },
                            },
                            {
                                date: "2021-09-21",
                                day: {
                                    maxtemp_f: 85,
                                    mintemp_f: 75,
                                    condition: {
                                        text: "Sunny",
                                        icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
                                    },
                                },
                            },
                            {
                                date: "2021-09-22",
                                day: {
                                    maxtemp_f: 90,
                                    mintemp_f: 80,
                                    condition: {
                                        text: "Sunny",
                                        icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
                                    },
                                },
                            },
                        ],
                    },
                };
            },
        });
        const { findByText } = customRender(<Weather />);
        expect(await findByText("Weather Information")).toBeTruthy();
        expect(await findByText("College Station, TX")).toBeTruthy();
        expect(await findByText("Current Weather")).toBeTruthy();
    })
})