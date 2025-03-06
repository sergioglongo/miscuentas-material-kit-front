import { Checkbox, Typography, Box } from '@mui/material'
import React, { useEffect, useLayoutEffect } from 'react'

interface InitWizardStepTwoProps {
    list: any;
    listsSelected: any;
    setListSelected: any;
}

const InitWizardFormStepTwo = ({ list, listsSelected, setListSelected }: InitWizardStepTwoProps) => {
    useEffect(() => {
        const items: any = [];
        list?.forEach((areaItem: any) => {
            if (areaItem.name === 'Ingresos' || areaItem.name === 'Mercado') {
                items.push(areaItem.id);
            }
        })
        if (items && items?.length > 0) {
                setListSelected({
                    ...listsSelected,
                    areasSelected: [...(listsSelected?.areasSelected || []), ...items]
                });
        }
    }, [list]); // eslint-disable-line

    return (
        <Box
            width='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            padding={3}
        >
            <Typography variant="h4">Seleccione las areas a crear:</Typography>
            <Typography variant="inherit">(Despues podrás crear y editar más areas)</Typography>
            <Box
                width='100%'
                display='flex'
                flexDirection='row'
                alignItems='center'
                justifyContent='center'
                padding={2}
                flexWrap='wrap'
                gap={4}
            >
                {list?.map((item: any) => (
                    <Box
                        key={item.id}
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Typography variant="h6">{`${item.name} ${item.name === 'Ingresos' || item.name === 'Mercado' ? '(Oblig.)' : ''}`}</Typography>
                        <Checkbox
                            size="large"
                            checked={listsSelected?.areasSelected?.includes(item.id) || false}
                            disabled={item.name === 'Ingresos' || item.name === 'Mercado'}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                    setListSelected({
                                        ...listsSelected,
                                        areasSelected: listsSelected?.areasSelected.includes(item.id)
                                            ? listsSelected?.areasSelected || []
                                            : [...(listsSelected?.areasSelected || []), item.id]
                                    });
                                } else {
                                    setListSelected({
                                        ...listsSelected,
                                        areasSelected: (listsSelected?.areasSelected || []).filter((id: any) => id !== item.id)
                                    });
                                }
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default InitWizardFormStepTwo