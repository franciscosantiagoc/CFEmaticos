import React, {useState} from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select'
import { columns, data, dataAgency, downloadCSV } from './centersconfig';
import DataTable from 'react-data-table-component';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './CareCenter.scss';

export default function () {
    const [filterOptionSelected, setFilterOptionSelected] = React.useState(null);
    const [dataEditSelected, setDataEditSelected] = React.useState(null);
    
    const [selectedRows, setSelectedRows] = React.useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    
    let firstCharge = data?.map(dat => {
        return {
            ...dat,
            edit: <button className="btn data-edit" onClick={()=>handlerEdit(dat.id)} ><i className="fa-regular fa-pen-to-square"></i></button>,
            remove: <button className="btn data-remove" onClick={()=>handlerDelete(dat.id)}><i className="fa-solid fa-trash"></i></button>,

        }
    })
    const [dataRows, setDataRows] = React.useState(firstCharge);
    const handlerEdit = (id) => {
      //dataEditSelected
      let itemForEdit = data.filter(item => item.id === id);
      dataEditSelected(itemForEdit[0]);
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
    
    /* Filtrado */
    const handleFilterDataRows = (event) => {
        event.preventDefault();
        if(filterOptionSelected === null) return;
        if(filterOptionSelected?.value === 'all'){
            setDataRows(firstCharge)
        }else {
            let datafiltered = data?.filter(dataFilter => dataFilter.agency.toLowerCase() === filterOptionSelected.value.toLowerCase())
            setDataRows(datafiltered)
        }
    }

    /* Exportar a csv */
    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
	}, []);

    let Export = ({ onExport }) => <button className='btn btn-exportcsv' onClick={e => onExport(e.target.value)}>Export</button>;
    const actionsMemo = React.useMemo(() => <Export onExport={() => {downloadCSV(selectedRows)}} />, [selectedRows]);
    
    const agenciesFormat = dataAgency?.map(agency => {
        return {
            value: agency.name.toLowerCase(),
            label: agency.name
        }
    })

    const agencies = [
        {value: 'all', label: 'Todas las agencias', selected: true },
        ...agenciesFormat
    ]
    
  return (
    <div className='agencycontainer'>
        <h2>Centros de atención registrados</h2>
        <div className='top-block'>
            <form className='filterform left' onSubmit={handleFilterDataRows}>
                <Select options={agencies} onChange={(option)=>setFilterOptionSelected(option)}/>
                <button type='submit'>Procesar</button>
            </form>
            <div className='right'>
                <button className='btn btn-register'>Registrar nuevo</button>
                <button className='btn btn-gestion'>Gestionar agencias</button>
            </div>
        </div>
        
        <DataTable
            title='Centros de atención'
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
        

        <div className="modal" id="exampleModal" >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                        <input type="text" className="form-control" id="recipient-name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label">Message:</label>
                        <textarea className="form-control" id="message-text"></textarea>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Send message</button>
                </div>
                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
