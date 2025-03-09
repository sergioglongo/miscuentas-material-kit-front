import { Box, Typography } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import UnitIcon from 'src/components/icon/unit-icons'

const UnitActive = ({ unit }: any) => (
    <Box display='flex' alignItems='center' gap={1} marginRight={1} flexWrap='wrap'>
        <Typography variant="body2">Unidad activa:</Typography>
        <Box
            display='flex'
            alignItems='center'
            gap={1}
            border='1px solid #e0e0e0'
            borderRadius='10px'
            padding='5px'
            paddingX='10px'
        >
            <UnitIcon iconName={unit.logo} styles={{ color: '#343434FF' }} />
            {unit.name}
        </Box>
    </Box>
)

export const UnitActiveItem = connect(
    (state: any) => ({
        unit: state.units.unitActive,
    }),
    null
)(UnitActive);
