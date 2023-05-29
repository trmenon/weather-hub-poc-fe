import { fetchCall } from "../utilz/fetchCall";
import { constants } from "../constants/constants";

const getAllCountriesServices = ()=> 
    fetchCall(
        `${constants?.country_state_city_baseurl}/countries`,
        constants?.request_methods?.GET,
        {},
        {"X-CSCAPI-KEY": constants?.country_state_city_api_key}
    );

const getAllStatesByCountryServices = (country: string)=> 
    fetchCall(
        `${constants?.country_state_city_baseurl}/countries/${country}/states`,
        constants?.request_methods?.GET,
        {},
        {"X-CSCAPI-KEY": constants?.country_state_city_api_key}
    );
    
const getCountryInformationServices = (country: string)=> 
    fetchCall(
        `${constants?.country_state_city_baseurl}/countries/${country}`,
        constants?.request_methods?.GET,
        {},
        {"X-CSCAPI-KEY": constants?.country_state_city_api_key}
    );

const getCityByStateAndCountryServices = (province: string, country: string)=> 
    fetchCall(
        `${constants?.country_state_city_baseurl}/countries/${country}/states/${province}/cities`,
        constants?.request_methods?.GET,
        {},
        {"X-CSCAPI-KEY": constants?.country_state_city_api_key}
    );

export {
    getAllCountriesServices,
    getAllStatesByCountryServices,
    getCountryInformationServices,
    getCityByStateAndCountryServices,
}
