import { Checkbox, Typography, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

const InitWizardFormStepOne = ({ list, listsSelected, setListSelected }: { list: any, listsSelected: any, setListSelected: any }) => {
    // const [estado, setEstado] = useState(false);
    useEffect(() => {
        const item = list?.find((accountItem: any) => accountItem.type === 'cash');
        if (item && !listsSelected?.accountsSelected?.includes(item.id)) {
            setListSelected({
                ...listsSelected,
                accountsSelected: [...(listsSelected?.accountsSelected) ?? [], item.id]
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
            <Typography variant="h4">Seleccione las cuentas a crear:</Typography>
            <Typography variant="inherit">(Despues podrás crear y editar más cuentas)</Typography>
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
                        <Typography variant="h6">{`${item.name} ${item.type === 'cash' ? '(Oblig.)' : ''}`}</Typography>
                        <Checkbox
                            size="large"
                            checked={listsSelected?.accountsSelected?.includes(item.id) || false}
                            disabled={item.type === 'cash'}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                return isChecked
                                    ? setListSelected({
                                        ...listsSelected,
                                        accountsSelected: listsSelected?.accountsSelected?.includes(item.id)
                                            ? listsSelected?.accountsSelected
                                            : [...(listsSelected?.accountsSelected ?? []), item.id]
                                    })
                                    : setListSelected({
                                        ...listsSelected,
                                        accountsSelected: (listsSelected?.accountsSelected || []).filter((id: any) => id !== item.id)
                                    });
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default InitWizardFormStepOne