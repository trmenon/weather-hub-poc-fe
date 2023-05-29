import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    OptionProps, 
    CityWeatherProps,
    CountryInformationProps,
} from '../types/types';

// Services Imports
import { 
    getAllCountriesServices,
    getAllStatesByCountryServices, 
    getCountryInformationServices,
    getCityByStateAndCountryServices,
} from '../services/services';

// Import Assets
import day_sky from '../assets/day_sky.png';
import night_sky from '../assets/night_sky.png';

// Legacy Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// HOC Imports
import { BrandBar } from '../components/brand-bar/BrandBar';
import { InfoCard } from '../components/info-card/InfoCard';
import { WeatherCard } from '../components/weather-card/WeatherCard';

// Constnats
import { constants } from '../constants/constants';
const weather_default = {
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
}

const country_information_default = {
    name: '',
    iso2: '',
    capital: '',
    currency: '',
}

export const WeatherAppController = ()=> {
    // States
    const [dark, setDark] = useState(false);
    const [countries, setCountries] = useState<OptionProps[]>([]);
    const [provinces, setProvinces] = useState<OptionProps[]>([]);
    const [cities, setCities] = useState<OptionProps[]>([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryInformation, setSelectedCountryInformation] = useState<CountryInformationProps>(country_information_default);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [weather, setWeather] = useState<CityWeatherProps>(weather_default);

    // Effects
    useEffect(()=> {fetchAllCountries()}, []);
    useEffect(()=> {
        fetchCountryInformation();
        fetchStatesByCountries();
        setSelectedProvince('');
    }, [selectedCountry]);
    useEffect(()=> {
        fetchCitiesByStates();
        setSelectedCity('');
    }, [selectedProvince]);
    useEffect(()=> {fetchCityWeather()}, [selectedCity])

    // State Handlers
    const handleModeSelector = ()=> setDark(dark === false);
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
    const fetchCountryInformation = ()=> {
        if(selectedCountry.length> 0){
            try{                
                getCountryInformationServices(selectedCountry)
                .subscribe({
                    next: (response: any)=> {
                        if(response) {
                            setSelectedCountryInformation({
                                name: response?.name || '',
                                iso2: response?.iso2 || '',
                                capital: response?.capital || '',
                                currency: response?.currency || '',
                            })
                        }
                    },
                    error: (error: any)=> {
                        console.log('[API retured ERROR] Fetching country specific information');
                        console.log(error);
                    },
                })
            }catch(error) {
                console.log('[API:ERROR] fetching country related information');
                console.log(error);
            }
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
                axios.get(` ${constants?.weather_baseurl}/weather?q=${selectedCity}&appid=${constants?.weather_api_key}&units=metric`)
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
                    backgroundImage: `url(${dark? night_sky: day_sky})` ,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
            >
                <BrandBar dark={dark} toggleHandler={handleModeSelector}/>
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
                            countryInformation={selectedCountryInformation}
                            handleCountryChange = {updateCountry}
                            handleProvinceChange = {updateProvince}
                            handleCityChange = {updateCity}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {
                            selectedCity.length > 0 && (                            
                                    <WeatherCard city={selectedCity} data={weather}/>                            
                            )
                        }    
                    </Grid>                
                </Grid>
            </Box>
        </React.Fragment>
    )
}