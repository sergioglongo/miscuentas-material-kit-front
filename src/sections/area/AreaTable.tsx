import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { getAllAreas } from 'src/services/api/modules/area.module';
import { Box, Checkbox, Icon, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import AreaIcon from 'src/components/icon/AreaIcons';
import CommonIcon from 'src/components/icon/CommonIcons';
import MUIDataTable from 'mui-datatables';
import { setAreasList } from 'src/redux/slices/lists.slice';
import { grey } from 'src/theme/core';
import { getPayMethodTypeName } from 'src/utils/list-translate';

const AreaTable = ({ unitActive, setAreasListState, lists }: any) => {
    const isMdDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
    const rowsPerPage = 10;
    const router = useRouter();
    const onEdit = (areaData: any) => {
        const areaInitialData = {
            id: areaData[0],
            name: areaData[2],
            description: areaData[3],
            type: areaData[4],
            color: areaData[5],
            icon: areaData[6],
            is_active: areaData[7],
            deleted: areaData[8],
            unitId: areaData[9],
        }
        console.log("presionado editar desde ", areaInitialData);
        router.navigateState('/areaEdit', areaInitialData);
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
            label: 'Acciones',
            options: {
                filter: false,
                customBodyRender: (value: any, tableMeta: any) => (
                    <th style={{ width: '120px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Tooltip title="Ver detalle">
                            <IconButton aria-label="Ver" onClick={() => { }}>
                                <CommonIcon color='gray' iconName="View" />
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
                    <th key={1} style={{ width: '80px', padding: 0, height: '40px' }}>
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
                sortThirdClickReset: true,
                customHeadRender: (columnMeta: any, updateDirection: any, sortOrder: any) => (
                    <th key={2} style={{ textAlign: 'left' }} onClick={() => updateDirection(2)}>
                        {columnMeta.label} {sortOrder.name === 'name' && sortOrder.direction !== 'none' ? sortOrder.direction === 'asc' ? '⬆️' : '⬇️' : ''}
                    </th>
                ),
            }
        },
        {
            name: 'description',
            label: 'Descripción',
            options: {
                filter: false,
                customHeadRender: (columnMeta: any) => (
                    <th key={3} style={{ minWidth: '100px', textAlign: 'left' }}>
                        {columnMeta.label}
                    </th>
                ),
                // customBodyRender: (value: any) => (
                //     <div>{value}</div>
                // ),
            }
        },
        {
            name: 'type',
            label: 'Tipo',
            options: {
                filter: true,
                sort: false,
                sortThirdClickReset: true,
                customHeadRender: (columnMeta: any, updateDirection: any, sortOrder: any) => (
                    <th key={4} style={{ textAlign: 'center' }} onClick={() => updateDirection(4)}>
                        {columnMeta.label} {sortOrder.name === 'type' && sortOrder.direction !== 'none' ? sortOrder.direction === 'asc' ? '⬆️' : '⬇️' : ''}
                    </th>
                ),
                customBodyRender: (value: any, tableMeta: any) => () => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title={`${getPayMethodTypeName(value)}`}>
                            <Box>
                                {value === 'out'
                                    ?
                                    <CommonIcon iconName='CircleUp' styles={{ fontSize: '30', color: 'orange' }} />
                                    :
                                    <CommonIcon iconName='CircleDown' styles={{ fontSize: '30', color: 'green' }} />
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
            name: 'color',
            label: 'Icono',
            options: {
                filter: false,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th key={5} style={{}}>{columnMeta.label}</th>
                ), customBodyRender: (value: any, tableMeta: any) => () => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <AreaIcon iconName={tableMeta?.rowData[6]} styles={{ fontSize: '36', display: 'flex', color: value }} />
                    </th>
                    // <div
                    //     key={value}
                    //     className={styles.pickerSwatches}
                    //     style={{ background: value, border: `3px solid ${value}`, borderRadius: '50%', width: '30px', height: '30px', marginRight: '20px' }}
                    // />
                ),
            }
        },
        {
            name: 'icon',
            label: 'Icon',
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: 'is_active',
            label: 'Activo',
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th key={7} style={{}}>{columnMeta.label}</th>
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
            name: 'is_active',
            label: 'Is Active',
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: 'unitId',
            label: 'Unit Id',
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
        searchAlwaysOpen: !isMdDown,
        searchPlaceholder: 'Busque por nombre o descripción',
        caseSensitive: false,
        viewColumns: false,
        print: false,
        search: true,
        download: false,
        pagination: true,
        rowsPerPageOptions: [10, 15, 50],
        rowsPerPage,
        customToolbar: () => {

        },

        sortOrder: {
            name: 'name',
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
    useEffect(() => {
        if (lists.areasList.length === 0 && !loadingRef.current) {
            // setAreaQueryLoad(true);
            loadingRef.current = true;
            getAllAreas(`?unitId=${unitActive?.id}`)
                .then((areasResponse: any) => {
                    if (areasResponse?.success) {
                        setAreasListState(areasResponse.result);
                    } else {
                        console.log("No se pudieron obtener las areas");
                    }
                })
                .catch((err: any) => console.log(err))
                .finally(() => { loadingRef.current = false });
        }
    }, [unitActive, setAreasListState, lists.areasList]);


    return (
        <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title='Areas de la unidad'
                data={lists.areasList}
                columns={columns}
                options={options}
            />
        </ThemeProvider >
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    setAreasListState: bindActionCreators(setAreasList, dispatch),
})

export default connect(
    (state: any) => ({
        unitActive: state.units.unitActive,
        lists: state.lists
    }),
    mapDispatchToProps
)(AreaTable);