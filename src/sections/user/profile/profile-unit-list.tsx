import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import UnitCard from 'src/components/cards/unitCars.tsx/unitCard';
import { IUnit } from 'src/config/types/types';
import { getUnitsByUserId } from 'src/services/api/apiClient';
import { useRouter } from 'src/routes/hooks';

const ProfileUnitListReduxed = ({ userData }: any) => {
    const [units, setUnits] = useState<any>([]);
    const router = useRouter();

    const onInvite = (unitData: IUnit) => { 
        console.log("presionado invitar desde ", unitData);
    };

    const onEdit = (unitData: IUnit) => { 
        console.log("presionado editar desde ", unitData);
        router.navigateState('/unitEdit', unitData);
    };

    useEffect(() => {
        getUnitsByUserId(userData?.id).then((res: any) => {
            setUnits(res?.result);
            console.log("units", res?.result);
        })
            .then((res: any) => {

            })
    }, [userData?.id]);
    return (
        units?.length > 0 &&
        <Box
            component="main"
            gap={2}
            sx={{
                display: 'flex',
                flex: '1 1 auto',
                alignItems: 'flex-start',
                flexDirection: 'row',
                // p: theme.spacing(3, 2, 10, 2),
                // [theme.breakpoints.up(layoutQuery)]: {
                //     justifyContent: 'center',
                //     p: theme.spacing(4, 10, 10, 10),
                // },
            }}
            rowGap={2}
        >
            {units.map((unit: any) =>
                <UnitCard
                    key={unit?.id}
                    unit={unit}
                    width='250px'
                    minHeight='290px'
                    imageProps={{ height: '100px' }}
                    onInvite={() => onInvite(unit)}
                    onEdit={() => onEdit(unit)}
                    onDelete={() => onInvite(unit)}
                />)}

        </Box>
    )
}
const ProfileUnitList = connect(
    (state: any) => ({
        userData: state.user.userData
    }),
)(ProfileUnitListReduxed);

export default ProfileUnitList;