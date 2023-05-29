import React from 'react';

// Legacy Imports
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

// Models
import { OptionProps } from '../../types/types';
interface SelectFieldprops {
    name: string;
    placeholder: string;
    helpertext: string;
    value: string;
    paperWidth: string;
    options: OptionProps[];
    triggerChange: (value: string)=> void;
}

export const SelectField: React.FC <SelectFieldprops> = ({
    name,
    placeholder,
    helpertext,
    value,
    options,
    paperWidth,
    triggerChange
})=> {

    // Event Handlers
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=> triggerChange(event.target.value);

    // Renderer
    return(
        <React.Fragment>
            <TextField
                select
                placeholder={placeholder}
                helperText={helpertext}
                value={value}
                onChange={handleChange}
                variant="standard"
                FormHelperTextProps={{sx: {color: '#4a4a4a'}}}
                InputProps={{sx: {color: '#240202', fontWeight: 600}}}
                sx={{color: '#FFF'}}
                SelectProps = {{
                    MenuProps: {
                        PaperProps: {sx: {
                            margin: '24px 0px',
                            width: paperWidth,
                            padding: '4px 2px',
                            maxHeight: '200px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '16px',
                            overflow: 'scroll', 
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {display: 'none'},
                        }}
                    }
                }}
            >
                {options.map((option: OptionProps) => (
                    <MenuItem 
                        key={option.key} 
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </React.Fragment>
    )
}