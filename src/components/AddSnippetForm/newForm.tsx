import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields() {
    return (
        <Box
            component='form'
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete='off'
        >
            <TextField
                name='title'
                id='outlined-basic'
                label='Title'
                variant='outlined'
                //
            />
            <TextField
                id='outlined-multiline'
                label='Description'
                multiline
                rows={4}
            />
        </Box>
    );
}
