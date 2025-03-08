import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setUser } from 'src/redux/slices/user.slice';
import { setUnitMain, setUnits } from 'src/redux/slices/units.slice';
import styles from './signIn.module.css';

const InitWizardFormCongratulation = ({ unitMain, setUnitMainData, setUnitsListData, user, setUserData }: any) => {
    const router = useRouter();

    const onClickStart = () => {
        const userInitialized = { ...user, initialized: true };
        setUserData(userInitialized);
        router.push('/dashboard')
    }

    return (
        <Box
            width='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            padding={3}
            gap={2}
        >
            <Typography variant="h4" textAlign='center'>Completaste la configuración inicial</Typography>
            <Typography variant="h6">Ahora puedes empezar a gestionar tus cuentas</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={onClickStart}
                className={styles.buttonSuccess}
            >
                Comencemos
            </Button>
        </Box >
    )
}
const mapDispatchToProps = (dispatch: any) => ({
    setUnitMainData: bindActionCreators(setUnitMain, dispatch),
    setUnitsListData: bindActionCreators(setUnits, dispatch),
    setUserData: bindActionCreators(setUser, dispatch),
});

export default connect(
    (state: any) => ({
        unitMain: state.units.unitMain,
        user: state.user
    }),
    mapDispatchToProps
)(InitWizardFormCongratulation);