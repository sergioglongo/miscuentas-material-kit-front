import { useEffect, useState } from 'react';
import { Button, Snackbar, Step, StepLabel, Stepper, useMediaQuery } from '@mui/material'
import { Form } from 'redux-form'
import { AlertSnack } from 'src/components/notifications/AlertSnack';
import styles from './signIn.module.css';
import InitWizardFormStepOne from './InitWizardFormStepOne';
import InitWizardFormStepTwo from './InitWizardFormStepTwo';
import InitWizardFormStepThree from './InitWizardFormStepThree';
import InitWizardFormCongratulation from './InitWizardFormCongratulation';

interface InitWizardProps {
    handleEdit: any;
    defaultsLists: any;
    setDefaultsLists: any;
    listSelected: any;
    setListSelected: any;
}

function getSteps() {
    return ['Creación de cuentas', 'Creación de areas', 'Creación de categorias'];
}

function getStepContent(step: number, list: any, setDefaultsLists: any, listsSelected: any, setListSelected: any): any {
    switch (step) {
        case 0:
            return <InitWizardFormStepOne list={list?.accountDefaultsList} listsSelected={listsSelected} setListSelected={setListSelected} />;
        case 1:
            return <InitWizardFormStepTwo list={list?.areasDefaultsList} listsSelected={listsSelected} setListSelected={setListSelected} />;
        case 2:
            return <InitWizardFormStepThree list={list?.categoriesDefaultsList} defaultsLists={list} setDefaultsLists={setDefaultsLists} listsSelected={listsSelected} setListSelected={setListSelected} />;
        default:
            return 'Unknown step';
    }
}

function InitWizardForm({ handleEdit, defaultsLists, setDefaultsLists, listSelected, setListSelected }: InitWizardProps) {
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const isMdDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
    const [alertMessage, setAlertMessage] = useState({
        message: 'Error en la creación de las cuentas',
        show: false,
        color: 'danger'
    });

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            await handleEdit()
                .then((success: any) => {
                    console.log("success", success);
                    if (success) {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        setAlertMessage({ message: 'Cuentas, areas y metodos creados correctamente', show: true, color: 'success' });
                    } else {
                        setAlertMessage({ message: 'Error en la creación de las cuentas', show: true, color: 'danger' });
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                })
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        console.log("setListSelected cambió", listSelected);
    }, [listSelected]);

    return (
        <Form style={{ margin: '10px' }}>
            <div className={styles.root}>
                <Stepper activeStep={activeStep} orientation={isMdDown ? 'vertical' : 'horizontal'}>
                    {steps.map((label, index) => {
                        const stepProps: any = {};
                        const labelProps: any = {};
                        // if (isStepSkipped(index)) {
                        //     stepProps.completed = false;
                        // }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <InitWizardFormCongratulation />
                    ) : (
                        <div>
                            {getStepContent(activeStep, defaultsLists, setDefaultsLists, listSelected, setListSelected)}
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={styles.button}>
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={styles.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <Snackbar
                    open={alertMessage?.show}
                    // message={errorMessage}
                    autoHideDuration={3000}
                    onClose={() => setAlertMessage({ ...alertMessage, show: false })}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <AlertSnack onClose={() => setAlertMessage({ ...alertMessage, show: false })} severity={alertMessage?.color}>
                        {alertMessage?.message}
                    </AlertSnack>
                </Snackbar>
            </div>
        </Form>
    )
}

export default InitWizardForm;