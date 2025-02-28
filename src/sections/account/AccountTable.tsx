import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Checkbox, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import MUIDataTable from 'mui-datatables';
import { getAllAccountsByUnitId } from 'src/services/api/modules/account.module';
import { fCurrency, fNumber } from 'src/utils/format-number';
import AccountIcon from 'src/components/icon/AccountIcon';
import CommonIcon from 'src/components/icon/CommonIcons';
import { grey } from 'src/theme/core';
import { getCurrencyName, getTypeName } from 'src/utils/list-translate';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setAccountsList } from 'src/redux/slices/lists.slice';
import ModalConfirm from 'src/components/modal/ModalConfirm';
import AccountAdjustModalViewForm from './AccountAdjustModalView';
import TransferCreateEditViewForm from '../transfer/TransferCreateEditView';

const AccountTable = ({ unitActive, lists, setAccountsListState, transferCreateEditShow, setTransferCreateEditShow }: any) => {
    const [totalPesos, setTotalPesos] = useState(0);
    const [totalDollar, setTotalDollar] = useState(0);
    const [totalEuro, setTotalEuro] = useState(0);
    const [openmodalAdjust, setOpenmodalAdjust] = useState(false);
    const [accountDataSelected, setAccountDataSelected] = useState<any>(null);

    const rowsPerPage = 10;
    const router = useRouter();
    const onEdit = (accountData: any) => {
        const accountInitialData = {
            id: accountData[0],
            name: accountData[2],
            balance: accountData[3],
            currency: accountData[4],
            type: accountData[5],
            is_active: accountData[6],
            deleted: accountData[7],
            unitId: accountData[8],
        }
        console.log("presionado editar desde ", accountInitialData);
        router.navigateState('/accountEdit', accountInitialData);
    };
    const onAdjust = (accountIdAdjust: any) => {
        const accountData = {
            id: accountIdAdjust[0],
            name: accountIdAdjust[2],
            balance: accountIdAdjust[3],
            unitId: accountIdAdjust[8],
        }
        setAccountDataSelected(accountData);
        setOpenmodalAdjust(true);
    }

    const onClickName = (item: any) => {
        const data = { unitActive: item[8], account: item[0] }
        router.navigateState('/accountTransactions', data);
    };
    const getMuiTheme = () => createTheme({
        components: {
            MuiTable: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'white',
                        // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        fontSize: '16px',
                        padding: '10px',
                        // border: '1px solid #ddd',
                        borderBottom: '1px solid #ddd',
                    },
                }
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        fontSize: '20px',
                        // border: '1px solid #ddd',
                        borderBottom: '1px solid #ddd',
                    },
                }
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        backgroundColor: grey[200],
                        // borderRadius: 20,
                        fontWeight: 'bold',
                        marginBottom: '10px',
                    },
                    regular: {
                        fontWeight: 'bold',
                    }
                }
            },
            // MuiTableBodyCell: {
            //     styleOverrides: {
            //         root: {
            //             fontSize: 14,
            //             fontWeight: 'normal',
            //         },
            //     },
            // },
            MuiTableFooter: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#f0f0f0',
                        borderRadius: 20,
                    },
                },
            },
            MuiTablePagination: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#f0f0f0',
                        borderRadius: 0,
                        marginTop: 5,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    },
                    toolbar: {
                        '& .MuiTablePagination-selectLabel': {
                            margin: 0,
                        },
                        '& .MuiTablePagination-displayedRows': {
                            margin: 0,
                        },
                    },
                },
            },
        },
    });
    const customFooter = () => (
        <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='center' margin={2}>
            <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ color: 'text.secondary' }} >
                    Totales:
                </Typography>
                <Box gap={1} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <AccountIcon iconName="Pesos" styles={{ fontSize: '30', display: 'flex', color: 'blue' }} />
                    <Typography variant="h5" sx={{ color: 'text.primary' }} >
                        {fNumber(totalPesos)}
                    </Typography>
                </Box>
                <Box gap={1} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <AccountIcon iconName="Dolar" color="green" styles={{ dolarSize: 'xl', display: 'flex', dolarColor: 'green' }} />
                    <Typography variant="h5" sx={{ color: 'text.primary' }} >
                        {fNumber(totalDollar)}
                    </Typography>
                </Box>
                <Box gap={1} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <AccountIcon iconName="Euro" styles={{ fontSize: '30', display: 'flex', color: 'black' }} />
                    <Typography variant="h5" sx={{ color: 'text.primary' }} >
                        {fNumber(totalEuro)}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
    const columns: any = [
        {
            name: 'id',
            label: 'id',
            options: {
                filter: false,
                display: 'excluded',
            }
        },
        {
            name: 'id',
            label: 'Acciones',
            options: {
                filter: false,
                customBodyRender: (value: any, tableMeta: any) => (
                    <th style={{ width: 120, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Tooltip title="Ajustar Balance">
                            <IconButton aria-label="Ajustar" onClick={() => onAdjust(tableMeta?.rowData)}>
                                <CommonIcon color='gray' iconName="Adjust" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                            <IconButton aria-label="Ver" onClick={() => onEdit(tableMeta?.rowData)}>
                                <CommonIcon color='gray' iconName="Edit" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton aria-label="Ver" onClick={() => { }}>
                                <CommonIcon color='gray' iconName="Delete" />
                            </IconButton>
                        </Tooltip>
                    </th>
                ),
                customHeadRender: (columnMeta: any) => (
                    <th style={{ width: '80px', padding: 0, height: '40px' }}>
                        {columnMeta.label}
                    </th>
                )
            },
        },
        {
            name: 'name',
            label: 'Nombre',
            options: {
                filter: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{ minWidth: '100px', textAlign: 'left' }} >
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value: any, tableMeta: any) => (
                    <th onClick={() => onClickName(tableMeta?.rowData)}>
                        <Tooltip title={`Ver detalles de movimientos en cuenta ${value}`}>
                            {value}
                        </Tooltip>
                    </th>
                )
            }
        },
        {
            name: 'balance',
            label: 'Balance',
            options: {
                filter: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{ minWidth: '100px', textAlign: 'left' }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value: any) => (
                    <th>{fCurrency(value)}</th>
                ),
            }
        },
        {
            name: 'currency',
            label: 'Moneda',
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{}}>
                        {columnMeta.label}
                    </th>
                ), customBodyRender: (value: any, tableMeta: any) => () => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title={`${getCurrencyName(value)}`}>
                            <Box>
                                <AccountIcon iconName={value} styles={{ fontSize: '30', color: 'black' }} />
                            </Box>
                        </Tooltip>
                    </th>
                ),
                filterType: 'dropdown',
                filterOptions: {
                    names: ['Pesos', 'Dolar', 'Euro'],
                    logic(type: any, filterVal: any) {
                        return filterVal[0] === 'Pesos' ? type === 'Pesos' : filterVal[0] === 'Dolar' ? type === 'Dolar' : type === 'Euro';
                    },
                },
            }
        },
        {
            name: 'type',
            label: 'Tipo',
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{}}>
                        {columnMeta.label}
                    </th>
                ), customBodyRender: (value: any, tableMeta: any) => () => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title={`${getTypeName(value)}`}>
                            <Box>
                                <AccountIcon iconName={value} styles={{ fontSize: '30', color: 'black' }} />
                            </Box>
                        </Tooltip>
                    </th>
                ),
                filterType: 'dropdown',
                filterOptions: {
                    names: ['Pesos', 'Dolar'],
                    logic(type: any, filterVal: any) {
                        return filterVal[0] !== 'Ingreso' ? type === 'in' : type === 'out';
                    },
                },
            }
        },
        {
            name: 'is_active',
            label: 'Activo',
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{}}>
                        {columnMeta.label}
                    </th>
                ), customBodyRender: (value: any, tableMeta: any) => () => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <Checkbox checked={value} />
                    </th>
                ),
                filterType: 'dropdown',

                filterOptions: {
                    names: ['Activo', 'Inactivo'],
                    logic(is_active: any, filterVal: any) {
                        return filterVal[0] !== 'Activo' ? is_active === true : is_active === false;
                    },
                },
            }
        },
        {
            name: 'deleted',
            label: 'Deleted',
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: 'unitId',
            label: 'Unit',
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
    ];
    const options: any = {
        filterType: 'multiselect',
        responsive: 'vertical',
        selectableRows: 'none',
        searchAlwaysOpen: true,
        searchPlaceholder: 'Busque por nombre o balance',
        caseSensitive: false,
        print: false,
        search: true,
        viewColumns: false,
        download: false,
        pagination: true,
        rowsPerPageOptions: [10, 15, 50],
        rowsPerPage,
        customToolbar: () => {

        },
        customFooter: (
            count: number,
            page: number,
            rowsPerPageFooter: number,
            changeRowsPerPage: any,
            changePage: any
        ) => (customFooter()),
        sortOrder: {
            name: 'entidad',
            direction: 'asc'
        },
        setTableProps: () => ({
            padding: 'normal',
            // material ui v4 only
            size: 'medium', // or small or large
        }),
        textLabels: {
            body: {
                noMatch: 'Sin datos para mostrar',
                toolTip: 'Ordenar',
                //   columnHeaderTooltip: column => `Sort for ${column.label}`
            },
            toolbar: {
                search: 'Buscar',
                downloadCsv: 'Download CSV',
                print: 'Print',
                viewColumns: 'Ver columnas',
                filterTable: 'Filtros de tabla',
            },
            filter: {
                all: 'Todos',
                title: 'Filtros',
                reset: 'Limpiar',
            },
            viewColumns: {
                title: 'Mostrar Columnas',
                titleAria: 'Mostrar/Ocultar Columnas',
            },
            pagination: {
                next: 'Siguiente',
                previous: 'Anterior',
                rowsPerPage: 'Por página:',
              }
        },
        // onSearchChange: (searchText) => {
        //   console.log('onSearchChange', searchText);
        //   filterChoferes(searchText);
        // },
    };
    const loadingRef = useRef(false);
    const totalCalc = (accounts: any) => {
        let totalPesosTemp = 0;
        let totalDolarTemp = 0;
        let totalEuroTemp = 0;
        accounts.forEach((account: any) => {
            switch (account.currency) {
                case 'Pesos':
                    totalPesosTemp += account.balance;
                    break;
                case 'Dolar':
                    totalDolarTemp += account.balance;
                    break;
                default:
                    totalEuroTemp += account.balance;
                    break;
            }
        })
        setTotalDollar(totalDolarTemp);
        setTotalPesos(totalPesosTemp);
        setTotalEuro(totalEuroTemp);
    }
    const getAccountsList = useCallback(() => {
        getAllAccountsByUnitId(unitActive?.id, null)
            .then((accountResponse: any) => {
                // console.log("accountResponse", accountResponse);
                if (accountResponse?.success) {
                    const categoriesWithArea = accountResponse.result.map((account: any) => ({ ...account, account: account.unit.name, description: account.unit.description, accountPhoto: account.unit.photo }));
                    setAccountsListState(categoriesWithArea);
                    totalCalc(categoriesWithArea);
                    // console.log("totales", totalDolarTemp, totalPesosTemp, totalEuroTemp);
                } else {
                    console.log("No se pudieron obtener las accounts");
                }
            })
            .catch((err: any) => console.log(err));
    }, [unitActive?.id, setAccountsListState]);

    useEffect(() => {
        if (lists.accountsList.length === 0 && !loadingRef.current) {
            getAccountsList();
        } else {
            totalCalc(lists.accountsList);
        }
    }, [lists.accountsList, getAccountsList, loadingRef]);

    return (
        <Box>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title='Cuentas'
                    data={lists.accountsList}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider >
            <ModalConfirm
                openmodal={openmodalAdjust}
                setOpenmodal={setOpenmodalAdjust}
                children={
                    // <AreaCreateEditModalViewForm
                    //     onCancel={() => setOpenmodalAdjust(false)}
                    //     color={areaColorSelected}
                    //     areaId={areaSelected}
                    //     unitId={unit?.id}
                    //     type={type}
                    //     updateAreasList={getSetAreasList}
                    // />
                    <AccountAdjustModalViewForm
                        onCancel={() => setOpenmodalAdjust(false)}
                        accountData={accountDataSelected}
                        updateList={getAccountsList}
                    />
                }
                buttonPrimaryAction={() => setOpenmodalAdjust(false)}
                buttonSecondaryAction={() => setOpenmodalAdjust(false)}
                loading={false}
                buttonSecondaryText="Cancelar"
                buttonPrimaryText="Aceptar"
                buttonSecondaryShow={false}
                buttonPrimaryShow={false}
            />
            <ModalConfirm
                openmodal={transferCreateEditShow}
                setOpenmodal={setTransferCreateEditShow}
                children={
                    <TransferCreateEditViewForm
                        onCancel={() => setTransferCreateEditShow(false)}
                        updateTransactionsList={() => getAccountsList()}
                    />
                }
                buttonPrimaryAction={() => setTransferCreateEditShow(false)}
                buttonSecondaryAction={() => setTransferCreateEditShow(false)}
                loading={false}
                buttonSecondaryText="Cancelar"
                buttonPrimaryText="Aceptar"
                buttonSecondaryShow={false}
                buttonPrimaryShow={false}
            />
        </Box>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    setAccountsListState: bindActionCreators(setAccountsList, dispatch),
})

export default connect(
    (state: any) => ({
        unitActive: state.units.unitActive,
        lists: state.lists
    }),
    mapDispatchToProps
)(AccountTable);