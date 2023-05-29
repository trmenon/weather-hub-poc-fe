import React from 'react';

// Legacy Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// Constants
import { constants } from '../../constants/constants';

// Models
interface BrandBarProps {
    dark: boolean;
    toggleHandler: ()=> void;
}



export const BrandBar: React.FC<BrandBarProps> = ({
    dark,
    toggleHandler,
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
                                color: dark? '#f5f5f5': '#8134DF', 
                                fontSize: '32px' 
                            }}
                        >
                            {constants?.app_name}
                        </Typography>
                        <FormControlLabel 
                            control={
                                <Switch
                                    checked={dark}
                                    onChange={toggleHandler}
                                    color='secondary'
                                />
                            } 
                            label={<Typography sx={{color: '#FFF'}}>{dark? 'Dark': 'Light'}</Typography>}
                        />
                        
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    )
}