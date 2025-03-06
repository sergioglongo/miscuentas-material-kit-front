import React, { useEffect, useState } from 'react'
import { Box, Typography, Checkbox } from '@mui/material';

interface InitWizardStepTwoProps {
    list: any;
    defaultsLists: any;
    setDefaultsLists: any;
    listsSelected: any;
    setListSelected: any;
}

const InitWizardFormStepThree = ({ list, defaultsLists, setDefaultsLists, listsSelected, setListSelected }: InitWizardStepTwoProps) => {
    const [listToShow, setListToShow] = useState<any>([]);

    useEffect(() => {
        const items: any = [];
        defaultsLists?.categoriesDefaultsList?.forEach((categoriaItem: any) => {
            if (categoriaItem.name === 'Supermercado' || categoriaItem.name === 'Sueldo Principal') {
                items.push(categoriaItem.id);
            }
        })
        if (items && items.length > 0) {
            const newCategories = items.filter((item: any) => !listsSelected?.categoriesSelected?.includes(item));
            setListSelected({
                ...listsSelected,
                categoriesSelected: [...(listsSelected?.categoriesSelected || []), ...newCategories]
            });
        }
    }, [defaultsLists?.categoriesDefaultsList]) // eslint-disable-line

    useEffect(() => {
        const listFilteredLocal = list?.filter((item: any) => listsSelected?.areasSelected?.includes(item.areaId));
        const areas: any = {};
        listFilteredLocal?.forEach((item: any) => {
            const areaId = item.areaId;
            const areaName = item.area.name;
            if (!areas[areaId]) {
                areas[areaId] = {
                    id: areaId,
                    name: areaName,
                    categories: []
                };
            }
            areas[areaId].categories.push(item);
        });

        const areasArray = Object.values(areas);
        setDefaultsLists({
            ...defaultsLists,
            categoriesFiltered: listFilteredLocal
        });
        setListToShow(areasArray);

    }, [listsSelected?.areasSelected]); // eslint-disable-line

    return (
        <Box
            width='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            padding={3}
        >
            <Typography variant="h4">Seleccione las categorías a crear:</Typography>
            <Typography variant="inherit">(Despues podrás crear y editar más categorías)</Typography>
            <Box
                width='100%'
                display='flex'
                flexDirection='column'
                alignItems='flex-start'
                justifyContent='center'
                padding={2}
                flexWrap='wrap'
                gap={2}
            >
                {listToShow?.map((area: any) => (
                    <Box key={area.id}
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='center'
                        gap={1}
                    >
                        <Typography variant="h6">{area.name}:</Typography>
                        {area.categories?.map((category: any) => (
                            <Box key={category.id} display='flex' flexDirection='row' alignItems='center' justifyContent='center' >
                                <Checkbox
                                    size="large"
                                    checked={listsSelected?.categoriesSelected?.includes(category.id)}
                                    disabled={category.name === 'Supermercado' || category.name === 'Sueldo Principal'}
                                    onChange={() => {
                                        if (listsSelected?.categoriesSelected?.includes(category.id)) {
                                            setListSelected({
                                                ...listsSelected,
                                                categoriesSelected: listsSelected?.categoriesSelected?.filter((id: any) => id !== category.id)
                                            });
                                        } else {
                                            setListSelected({
                                                ...listsSelected,
                                                categoriesSelected: [...(listsSelected?.categoriesSelected || []), category.id]
                                            });
                                        }
                                    }}
                                />
                                <Typography variant="body1">{category.name}</Typography>
                            </Box>
                        ))}
                    </Box>
                ))}

            </Box>
        </Box>
    )
}


export default InitWizardFormStepThree