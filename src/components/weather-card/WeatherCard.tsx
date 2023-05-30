import React from 'react';

// Legacy Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// Types
import { CityWeatherProps } from '../../types/types';
interface WeatherCardProps {
    city: string;
    data: CityWeatherProps;
    metric: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
    city,
    data,
    metric,
})=> {
    
    // Renderer
    return(
        <React.Fragment>
            <Paper
                elevation={0}
                sx={{
                    height: {xs: `calc(100vh - 340px)`, md: `calc(100vh - 134px)`},
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
                    <List sx={{ width: '100%'}} >
                        {
                          data?.weather_tag.length> 0 && (
                            <ListItem dense divider>
                                <ListItemText 
                                    primary="Weather Conditions" 
                                    secondary={`${data?.weather_tag} recorded`}
                                    secondaryTypographyProps={{ style: {fontSize: '18px', fontWeight: 600, color: '#353641'} }}
                                    primaryTypographyProps={{ style: {fontSize: '14px', color: '#FFFFFF'} }}
                                />
                            </ListItem>
                          )  
                        }                        
                    </List>
                    <List sx={{ width: '100%'}} >
                        {
                            data?.temperature_min !== undefined && (
                                <ListItem dense divider>
                                    <ListItemText 
                                        primary="Minimum Temperature" 
                                        secondary={`${data?.temperature_min} deg ${metric? 'Celcius':'Farenheit' } `}
                                        secondaryTypographyProps={{ style: {fontSize: '18px', fontWeight: 600, color: '#353641'} }}
                                        primaryTypographyProps={{ style: {fontSize: '14px', color: '#FFFFFF'} }}
                                    />
                                </ListItem>
                            )
                        }                        
                    </List>
                    <List sx={{ width: '100%'}} >
                        {
                            data?.temperature_current !== undefined && (
                                <ListItem dense divider>
                                    <ListItemText 
                                        primary="Actual Temperature" 
                                        secondary={`${data?.temperature_current} deg ${metric? 'Celcius':'Farenheit' }`}
                                        secondaryTypographyProps={{ style: {fontSize: '18px', fontWeight: 600, color: '#353641'} }}
                                        primaryTypographyProps={{ style: {fontSize: '14px', color: '#FFFFFF'} }}
                                    />
                                </ListItem>
                            )
                        }                        
                    </List>
                    <List sx={{ width: '100%'}} >
                        {
                            data?.temperature_max !== undefined && (
                                <ListItem dense divider>
                                    <ListItemText 
                                        primary="Maximum Temperature" 
                                        secondary={`${data?.temperature_max} deg ${metric? 'Celcius':'Farenheit' }`}
                                        secondaryTypographyProps={{ style: {fontSize: '18px', fontWeight: 600, color: '#353641'} }}
                                        primaryTypographyProps={{ style: {fontSize: '14px', color: '#FFFFFF'} }}
                                    />
                                </ListItem>
                            )
                        }                        
                    </List>
                    <List sx={{ width: '100%'}} >
                        {
                            data?.temperature_feels_like !== undefined && (
                                <ListItem dense divider>
                                    <ListItemText 
                                        primary="Temperature(feels like)" 
                                        secondary={`${data?.temperature_feels_like} deg ${metric? 'Celcius':'Farenheit' }`}
                                        secondaryTypographyProps={{ style: {fontSize: '18px', fontWeight: 600, color: '#353641'} }}
                                        primaryTypographyProps={{ style: {fontSize: '14px', color: '#FFFFFF'} }}
                                    />
                                </ListItem>
                            )
                        }                        
                    </List>
                    <List sx={{ width: '100%'}} >
                        {
                            data?.humidity !== undefined && (
                                <ListItem dense divider>
                                    <ListItemText 
                                        primary="Humidity" 
                                        secondary={`${data?.humidity} gm`}
                                        secondaryTypographyProps={{ style: {fontSize: '18px', fontWeight: 600, color: '#353641'} }}
                                        primaryTypographyProps={{ style: {fontSize: '14px', color: '#FFFFFF'} }}
                                    />
                                </ListItem>
                            )
                        }                        
                    </List>
                    <List sx={{ width: '100%'}} >
                        {
                            data?.pressure !== undefined && (
                                <ListItem dense divider>
                                    <ListItemText 
                                        primary="Pressure" 
                                        secondary={`${data?.pressure} psi`}
                                        secondaryTypographyProps={{ style: {fontSize: '18px', fontWeight: 600, color: '#353641'} }}
                                        primaryTypographyProps={{ style: {fontSize: '14px', color: '#FFFFFF'} }}
                                    />
                                </ListItem>
                            )
                        }                        
                    </List>
                    <List sx={{ width: '100%'}} >
                        {
                            data?.wind_degree !== undefined && (
                                <ListItem dense divider>
                                    <ListItemText 
                                        primary="Wind Degree" 
                                        secondary={`${data?.wind_degree} deg`}
                                        secondaryTypographyProps={{ style: {fontSize: '18px', fontWeight: 600, color: '#353641'} }}
                                        primaryTypographyProps={{ style: {fontSize: '14px', color: '#FFFFFF'} }}
                                    />
                                </ListItem>
                            )
                        }                        
                    </List>
                    <List sx={{ width: '100%'}} >
                        {
                            data?.wind_speed !== undefined && (
                                <ListItem dense divider>
                                    <ListItemText 
                                        primary="Wind Speed" 
                                        secondary={`${data?.wind_speed} ${metric? 'Kmph': 'Kt'}`}
                                        secondaryTypographyProps={{ style: {fontSize: '18px', fontWeight: 600, color: '#353641'} }}
                                        primaryTypographyProps={{ style: {fontSize: '14px', color: '#FFFFFF'} }}
                                    />
                                </ListItem>
                            )
                        }                        
                    </List>
                    <List sx={{ width: '100%'}} >
                        {
                            data?.wind_gust !== undefined && (
                                <ListItem dense divider>
                                    <ListItemText 
                                        primary="Wind Gust Speed" 
                                        secondary={`${data?.wind_gust} Kt`}
                                        secondaryTypographyProps={{ style: {fontSize: '18px', fontWeight: 600, color: '#353641'} }}
                                        primaryTypographyProps={{ style: {fontSize: '14px', color: '#FFFFFF'} }}
                                    />
                                </ListItem>
                            )
                        }
                        
                    </List>
            </Paper>
        </React.Fragment>
    )
}