import React from "react";

// Legacy Imports
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

// Icon Imports
import PaymentsIcon from '@mui/icons-material/Payments';

// HOC Imports
import { SelectField } from "../select-field/SelectField";

// Types
import { OptionProps, CountryInformationProps } from "../../types/types";
interface InfoCardProps {
    countryList: OptionProps[];
    provinceList: OptionProps[];
    cityList: OptionProps[];
    country: string;
    province: string;
    city: string;
    countryInformation: CountryInformationProps;
    handleCountryChange: (value: string)=> void;
    handleProvinceChange: (value: string)=> void;
    handleCityChange: (value: string)=> void;
} 

export const InfoCard: React.FC<InfoCardProps> = ({
    countryList,
    provinceList,
    cityList,
    country,
    province,
    city,
    countryInformation,
    handleCountryChange,
    handleProvinceChange,
    handleCityChange,
})=> {
    // Event handlers

    // Renderer
    return(
        <React.Fragment>
            <Paper
                elevation={0}
                sx={{
                    height: {xs: '198px', md: `calc(100vh - 134px)`},
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    px: '20px',
                    overflow: 'scroll', 
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {display: 'none'},
                }}
            >
                <Grid 
                    container 
                    spacing={2} 
                    sx={{ 
                        px: {xs: '8px', md: '24px'}, 
                        display: 'flex', 
                        alignItems: 'center'
                    }}
                >
                    <Grid item xs={8} md={12}>
                        <Stack spacing={'4px'} sx={{p: '12px'}}>
                            <SelectField
                                name = {'country'}
                                placeholder = {'Country'}
                                helpertext = {'Please pick a country'}
                                value = {country}
                                options = {countryList}
                                paperWidth='240px'
                                triggerChange = {handleCountryChange}
                            />
                            <SelectField
                                name = {'province'}
                                placeholder = {'Province'}
                                helpertext = {'Please pick a province'}
                                value = {province}
                                options = {provinceList}
                                paperWidth='240px'
                                triggerChange = {handleProvinceChange}
                            />
                            <SelectField
                                name = {'city'}
                                placeholder = {'City'}
                                helpertext = {'Please pick a city'}
                                value = {city}
                                options = {cityList}
                                paperWidth='240px'
                                triggerChange = {handleCityChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={4} md={12} sx={{display: {xs: 'none', sm: 'flex'}}}>
                        {
                            country.length > 0 && (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        background: 'rgba(255, 245, 245, 0.3)', 
                                        borderRadius:'16px', 
                                        width: '100%',
                                        backdropFilter: 'blur(20px)',
                                        overflow: 'scroll', 
                                        scrollbarWidth: 'none',
                                        '&::-webkit-scrollbar': {display: 'none'},
                                    }}
                                >
                                    <Stack spacing={'8px'} sx={{p: '12px'}}>
                                        {
                                            countryInformation?.name.length > 0 &&
                                            countryInformation?.iso2.length> 0 && (
                                                <Stack 
                                                    direction={'row'} 
                                                    spacing={'4px'}
                                                    sx={{display: 'flex',alignItems: 'center'}}
                                                >
                                                    <Typography sx={{color: '#00221d',fontSize: '14px',}}>
                                                        Country
                                                    </Typography>
                                                    <Chip 
                                                        color="info"
                                                        avatar={<Avatar>{countryInformation?.iso2}</Avatar>} 
                                                        label={countryInformation?.name} 
                                                    />
                                                </Stack>                                                
                                            )
                                        }
                                        {
                                            countryInformation?.capital.length>0 && (
                                                <Stack 
                                                    direction={'row'} 
                                                    spacing={'4px'}
                                                    sx={{display: 'flex',alignItems: 'center'}}
                                                >
                                                    <Typography sx={{color: '#00221d',fontSize: '14px',}}>
                                                        Capital
                                                    </Typography>
                                                    <Chip 
                                                        color="info" 
                                                        label={countryInformation?.capital}
                                                    />
                                                </Stack>
                                            )
                                        }
                                        {
                                            countryInformation?.currency.length>0 && (
                                                <Stack 
                                                    direction={'row'} 
                                                    spacing={'4px'}
                                                    sx={{display: 'flex',alignItems: 'center'}}
                                                >
                                                    <Typography sx={{color: '#00221d',fontSize: '14px',}}>
                                                        Currency
                                                    </Typography>
                                                    <Chip 
                                                        color="info" 
                                                        label={countryInformation?.currency} 
                                                    />
                                                </Stack>
                                            )
                                        }
                                    </Stack>
                                </Paper>
                            )
                        }
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}