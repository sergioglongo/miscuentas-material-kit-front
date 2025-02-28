export const currencyLista = [
    'Pesos',
    'Dolar',
    'Euro',
];

export const typesList = [
    { id: 'bank', name: 'Banco' },
    { id: 'electronic', name: 'Electrónica' },
    { id: 'cash', name: 'Efectivo' },
    { id: 'debt', name: 'Deuda' },
    { id: 'other', name: 'Otra' },
];

export const methodsList = [
    { id: 'debit', name: 'Debito' },
    { id: 'credit', name: 'Credito' },
    { id: 'cash', name: 'Efectivo' },
    { id: 'transfer', name: 'Transferencia' },
    { id: 'other', name: 'Otro' },
];

export const payMethodType = [
    { id: 'in', name: 'Ingreso' },
    { id: 'out', name: 'Gasto' },
    { id: 'adjustment', name: 'Ajuste' },
];

export const getTypeName = (type: any) => typesList.find((item: any) => item.id === type)?.name;

export const getCurrencyName = (currency: any) => currencyLista.find((item: any) => item === currency);

export const getMethodName = (method: any) => methodsList.find((item: any) => item.id === method)?.name;

export const getPayMethodTypeName = (type: any) => payMethodType.find((item: any) => item.id === type)?.name;