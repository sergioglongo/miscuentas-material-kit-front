import { Box, Button, Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'
import AreaIcon from 'src/components/icon/AreaIcons'

function AreaIconCustom({ areaData, icon, color, setOpenmodalIcon, setOpenmodalColor }: any) {
    return (
        <Card >
            <CardHeader title='Icono' />
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '100%',
                gap: 4,
                flexWrap: 'wrap'
            }}>
                <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <Box sx={{ gap: 2, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {/* <Typography variant="h6">Icono:</Typography> */}
                        <Button variant='contained' style={{ paddingLeft: '20px', paddingRight: '24px' }} onClick={() => setOpenmodalIcon(true)} >Icono</Button>
                    </Box>
                    <Box sx={{ gap: 2, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {/* <Typography variant="h6">Color:</Typography> */}
                        <Button variant='contained' style={{ paddingLeft: '20px', paddingRight: '24px' }} onClick={() => setOpenmodalColor(true)} >Color</Button>
                    </Box>

                </Box>
                <Box >
                    {(!!areaData?.icon || !!icon) &&
                        <AreaIcon
                            iconName={icon || areaData?.icon}
                            styles={{
                                fontSize: 100,
                                display: 'flex',
                                color: color || 'black',
                                borderRadius: '5px',
                                // border: '1px solid #ccc',
                                boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
                                padding: '5px'
                            }}
                        />}
                </Box>
            </CardContent>

        </Card>
    )
}

export default AreaIconCustom