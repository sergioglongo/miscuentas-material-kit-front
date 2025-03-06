import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useTheme, Breakpoint } from '@mui/material/styles';
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
import { getAllDefaultList } from 'src/services/api/modules/account.module';
import { createAccountsPayMethodsForUnit, createAreasCategoriesForUnit } from 'src/services/api/modules/params.module';
import InitWizardForm from './InitWizardForm';
// import ProfileEditForm from '../user/profile/profile-edit-form'

const InitWizardView = ({ initWizardForm, init, unitMain }: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorShow, setErrorShow] = useState<boolean>(false);

    const [listSelected, setListSelected] = useState({
        accountsSelected: [],
        areasSelected: [],
        categoriesSelected: []
    });
    const [defaultsLists, setDefaultsLists] = useState({
        accountDefaultsList: [],
        areasDefaultsList: [],
        categoriesDefaultsList: [],
        categoriesFiltered: []
    });
    const handleSave = async () => {
        console.log("Datos a enviar", listSelected);
        const dataAccounts = {
            unitId: unitMain.id,
            accountsList: listSelected.accountsSelected,
        }
        const dataAreasCategories = {
            unitId: unitMain.id,
            areasList: listSelected.areasSelected,
            categoriesList: listSelected.categoriesSelected,
        }
        console.log("dataAccounts", dataAccounts);
        console.log("dataAreas", dataAreasCategories);
        return createAccountsPayMethodsForUnit(dataAccounts)
            .then((responseCreateAccounts: any) => {
                if (responseCreateAccounts.success) {
                    return createAreasCategoriesForUnit(dataAreasCategories)
                }
                return false;
            })
            .catch((error: any) => false);
    }

    const getSetAllDefaultAccounts = async () => {
        getAllDefaultList()
            .then((accountsResponse: any) => {
                if (accountsResponse?.success) {
                    console.log("accountsResponse", accountsResponse?.result);
                    // setDefaultAccountsList(accountsResponse.result?.accountDefaultsList || []);
                    // setDefaultAreasList(accountsResponse.result?.areasDefaultsList || []);
                    // setDefaultCategoriesList(accountsResponse.result?.categoriesDefaultsList || []);
                    setDefaultsLists(accountsResponse.result);
                } else {
                    console.log("No se pudieron obtener las cuentas");
                }
            })
            .catch((err: any) => console.log(err));
    }

    useEffect(() => {
        if (!isLoading && defaultsLists.accountDefaultsList.length === 0) {
            setIsLoading(true);
            getSetAllDefaultAccounts()
                .then(() => {
                    console.log("defaultAccountslist loaded");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isLoading, defaultsLists]) // Only depend on isLoading state

    const theme = useTheme();
    const layoutQuery: Breakpoint = 'md';

    return (
        <Box width='auto'>

            <SectionCard
                title="Inicialización de datos"
                subtitle=""
                iconName="DocumentOk"
                iconSize={0}
                iconColor={theme.palette.primary.main}
            >
                {/* <AreaInitWizardForm handleEdit={handleSave} areaList={[]} /> */}
                <InitWizardForm
                    handleEdit={handleSave}
                    defaultsLists={defaultsLists}
                    setDefaultsLists={setDefaultsLists}
                    listSelected={listSelected}
                    setListSelected={setListSelected}
                />
            </SectionCard>
        </Box>

    );
}

const InitWizardViewReduxed = reduxForm({
    form: 'initWizardForm',
    enableReinitialize: true,
})(InitWizardView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
});

export default connect(
    (state: any) => ({
        unitMain: state.units.unitMain,
        initWizardForm: state.form.initWizardForm,
    }),
    mapDispatchToProps
)(InitWizardViewReduxed);