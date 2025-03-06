import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Checkbox, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import MUIDataTable from 'mui-datatables';
import { getAllPayMethodsByUnitId } from 'src/services/api/modules/payMethod.module';
import PayMethodIcon from 'src/components/icon/PayMethodIcons';
import CommonIcon from 'src/components/icon/CommonIcons';
import { grey, secondary } from 'src/theme/core';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setPayMethodsList } from 'src/redux/slices/lists.slice';
import { getMethodName, getPayMethodTypeName } from 'src/utils/list-translate';
import {Spinner} from 'src/components/spinner/Spinner';

const PayMethodTable = ({ unitActive, lists, setPayMethodSelected, setPayMethodsListState, setOpenmodalPayMethodEdit }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const rowsPerPage = 10;

    const getPayMethodsList = useCallback(async () =>
        getAllPayMethodsByUnitId({ unitId: unitActive?.id, deleted: false })
            .then((peyMethodsResponse: any) => {
                if (peyMethodsResponse?.success) {
                    const payMethodWithArea = peyMethodsResponse.result.map((category: any) => ({ ...category, accountName: category.account.name }));
                    setPayMethodsListState(payMethodWithArea);
                } else {
                    console.log("No se pudieron obtener las payMethod");
                }
            })
            .catch((err: any) => console.log(err))
        , [unitActive?.id, setPayMethodsListState]);

    useEffect(() => {
        if (!isLoading && unitActive?.id) {
            setIsLoading(true);
            getPayMethodsList()
                .finally(() =>  setIsLoading(false));
        }
    }, [unitActive?.id, getPayMethodsList]); // eslint-disable-line

    const onEdit = (payMethodData: any) => {
        console.log("presionado editar el metodo de pago ", payMethodData[0]);
        setPayMethodSelected(payMethodData[0]);
        setOpenmodalPayMethodEdit(true);
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
                        backgroundColor: grey[200],
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
            label: 'Editar',
            options: {
                filter: false,
                customBodyRender: (value: any, tableMeta: any) => (
                    <th key={`action-${value}`} style={{ width: 80, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Tooltip title="Editar">
                            <IconButton aria-label="Ver" onClick={() => onEdit(tableMeta?.rowData)}>
                                <CommonIcon color='gray' iconName="Edit" />
                            </IconButton>
                        </Tooltip>
                    </th>
                ),
                customHeadRender: (columnMeta: any) => (
                    <th key={`header-${columnMeta.name}`} style={{ width: '80px', padding: 0, height: '40px' }}>
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
                    <th key={`header-${columnMeta.name}`} style={{ minWidth: '100px', textAlign: 'left' }}>
                        {columnMeta.label}
                    </th>
                )
            }
        },
        {
            name: 'type',
            label: 'Tipo',
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th key={`header-${columnMeta.name}`} style={{}}>
                        {columnMeta.label}
                    </th>
                ), customBodyRender: (value: any, tableMeta: any) => () => (
                    <th key={`type-${tableMeta.rowIndex}`} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title={`${getPayMethodTypeName(value)}`}>
                            <Box>
                                {value === 'out' ?
                                    <CommonIcon iconName='CircleUp' styles={{ fontSize: '30', color: 'orange' }} />
                                    : value === 'in' ?
                                        <CommonIcon iconName='CircleDown' styles={{ fontSize: '30', color: 'green' }} />
                                        :
                                        <CommonIcon iconName='Adjust' styles={{ fontSize: '30', color: secondary }} />
                                }
                            </Box>
                        </Tooltip>
                    </th>
                ),
                filterType: 'dropdown',
                filterOptions: {
                    names: ['Ingreso', 'Egreso'],
                    logic(type: any, filterVal: any) {
                        return filterVal[0] !== 'Ingreso' ? type === 'in' : type === 'out';
                    },
                },
            }
        },
        {
            name: 'method',
            label: 'Método',
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th key={`header-${columnMeta.name}`} style={{}}>
                        {columnMeta.label}
                    </th>
                ), customBodyRender: (value: any, tableMeta: any) => () => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title={`${getMethodName(value)}`}>
                            <Box>
                                <PayMethodIcon iconName={value} styles={{ fontSize: '40', display: 'flex', color: grey[700] }} />
                            </Box>
                        </Tooltip>
                    </th>
                ),
                filterType: 'dropdown',
                filterOptions: {
                    names: ['Ingreso', 'Egreso'],
                    logic(type: any, filterVal: any) {
                        return filterVal[0] !== 'Ingreso' ? type === 'in' : type === 'out';
                    },
                },
            }
        },
        {
            name: 'accountName',
            label: 'Cuenta',
            options: {
                filter: false,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th key={`header-${columnMeta.name}`} style={{ textAlign: 'center' }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value: any) => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {value}
                    </th>
                ),
            }
        },
        {
            name: 'is_active',
            label: 'Activo',
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th key={`header-${columnMeta.name}`} style={{}}>
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
            name: 'accountId',
            label: 'accountId',
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
        searchPlaceholder: 'Busque por nombre o descripción',
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
                noMatch:
                    isLoading ?
                        <Spinner />
                        : 'Sin datos para mostrar',
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

    return (
        <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title='Métodos de pago'
                data={lists.payMethodsList}
                columns={columns}
                options={options}
            />
        </ThemeProvider >
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    setPayMethodsListState: bindActionCreators(setPayMethodsList, dispatch),
})

export default connect(
    (state: any) => ({
        unitActive: state.units.unitActive,
        lists: state.lists
    }),
    mapDispatchToProps
)(PayMethodTable);