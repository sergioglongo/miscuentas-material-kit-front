import { useCallback, useEffect, useState } from 'react';
import IconList from 'src/components/list/IconList';
import ModalConfirm from 'src/components/modal/ModalConfirm';
import AreaIcon, { AreaIconsList } from 'src/components/icon/AreaIcons';
import { IArea, ITransaction } from 'src/config/types/types';
import { TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Checkbox, FormControl, Grid, ListItemIcon, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import { Field, Form } from 'redux-form'
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
import { fCurrency } from 'src/utils/format-number';

interface AccountAdjustModalProps {
    handleAdjust: any;
    transactionData: ITransaction;
    accountData: any;
    type: string;
    setType: any;
    amount: number;
    setAmount: any;
    onCancel: any;
}

function AccountAdjustModalForm({ handleAdjust, transactionData, accountData, amount, setAmount, type, setType, onCancel }: AccountAdjustModalProps) {
    const [adjusted, setAdjusted] = useState<number>(0);
    // const [amount, setAmount] = useState<number>(0);
    const [mode, setMode] = useState<string>('final');
    const [amountField, setAmountField] = useState<number>(0);

    const onChangeAmount = useCallback((value: any) => {
        setAmountField(value);
        if (mode === 'final') {
            const diference = (accountData?.balance ?? 0) - parseFloat(value ?? 0);
            setType(diference < 0 ? 'in' : 'out');
            setAmount(Math.abs(diference));
            setAdjusted(value);
            // console.log("Pasa por final. Ajustado: ", value, "Diferencia:", diference, " type:", diference > 0 ? 'in' : 'out', " monto:", Math.abs(diference));
        } else {
            const amountCalc = type === 'out' ? value * -1 : value;
            const calc = (accountData?.balance ?? 0) + Number(amountCalc ?? 0);
            setAmount(value);
            setAdjusted(calc);
            // console.log("Pasa por monto. Ajustado:", calc, " type:", type, " monto:", value);
        }
    }, [mode, accountData, type, setAmountField, setAmount, setAdjusted, setType]);

    useEffect(() => {
        console.log("mode", mode);
        setAdjusted(accountData?.balance);
        setAmount(0);
    }, [mode, accountData?.balance, setAdjusted, setAmount]);
    
    useEffect(() => {
        onChangeAmount(amountField);
    }, [type, amountField, onChangeAmount]);
    
    return (
        <Form onSubmit={handleAdjust} style={{ margin: '10px' }}>
            <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
                <Grid item xs={12} sm={12} gap={5} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <FormControl fullWidth>
                        <Field
                            name="description"
                            component={TextFieldErrorRedux}
                            label="Descripción"
                            placeholder='Ingrese la descripción'
                            InputLabelProps={{ shrink: true }}
                            value={transactionData?.description || accountData?.name || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} gap={5} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6">Por Monto</Typography>
                        <Switch
                            // defaultChecked
                            onClick={(e: any) => setMode(e.target.checked ? "final" : "amount")}
                            checked={mode === 'final'}
                        />
                        <Typography variant="h6" style={{ marginLeft: '8px' }}>Monto Final</Typography>
                    </Box>
                </Grid>
                {mode === 'amount' ?
                    <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <TextField
                            name="amountField"
                            placeholder='1500'
                            label="Monto"
                            type='text'
                            onChange={(e: any) => onChangeAmount(e.target.value)}
                            value={amountField || 0}
                        />
                        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                            <Typography variant="h6">Aumentar</Typography>
                            <Switch
                                onClick={(e: any) => setType(e.target.checked ? "out" : "in")}
                                checked={type === 'out'}
                            />
                            <Typography variant="h6" style={{ marginLeft: '8px' }}>Quitar</Typography>
                        </Box>
                    </Grid>
                    :
                    <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <TextField
                            name="amount"
                            placeholder='1500'
                            label="Monto Final"
                            type='text'
                            onChange={(e: any) => onChangeAmount(e.target.value)}
                            value={amountField || 0}
                        />
                    </Grid>
                }
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <SectionCard iconName='account_balance_wallet' title='Resumen de ajuste' subtitle='' titleVariant='h5'>
                        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                            <Box display='flex' flexDirection='row' gap={1}>
                                <Typography variant="h6">Actual: </Typography>
                                <Typography variant="h6">{`${fCurrency(accountData?.balance)}`}</Typography>

                            </Box>
                            <Box display='flex' flexDirection='row' gap={1}>
                                <Typography variant="h6" style={{ marginLeft: '8px' }}>Ajustado</Typography>
                                <Typography variant="h6">{`${fCurrency(adjusted)}`}</Typography>
                            </Box>
                        </Box>
                    </SectionCard>
                </Grid>
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' }}>
                    <Grid item xs={12} sm={6} width='100%' marginTop='10px'>
                        <Button fullWidth size="large" color="inherit" variant="contained" onClick={() => onCancel()}>Cancelar</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} width='100%' marginTop='10px' >
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            color="primary"
                            variant="contained"
                        // onClick={handleSignUp}
                        >
                            Ajustar
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Form >
    )
}

export default AccountAdjustModalForm;