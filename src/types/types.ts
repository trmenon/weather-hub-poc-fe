export interface OptionProps {
    key: string;
    value: string;
    label: string;
}

export interface CityWeatherProps {
    temperature_feels_like: number;
    temperature_current: number;
    temperature_max: number;
    temperature_min: number;
    pressure: number;
    humidity: number;
    weather_tag: string;
    wind_degree: number;
    wind_gust: number;
    wind_speed: number;
    weatherIcon: string;
}