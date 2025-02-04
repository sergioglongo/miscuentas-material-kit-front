import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import MUIDataTable from 'mui-datatables';
import { getAllTransactionsByUnitId } from 'src/services/api/modules/transaction.module';
import PayMethodIcon from 'src/components/icon/paymethod-icons';
import CommonIcon from 'src/components/icon/CommonIcons';
import { fDateSlash } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

const TransactionTable = ({ unitActive }: any) => {
    const [transaction, setTransaction] = useState([]);
    const rowsPerPage = 10;
    const router = useRouter();
    const onEdit = (value: any) => {
        // console.log("Elegido editar id: ", value);
        router.navigateState('/transactionEdit', { id: value, });
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
                        backgroundColor: '#f0f0f0',
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
                customBodyRender: (value: any, tableMeta: any) => {
                    if(tableMeta.rowData[7] === 'Ajuste'){
                        return <th style={{ width: 120, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            Sin acciones
                            </th>;
                    }
                    return <th style={{ width: 120, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Tooltip title="Ver detalle">
                            <IconButton aria-label="Ver" onClick={() => { }}>
                                <CommonIcon color='gray' iconName="View" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                            <IconButton aria-label="Ver" onClick={() => onEdit(value)}>
                                <CommonIcon color='gray' iconName="Edit" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton aria-label="Ver" onClick={() => { }}>
                                <CommonIcon color='gray' iconName="Delete" />
                            </IconButton>
                        </Tooltip>
                    </th>
                },
                customHeadRender: (columnMeta: any) => (
                    <th style={{ width: '80px', padding: 0, height: '40px' }}>
                        {columnMeta.label}
                    </th>
                )
            },
        },
        {
            name: 'description',
            label: 'Descripción',
            options: {
                filter: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{ minWidth: '100px', textAlign: 'left' }}>
                        {columnMeta.label}
                    </th>
                )
            }
        },
        {
            name: 'amount',
            label: 'Monto',
            options: {
                filter: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{ minWidth: '100px', textAlign: 'left' }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value: any) => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {fCurrency(value)}
                    </th>
                ),
            }
        },
        {
            name: 'date',
            label: 'Fecha',
            options: {
                filter: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{ minWidth: '100px', textAlign: 'left' }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value: any) => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {fDateSlash(value)}
                    </th>
                ),
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
                        {value === 'out' ?
                            <CommonIcon iconName='CircleUp' styles={{ fontSize: '30', color: 'orange' }} />
                            :
                            <CommonIcon iconName='CircleDown' styles={{ fontSize: '30', color: 'green' }} />
                        }
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
            name: 'payMethodName',
            label: 'Método',
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{}}>
                        {columnMeta.label}
                    </th>
                ), customBodyRender: (value: any, tableMeta: any) => () => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <PayMethodIcon iconName={value} styles={{ fontSize: '40', display: 'flex', color: 'black' }} />
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
            name: 'categoryName',
            label: 'Categoria',
            options: {
                filter: false,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{ textAlign: 'center' }}>
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
            name: 'areaName',
            label: 'Area',
            options: {
                filter: false,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th style={{ textAlign: 'center' }}>
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
            name: 'areaId',
            label: 'areaId',
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
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
            name: 'payMethodId',
            label: 'payMethodId',
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: 'categoryId',
            label: 'categoryId',
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
        },
        // onSearchChange: (searchText) => {
        //   console.log('onSearchChange', searchText);
        //   filterChoferes(searchText);
        // },
    };

    useEffect(() => {
        getAllTransactionsByUnitId(unitActive?.id, '')
            .then((transactionsResponse: any) => {
                console.log("transactionsResponse", transactionsResponse);
                if (transactionsResponse?.success) {
                    const transactionWithCategoryPayMethod = transactionsResponse.result.map((transactionItem: any) => (
                        {
                            ...transactionItem,
                            categoryName: transactionItem?.category?.name || 'Ajuste',
                            payMethodName: transactionItem.pay_method.method,
                            areaName: transactionItem?.category?.area?.name || 'Ajuste',
                            areaid: transactionItem?.category?.area?.id || 0,
                            key: transactionItem.id
                        }
                    ));
                    console.log("transactionWithCategoryPayMethod", transactionWithCategoryPayMethod);

                    setTransaction(transactionWithCategoryPayMethod);
                } else {
                    console.log("No se pudieron obtener las transaction");
                }
            })
            .catch((err: any) => console.log(err));
    }, [unitActive]);

    return (
        <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title='Transacciones'
                data={transaction}
                columns={columns}
                options={options}
            />
        </ThemeProvider >
    )
}

const mapDispatchToProps = {}

export default connect(
    (state: any) => ({
        unitActive: state.units.unitActive,
    }),
    mapDispatchToProps
)(TransactionTable);