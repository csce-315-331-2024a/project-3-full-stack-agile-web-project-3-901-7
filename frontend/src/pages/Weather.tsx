import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
    WeatherData,
    Condition,
    Forecast,
    ForecastDayData,
    Current,
} from "../types/weatherTypes"; // might implement other types later depending on what is needed
import Loading from "../components/Loading";

const Weather: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [recommendation, setRecommendation] = useState<string>("");
    const [backgroundGradient, setBackgroundGradient] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getRecommendation = (
            temperature: number,
            condition: string
        ): string => {
            if (condition.toLowerCase().includes("rain")) {
                return "It's raining outside. Consider drying off with our signature Spicy Chicken Sandwich.";
            } else if (temperature > 75) {
                return "It's hot outside. Stay refreshed with one of our chilled Aggie Shakes";
            } else {
                return "It's cool outside. Consider warming up with our Gig 'em Patty Melt";
            }
        };
    
        const getBackgroundGradient = (condition: string): string => {
            if (condition.toLowerCase().includes("sun")) {
                return "bg-gradient-to-r from-white via-yellow-100 to-white";
            } else if (
                condition.toLowerCase().includes("rain") ||
                condition.toLowerCase().includes("cloud") ||
                condition.toLowerCase().includes("overcast")
            ) {
                return "bg-gradient-to-r from-white via-slate-200 to-white";
            } else {
                return "bg-gradient-to-r from-white via-sky-100 to-white";
            }
        };

        const fetchWeather = async () => {
            try {
                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
                if (!apiKey) {
                    throw new Error("Weather API key not found.");
                }
                const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=College Station, TX&days=3`;
                const response = await axios.get<WeatherData>(url);
                setWeatherData(response.data);
                setIsLoading(false);
                setRecommendation(
                    getRecommendation(
                        response.data.current.temp_f,
                        response.data.current.condition.text
                    )
                );
                setBackgroundGradient(
                    getBackgroundGradient(response.data.current.condition.text)
                );
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        fetchWeather();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={`w-full h-full p-8 relative ${backgroundGradient}`}>
            <Navbar />
            <div className="max-w-md mx-auto my-10 bg-white shadow-lg border-2 border-black rounded-md overflow-hidden p-5">
                <div className="text-center mb-4">
                    <h1 className="font-bold text-2xl mb-2">
                        Weather Information
                    </h1>
                    <h2 className="text-lg">College Station, TX</h2>
                </div>
                {weatherData && (
                    <div>
                        <div className="text-center mb-6">
                            <h2 className="font-semibold text-xl">
                                Current Weather
                            </h2>
                            <img
                                src={weatherData.current.condition.icon}
                                alt="Weather Icon"
                                className="mx-auto"
                            />
                            <p className="text-lg">
                                {weatherData.current.temp_f}°F -{" "}
                                {weatherData.current.condition.text}
                            </p>
                        </div>
                        <h3 className="font-semibold text-lg text-center mb-4">
                            3-Day Forecast
                        </h3>
                        <div>
                            {weatherData.forecast.forecastday.map(
                                (day, index) => (
                                    <div key={index} className="mb-4">
                                        <h4 className="font-semibold">
                                            {day.date}
                                        </h4>
                                        <div className="flex justify-between items-center">
                                            <img
                                                src={day.day.condition.icon}
                                                alt="Weather Icon"
                                                className="w-10 h-10"
                                            />
                                            <p>
                                                {day.day.maxtemp_f}°F /{" "}
                                                {day.day.mintemp_f}°F -{" "}
                                                {day.day.condition.text}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="text-center mt-6">
                            <h3 className="font-semibold text-lg mb-2">
                                Recommendation
                            </h3>
                            <p>{recommendation}</p>
                            {recommendation && (
                                <p>
                                    <a className="text-sky-500" href="/order">
                                        Sounds good, take me there
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
