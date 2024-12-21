import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { createEditUser } from 'src/services/api/modules/user.module';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useTheme, Breakpoint } from '@mui/material/styles';
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
import ProfileEditForm from '../user/profile/profile-edit-form';
import AreaInitWizardForm from './AreaInitWizardForm';
// import ProfileEditForm from '../user/profile/profile-edit-form'

const AreaInitWizardView = ({ areaWizardForm,init }: any) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorShow, setErrorShow] = useState<boolean>(false);

    useEffect(() => {
        if (true) {
            init('areaWizardForm', {});
            console.log("inicializacion de userData");
        }

    }, [init])

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        console.log("formulario a guardar:", areaWizardForm?.values);
        createEditUser({
            id: areaWizardForm?.values?.id,
            firstname: areaWizardForm?.values?.firstname,
            lastname: areaWizardForm?.values?.lastname,
            email: areaWizardForm?.values?.email
        })
            .then((res) => {
                if (res?.success) {
                    router.back();
                } else {
                    setErrorMessage(res?.message);
                    setErrorShow(true);
                    console.log("error else", res)
                }
            }
            )
            .catch((err: any) => {
                setErrorMessage(err?.message);
                setErrorShow(true);
                console.log("error catch", err)
            });

    }, [router, areaWizardForm?.values]);

    const theme = useTheme();
    const layoutQuery: Breakpoint = 'md';

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flex: '1 1 auto',
                alignItems: 'center',
                flexDirection: 'column',
                p: theme.spacing(3, 2, 10, 2),
                [theme.breakpoints.up(layoutQuery)]: {
                    justifyContent: 'center',
                    p: theme.spacing(2, 10, 10, 10),
                },
            }}
            rowGap={2}
        >
            {/* <FormLayout > */}
            <SectionCard
                title="Inicializacion de Areas"
                subtitle=""
                iconName="DocumentOk"
                iconSize={50}
                iconColor={theme.palette.primary.main}
            >
                {/* <ProfileEditForm handleEdit={handleSave} userData={{}} /> */}
                {/* <UnitEditForm units={units} /> */}
                {/* <AreaInitWizardViewReduxed handleEdit={handleSave} /> */}
                <AreaInitWizardForm handleEdit={handleSave} areaList={[]} />
            </SectionCard>
        </Box>
    );
}

const AreaInitWizardViewReduxed = reduxForm({
    form: 'areaWizardForm',
    enableReinitialize: true,
})(AreaInitWizardView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
});

const AreaInitWizardViewEx = connect(
    (state: any) => ({
        areaWizardForm: state.form.areaWizardForm,
    }),
    mapDispatchToProps
)(AreaInitWizardViewReduxed);

export default AreaInitWizardViewEx;