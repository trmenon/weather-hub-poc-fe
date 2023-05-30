import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { OptionProps,CityWeatherProps,} from '../types/types';

// Services Imports
import { 
    getAllCountriesServices,
    getAllStatesByCountryServices, 
    getCountryInformationServices,
    getCityByStateAndCountryServices,
} from '../services/services';

// Import Assets
import weather_background from '../assets/weather_backround.jpg';
import weatherBG from '../assets/WeatherBG.png'

// Legacy Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// HOC Imports
import { BrandBar } from '../components/brand-bar/BrandBar';
import { InfoCard } from '../components/info-card/InfoCard';
import { WeatherCard } from '../components/weather-card/WeatherCard';

// Constnats
import { constants } from '../constants/constants';
const weather_default: CityWeatherProps = {
    temperature_feels_like: 0,
    temperature_current: 0,
    temperature_max: 0,
    temperature_min: 0,
    pressure: 0,
    humidity: 0,
    weather_tag: '',
    wind_degree: 0,
    wind_gust: 0,
    wind_speed: 0,
    weatherIcon: '',
}

export const WeatherAppController = ()=> {
    // States
    const [metric, setMetric] = useState(false);
    const [countries, setCountries] = useState<OptionProps[]>([]);
    const [provinces, setProvinces] = useState<OptionProps[]>([]);
    const [cities, setCities] = useState<OptionProps[]>([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [weather, setWeather] = useState<CityWeatherProps>(weather_default);

    // Effects
    useEffect(()=> {fetchAllCountries()}, []);
    useEffect(()=> {
        fetchStatesByCountries();
        setSelectedProvince('');
    }, [selectedCountry]);
    useEffect(()=> {
        fetchCitiesByStates();
        setSelectedCity('');
    }, [selectedProvince]);
    useEffect(()=> {fetchCityWeather()}, [selectedCity]);
    useEffect(()=> {
        if(selectedCity.length> 0) {
            fetchCityWeather();
        }
    }, [metric]);
    useEffect(()=> {
        if(selectedCity.length=== 0) {
            setWeather(weather_default);
        }
    }, [selectedCity])

    // State Handlers
    const handleModeSelector = ()=> setMetric(metric === false);
    const updateCountry = (value: string)=> setSelectedCountry(value);
    const updateProvince = (value: string)=> setSelectedProvince(value);
    const updateCity = (value: string)=> setSelectedCity(value);

    // API Calls
    const fetchAllCountries = ()=> {
        try{
            getAllCountriesServices().subscribe({
                next: (response: any)=> {
                    if(response && Array.isArray(response)) {
                        setCountries(response.map((item: any)=> {
                            return{
                                key: `country-${item?.iso2}-key`,
                                value: item?.iso2,
                                label: item?.name
                            }
                        }))
                    }
                },
                error: (error: any)=> {
                    console.log('[API retured ERROR] Fetching all countries');
                    console.log(error);
                },
            })
        }catch(err) {
            console.log('[ERROR: API] Fetching all countries');
            console.log(err);
        }
    }
    const fetchStatesByCountries = ()=> {
        if(selectedCountry?.length > 0) {
            try{
                getAllStatesByCountryServices(selectedCountry)
                .subscribe({
                    next: (response: any)=> {
                        if(response && Array.isArray(response)) {
                            setProvinces(response.map((item: any)=> {
                                return {
                                    key: `state-${item?.iso2}-key`,
                                    value: item?.iso2,
                                    label: item?.name
                                }
                            }))
                        }
                    },
                    error: (error: any)=> {
                        console.log('[API retured ERROR] Fetching all states by country');
                        console.log(error);
                    },
                })
            }catch(err) {
                console.log('[API: ERROR] Fetching all states by country selected');
                console.log(err);
            }
        }
    }
    const fetchCitiesByStates = ()=> {
        if(selectedProvince.length > 0) {
            try{
                getCityByStateAndCountryServices(selectedProvince, selectedCountry)
                .subscribe({
                    next: (response: any)=> {
                        if(response && Array.isArray(response)) {
                            setCities(response?.map((item: any)=> {
                                return {
                                    key: `city-key-${item?.name}`,
                                    value: item?.name.toLowerCase(),
                                    label: item?.name
                                }
                            }))
                        }
                    },
                    error: (error: any)=> {
                        console.log('[API retured ERROR] Fetching all cities by selected state and country');
                        console.log(error);
                    },
                })
            }catch(err) {
                console.log('[API: ERROR] Fetching cities by selected state');
                console.log(err);
            }
        }
    }
    const fetchCityWeather = ()=> {
        if(selectedCity.length > 0) {
            try{
                axios.get(` ${constants?.weather_baseurl}/weather?q=${selectedCity}&appid=${constants?.weather_api_key}&units=${metric? 'metric': 'imperial'}`)
                .then((response: any)=> {
                    if(
                        response &&
                        response?.data &&
                        response?.status === 200
                    ) {
                        setWeather({
                            temperature_feels_like: response?.data?.main?.feels_like,
                            temperature_current: response?.data?.main?.temp,
                            temperature_max: response?.data?.main?.temp_max,
                            temperature_min: response?.data?.main?.temp_min,
                            pressure: response?.data?.main?.pressure,
                            humidity: response?.data?.main?.humidity,
                            weather_tag: response?.data?.weather[0]?.description,
                            wind_degree: response?.data?.wind?.deg,
                            wind_gust: response?.data?.wind?.gust,
                            wind_speed: response?.data?.wind?.speed,
                            weatherIcon: response?.data?.weather[0]?.icon || ''
                        })
                    }
                })
                .catch((error: any)=> {
                    console.log('[API returned error] Fetching city weather');
                })
            }catch(err) {
                console.log('[API: ERROR] Fetching city weather');
                console.log(err);
            }
        }
    }

    // Event Handlers

    // Renderer
    return(
        <React.Fragment>
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundImage: `url(${weatherBG})` ,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
            >
                <BrandBar 
                    metric={metric} 
                    toggleHandler={handleModeSelector}
                    weather={weather?.weatherIcon}
                />
                <Grid 
                    container spacing={2} 
                    sx={{ 
                        mt: '72px', 
                        position: 'fixed',
                        width: '100%',                        
                        px: {xs: '8px', md: '64px'},
                        py: '8px',
                        overflow: 'scroll', 
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {display: 'none'},
                    }}
                >
                    <Grid item xs={12} md={6}>
                        <InfoCard 
                            countryList = {countries}
                            provinceList = {provinces}
                            cityList = {cities}
                            country = {selectedCountry}
                            province = {selectedProvince}
                            city = {selectedCity}
                            cityWeatherIcon={weather?.weatherIcon || ''}
                            handleCountryChange = {updateCountry}
                            handleProvinceChange = {updateProvince}
                            handleCityChange = {updateCity}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {
                            selectedCity.length > 0 && (                            
                                    <WeatherCard 
                                        city={selectedCity} 
                                        data={weather}
                                        metric={metric}
                                    />                            
                            )
                        }    
                    </Grid>                
                </Grid>
            </Box>
        </React.Fragment>
    )
}