import { useMemo } from 'react';

export const columns = [
    {
        name: 'Id',
        selector: row => row.id,
    },
    {
        name: 'nombre',
        selector: row => row.name,
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


