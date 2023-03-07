import React, {useState} from 'react';
import Swal from 'sweetalert2';
//import Select from 'react-select';
import { downloadCSV } from '../centersConfig';
import { columns } from './agenciesconfig';

import DataTable from 'react-data-table-component';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
export default function AgencyManagement(props) {
    const {dataAgency} = props;
    const [show, setShow] = useState(false);
    const [dataEditSelected, setDataEditSelected] = React.useState(null);
    const [edit, setEdit] = React.useState(false);
    const [register, setRegister] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const handleClose = () => {
      setShow(false);
    }
    
    const handleShow = () => setShow(true);

    /* Exportar a csv */
    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
	}, []);

    let Export = ({ onExport }) => <button className='btn btn-exportcsv' onClick={e => onExport(e.target.value)}>Export</button>;
    const actionsMemo = React.useMemo(() => <Export onExport={() => {downloadCSV(selectedRows)}} />, [selectedRows]);

    let firstCharge = dataAgency?.map(dat => {
        return {
            ...dat,
            edit: <button className="btn data-edit" onClick={()=>handlerEdit(dat.id)} ><i className="fa-regular fa-pen-to-square"></i></button>,
            remove: <button className="btn data-remove" onClick={()=>handlerDelete(dat.id)}><i className="fa-solid fa-trash"></i></button>,

        }
    })
    const [dataRows, setDataRows] = React.useState(firstCharge);
    const handlerEdit = (id) => {
      let itemForEdit = dataAgency.filter(item => item.id === id);
      setDataEditSelected(itemForEdit[0]);
      handleShow();
      
    }
    const handlerDelete = (id) => {
        Swal.fire({
          title: '¿Seguro que desea eliminar el centro seleccionado?',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('¡Eliminado!', '', 'success')
          } 
        })
        
    }
    return (
        <div className='agency-container'>
            <DataTable
                title='Gestión de agencias'
                columns={columns}
                data={dataRows}
                selectableRows
                //actions={actionsMemo}
                contextActions={actionsMemo}
                onSelectedRowsChange={handleRowSelected}
                pointerOnHover={true}
                pagination
                noDataComponent={'No se han encontrado resultados'}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{register ? 'Registro' : 'Edición'} de Agencias</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                        <Form.Label>Agencia</Form.Label>
                        {/* <Select options={agencies} defaultValue={agencySelected!=null ? agencySelected : null} onChange={(option)=>setFilterOptionSelected(option)}/> */}
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        >
                        <Form.Label>Nombre del centro</Form.Label>
                        <Form.Control type='text' value={dataEditSelected?.centry} onChange={(event)=>{}}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                
                <Button variant="primary" onClick={handleClose}>
                    {register ? 'Registrar centro':'Guardar Cambios'}
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
