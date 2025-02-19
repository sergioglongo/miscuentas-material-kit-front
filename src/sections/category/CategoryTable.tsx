import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import MUIDataTable from 'mui-datatables';
import { getAllCategoriesBody } from 'src/services/api/modules/category.module';
import CategoryIcon from 'src/components/icon/CategoryIcon';
import CommonIcon from 'src/components/icon/CommonIcons';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setAreasList, setCategoriesList } from 'src/redux/slices/lists.slice';
import { grey } from '@mui/material/colors';

const CategoryTable = ({ unitActive, lists, setCategoriesListState }: any) => {
    const [categories, setCategories] = useState([]);
    const rowsPerPage = 10;
    const theme = useTheme();
    const router = useRouter();
    const onEdit = (categoryData: any) => {
        const categoryInitialData = {
            id: categoryData[0],
            name: categoryData[2],
            description: categoryData[3],
            type: categoryData[4],
            color: categoryData[5],
            icon: categoryData[6],
            is_active: categoryData[7],
            deleted: categoryData[8],
            areaId: categoryData[10],
            areaColor: categoryData[11],
        }
        console.log("presionado editar desde ", categoryInitialData);
        router.navigateState('/categoryEdit', categoryInitialData);
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
                    <th style={{ width: 120, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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
                sort: true,
                sortThirdClickReset: true,
                customHeadRender: (columnMeta: any, updateDirection:any, sortOrder:any) => (
                    <th key={2} style={{ textAlign: 'left' }} onClick={() => updateDirection(2)}>
                        {columnMeta.label } {sortOrder.name === 'name' && sortOrder.direction !== 'none' ? sortOrder.direction === 'asc' ? '⬆️' : '⬇️' : ''}
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
                customHeadRender: (columnMeta: any) => (
                    <th key={4} style={{}}>
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
            name: 'color',
            label: 'Icono',
            options: {
                filter: false,
                sort: false,
                customHeadRender: (columnMeta: any) => (
                    <th key={5} style={{}}>
                        {columnMeta.label}
                    </th>
                ), customBodyRender: (value: any, tableMeta: any) => () => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <CategoryIcon iconName={tableMeta?.rowData[6]} styles={{ fontSize: '30', display: 'flex', color: value }} />
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
                    <th key={7} style={{}}>
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
            name: 'area',
            label: 'Area',
            options: {
                filter: true,
                sort: true,
                sortThirdClickReset: true,
                customHeadRender: (columnMeta: any, updateDirection:any, sortOrder:any) => (
                    <th key={9} style={{ textAlign: 'center' }} onClick={() => updateDirection(9)}>
                        {columnMeta.label } {sortOrder.name === 'area' && sortOrder.direction !== 'none' ? sortOrder.direction === 'asc' ? '⬆️' : '⬇️' : ''}
                    </th>
                ),
                
                customBodyRender: (value: any) => (
                    <th style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        {value}
                    </th>
                ),
            }
        },
        {
            name: 'areaId',
            label: 'Area Id',
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: 'areaColor',
            label: 'Area Color',
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
        },
        // onSearchChange: (searchText) => {
        //   console.log('onSearchChange', searchText);
        //   filterChoferes(searchText);
        // },
    };

    const loadingRef = useRef(false);

    useEffect(() => {
        if (lists.categoriesList.length === 0 && !loadingRef.current) {
            const data = {
                unitId: unitActive?.id,
                deleted: false
            }
            getAllCategoriesBody(data)
                .then((categoriesResponse: any) => {
                    if (categoriesResponse?.success) {
                        const categoriesWithArea = categoriesResponse.result.map((category: any) => ({ ...category, area: category.area.name, type: category.area.type, areaColor: category.area.color }));
                        setCategoriesListState(categoriesWithArea);
                    } else {
                        console.log("No se pudieron obtener las categories");
                    }
                })
                .catch((err: any) => console.log(err));
        }
    }, [unitActive, lists.categoriesList, setCategoriesListState]);

    return (
        <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title='Categorias'
                data={lists.categoriesList}
                columns={columns}
                options={options}
            />
        </ThemeProvider >
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    setCategoriesListState: bindActionCreators(setCategoriesList, dispatch),
})

export default connect(
    (state: any) => ({
        unitActive: state.units.unitActive,
        lists: state.lists
    }),
    mapDispatchToProps
)(CategoryTable);