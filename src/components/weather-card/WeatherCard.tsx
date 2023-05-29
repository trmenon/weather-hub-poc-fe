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
    data: CityWeatherProps
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
    city,
    data,
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
                        <ListItem dense divider>
                            <ListItemText 
                                primary="Weather Conditions" 
                                secondary={`${data?.weather_tag} recorded`}
                                primaryTypographyProps={{ style: {fontSize: '16px', fontWeight: 600, color: 'rgb(1 12 12)'} }}
                                secondaryTypographyProps={{ style: {fontSize: '12px', color: 'rgb(19 36 74)'} }}
                            />
                        </ListItem>
                    </List>
                    <List sx={{ width: '100%'}} >
                        <ListItem dense divider>
                            <ListItemText 
                                primary="Minimum Temperature" 
                                secondary={`${data?.temperature_min} deg`}
                                secondaryTypographyProps={{ style: {fontSize: '12px', color: 'rgb(19 36 74)'} }}
                                primaryTypographyProps={{ style: {fontSize: '16px', fontWeight: 600, color: 'rgb(1 12 12)'} }}
                            />
                        </ListItem>
                    </List>
                    <List sx={{ width: '100%'}} >
                        <ListItem dense divider>
                            <ListItemText 
                                primary="Actual Temperature" 
                                secondary={`${data?.temperature_current} deg`}
                                secondaryTypographyProps={{ style: {fontSize: '12px', color: 'rgb(19 36 74)'} }}
                                primaryTypographyProps={{ style: {fontSize: '16px', fontWeight: 600, color: 'rgb(1 12 12)'} }}
                            />
                        </ListItem>
                    </List>
                    <List sx={{ width: '100%'}} >
                        <ListItem dense divider>
                            <ListItemText 
                                primary="Maximum Temperature" 
                                secondary={`${data?.temperature_max} deg`}
                                secondaryTypographyProps={{ style: {fontSize: '12px', color: 'rgb(19 36 74)'} }}
                                primaryTypographyProps={{ style: {fontSize: '16px', fontWeight: 600, color: 'rgb(1 12 12)'} }}
                            />
                        </ListItem>
                    </List>
                    <List sx={{ width: '100%'}} >
                        <ListItem dense divider>
                            <ListItemText 
                                primary="Temperature(feels like)" 
                                secondary={`${data?.temperature_feels_like} deg`}
                                secondaryTypographyProps={{ style: {fontSize: '12px', color: 'rgb(19 36 74)'} }}
                                primaryTypographyProps={{ style: {fontSize: '16px', fontWeight: 600, color: 'rgb(1 12 12)'} }}
                            />
                        </ListItem>
                    </List>
                    <List sx={{ width: '100%'}} >
                        <ListItem dense divider>
                            <ListItemText 
                                primary="Humidity" 
                                secondary={`${data?.humidity} gm`}
                                secondaryTypographyProps={{ style: {fontSize: '12px', color: 'rgb(19 36 74)'} }}
                                primaryTypographyProps={{ style: {fontSize: '16px', fontWeight: 600, color: 'rgb(1 12 12)'} }}
                            />
                        </ListItem>
                    </List>
                    <List sx={{ width: '100%'}} >
                        <ListItem dense divider>
                            <ListItemText 
                                primary="Pressure" 
                                secondary={`${data?.pressure} psi`}
                                secondaryTypographyProps={{ style: {fontSize: '12px', color: 'rgb(19 36 74)'} }}
                                primaryTypographyProps={{ style: {fontSize: '16px', fontWeight: 600, color: 'rgb(1 12 12)'} }}
                            />
                        </ListItem>
                    </List>
                    <List sx={{ width: '100%'}} >
                        <ListItem dense divider>
                            <ListItemText 
                                primary="Wind Degree" 
                                secondary={`${data?.wind_degree} deg`}
                                secondaryTypographyProps={{ style: {fontSize: '12px', color: 'rgb(19 36 74)'} }}
                                primaryTypographyProps={{ style: {fontSize: '16px', fontWeight: 600, color: 'rgb(1 12 12)'} }}
                            />
                        </ListItem>
                    </List>
                    <List sx={{ width: '100%'}} >
                        <ListItem dense divider>
                            <ListItemText 
                                primary="Wind Speed" 
                                secondary={`${data?.wind_speed} Kt`}
                                secondaryTypographyProps={{ style: {fontSize: '12px', color: 'rgb(19 36 74)'} }}
                                primaryTypographyProps={{ style: {fontSize: '16px', fontWeight: 600, color: 'rgb(1 12 12)'} }}
                            />
                        </ListItem>
                    </List>
                    <List sx={{ width: '100%'}} >
                        <ListItem dense divider>
                            <ListItemText 
                                primary="Wind Gust Speed" 
                                secondary={`${data?.wind_gust} Kt`}
                                secondaryTypographyProps={{ style: {fontSize: '12px', color: 'rgb(19 36 74)'} }}
                                primaryTypographyProps={{ style: {fontSize: '16px', fontWeight: 600, color: 'rgb(1 12 12)'} }}
                            />
                        </ListItem>
                    </List>
            </Paper>
        </React.Fragment>
    )
}