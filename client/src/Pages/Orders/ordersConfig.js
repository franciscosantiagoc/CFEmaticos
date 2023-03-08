
export const columns = [
    {
        name: 'Agencia',
        selector: row => row.agency,
        sortable: true,
		sortField: 'agency'
    },
    {
        name: 'Centro',
        selector: row => row.centry,
        sortable: true,
		sortField: 'centry'
    },
    {
        name: 'Cajero',
        selector: row => row.cfematic,
        sortable: true,
		sortField: 'cfematic'
    },
    {
        name: 'Ordenes',
        selector: row => row.ordersCount,
        sortable: true,
		sortField: 'ordersCount'
    },
    {
        name: '%',
        selector: row => row.percentage,
        sortable: true,
		sortField: 'percentage'
    },
    {
        name: 'Ver',
        selector: row => row.view,
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

export const dataAgency = [
    
    {id: 'X', name: 'Salina Cruz'},
    {id: 'A', name: 'Salinacruz'},
    {id: 'B', name: 'Juchitán'}
];

export const dataCfematics = [
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

export const data = {
    data: [{
        id: '1',
        agency: 'Salina Cruz',
        centry: 'CAC',
        ordersCount: 5,
        cfematic: '0Q8',
        file: 'https://inaoe.repositorioinstitucional.mx/jspui/bitstream/1009/1346/1/EscamillaCaCA.pdf'
    },
    {
        id: '2',
        agency: 'Tehuantepec',
        centry: 'CAC',
        ordersCount: 10,
        cfematic: '0P8',
        file: 'https://inaoe.repositorioinstitucional.mx/jspui/bitstream/1009/1346/1/EscamillaCaCA.pdf'
    },
    {
        id: '3',
        agency: 'Juchitán centro',
        centry: 'CAC',
        ordersCount: 2,
        cfematic: '0Q1',
        file: 'https://inaoe.repositorioinstitucional.mx/jspui/bitstream/1009/1346/1/EscamillaCaCA.pdf'
    }],
    count: 17
}
