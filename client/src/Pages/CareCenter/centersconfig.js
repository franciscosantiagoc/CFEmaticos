import { useMemo } from 'react';

export const columns = [
    {
        name: 'Agencia',
        selector: row => row.agency,
    },
    {
        name: 'Centro',
        selector: row => row.centry,
    },
    {
        name: 'Editar',
        selector: row => row.edit,
    },
    {
        name: 'Eliminar',
        selector: row => row.remove,
    },
];

export const data = [
    {
        id: 1,
        agency: 'Salina Cruz',
        agencyId: 'X',
        centry: 'CAC',
    },
    {
        id: 2,
        agency: 'Salinacruz',
        agencyId: 'A',
        centry: 'Centro',
    },
    {
        id: 3,
        agency: 'Juchitán',
        agencyId: 'B',
        centry: 'Centro',
    },
]

export const dataAgency = [
    
    {id: 'X', name: 'Salina Cruz'},
    {id: 'A', name: 'Salinacruz'},
    {id: 'B', name: 'Juchitán'}
];

function convertArrayOfObjectsToCSV(array) {
    console.log('Entrada array a csv' )  

    let result;
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);
    
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    
    array.forEach(item => {
    	let ctr = 0;
    	keys.forEach(key => {
        	if (ctr > 0) result += columnDelimiter;
            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}
    
export function downloadCSV(array) {
    console.log('array', array)
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);

    if (csv == null) return;
        const filename = 'export.csv';
    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}
