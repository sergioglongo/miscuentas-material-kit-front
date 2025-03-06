import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export const Spinner = () =>
    <Box display='flex' justifyContent='center' alignItems='center' height='100%' padding={5}>
        <CircularProgress />
    </Box>