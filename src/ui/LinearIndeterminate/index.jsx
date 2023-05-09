import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate({ sx }) {
    return (
        <Box sx={{ width: '100%', color: `${sx?.color}` }}>
            <LinearProgress color="inherit" />
        </Box>
    );
}
