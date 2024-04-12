export interface Condition {
    text: string;
    icon: string;
  }
  
  export interface Current {
    temp_f: number;
    condition: Condition;
  }
  
  export interface ForecastDayData {
    date: string;
    day: {
      maxtemp_f: number;
      mintemp_f: number;
      condition: Condition;
    };
  }
  
  export interface Forecast {
    forecastday: ForecastDayData[];
  }
  
  export interface WeatherData {
    location: {
      name: string;
    };
    current: Current;
    forecast: Forecast;
  }