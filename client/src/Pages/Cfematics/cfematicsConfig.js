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
        name: 'Cajero',
        selector: row => row.cfematic,
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

/* export const dataAgency = [
    
    {id: 'X', name: 'Salina Cruz'},
    {id: 'A', name: 'Salinacruz'},
    {id: 'B', name: 'Juchitán'}
]; */

export const dataCareCentries = [
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

export const data = [
    {
        id: '0Q6',
        agency: 'Salina Cruz',
        agencyId: 'X',
        centry: 'CAC',
        cfematic: '0Q6'
    },
    {
        id: '0Q7',
        agency: 'Salina Cruz',
        agencyId: 'X',
        centry: 'Centro',
        cfematic: '0Q7'
    },
    {
        id: '0Q1',
        agency: 'Juchitán',
        agencyId: 'B',
        centry: 'Centro',
        cfematic: '0Q1'
    },
    {
        id: '0Q2',
        agency: 'Juchitán',
        agencyId: 'B',
        centry: 'Centro',
        cfematic: '0Q2'
    },
    {
        id: 'OP9',
        agency: 'Tehuantepect',
        agencyId: 'B',
        centry: 'CAC',
        cfematic: 'OP9'
    },
    
]
