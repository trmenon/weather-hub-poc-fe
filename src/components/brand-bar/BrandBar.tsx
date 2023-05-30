import React from 'react';

// Legacy Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Badge from '@mui/material/Badge';

// Constants
import { constants } from '../../constants/constants';

// Models
interface BrandBarProps {
    metric: boolean;
    toggleHandler: ()=> void;
    weather: string;
}



export const BrandBar: React.FC<BrandBarProps> = ({
    metric,
    toggleHandler,
    weather,
})=> {

    // Renderer
    return(
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar 
                    position="fixed"
                    color='transparent'
                    elevation={0}
                    sx={{height: '64px'}}
                >
                    <Toolbar 
                        sx={{px: {xs: '8px', md: '64px'}}}
                    >                    
                        <Typography 
                            component="div" 
                            sx={{ 
                                flexGrow: 1, 
                                textAlign: 'left', 
                                color: '#FEFEFE', 
                                fontSize: '32px' 
                            }}
                        >
                            {constants?.app_name}
                        </Typography>
                        <FormControlLabel 
                            control={
                                <Switch
                                    checked={metric}
                                    onChange={toggleHandler}
                                    color='secondary'
                                />
                            } 
                            label={
                                weather.length === 0?
                                    <Typography sx={{color: '#FFF'}}>
                                        {metric? 'Metric': 'Imperial'}
                                    </Typography>
                                    :
                                    <Badge 
                                        badgeContent={
                                            <img 
                                                src={`https://openweathermap.org/img/wn/${weather}.png`}
                                                width={'16px'}
                                                height={'16px'}
                                            />
                                        } 
                                        color="info"
                                    >
                                        <Box sx={{pr: '16px'}}>
                                            <Typography sx={{color: '#FFF'}}>
                                                {metric? 'Metric': 'Imperial'}
                                            </Typography>
                                        </Box>                                        
                                    </Badge>
                            }
                        />
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    )
}