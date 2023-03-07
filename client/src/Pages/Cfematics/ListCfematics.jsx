import React, {useState, useEffect} from 'react';
import { useSearchParams , useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { data, columns, dataCareCentries } from './cfematicsConfig';
import {  dataAgency, downloadCSV } from '../CareCenter/centersconfig';
import DataTable from 'react-data-table-component';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './ListCfematics.scss';

export default function ListCfematics() {
    let [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    //console.log(location)
  
    const [edit, setEdit] = React.useState(false);
    const [register, setRegister] = React.useState(false);
    const [agencySelected, setAgencySelected] = React.useState(null);
    const [filterOptionSelected, setFilterOptionSelected] = React.useState(null);
    const [dataEditSelected, setDataEditSelected] = React.useState(null);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [show, setShow] = useState(false);
  
    const handleNewCenter = () => {
      setRegister(true);
      setShow(true);
    };
  
    const handleClose = () => {
      setDataEditSelected(null);
      setEdit(null);
      setRegister(null);
      setShow(false);
    };
    const handleShow = () => setShow(true);
  
    let firstCharge = data?.map((dat) => {
      return {
        ...dat,
        sortable: true,
        edit: (
          <button className="btn data-edit" onClick={() => handlerEdit(dat.id)}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        ),
        remove: (
          <button
            className="btn data-remove"
            onClick={() => handlerDelete(dat.id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        ),
      };
    });
    const [dataRows, setDataRows] = React.useState(firstCharge);
    const handlerEdit = (id) => {
      let itemForEdit = data.filter((item) => item.id === id);
      setDataEditSelected(itemForEdit[0]);
  
      setAgencySelected(
        agencies.filter((item) => item.label === itemForEdit[0].agency)[0]
      );
      handleShow();
    };
    const handlerDelete = (id) => {
      Swal.fire({
        title: "¿Seguro que desea eliminar el centro seleccionado?",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("¡Eliminado!", "", "success");
        }
      });
    };
  
    /* Filtrado */
    const handleFilterDataRows = (event) => {
      event.preventDefault();
      if (filterOptionSelected === null) return;
      if (filterOptionSelected?.value === "all") {
        setDataRows(firstCharge);
      } else {
        let datafiltered = data?.filter(
          (dataFilter) =>
            dataFilter.agency.toLowerCase() ===
            filterOptionSelected.value.toLowerCase()
        );
        setDataRows(datafiltered);
      }
    };
  
    /* Exportar a csv */
    const handleRowSelected = React.useCallback((state) => {
      setSelectedRows(state.selectedRows);
    }, []);
  
    let Export = ({ onExport }) => (
      <button
        className="btn btn-exportcsv"
        onClick={(e) => onExport(e.target.value)}
      >
        Export
      </button>
    );
    const actionsMemo = React.useMemo(
      () => (
        <Export
          onExport={() => {
            downloadCSV(selectedRows);
          }}
        />
      ),
      [selectedRows]
    );
  
    const agenciesFormat = dataAgency?.map((agency) => {
      return {
        id: agency.id,
        value: agency.name.toLowerCase(),
        label: agency.name,
      };
    });

    const centriesFormat = dataCareCentries?.map((centry) => {
        return {
          id: centry.id,
          value: centry.centry.toLowerCase(),
          label: centry.centry,
        };
      });
  
    const agencies = [
      { value: "all", label: "Todas las agencias", selected: true },
      ...agenciesFormat,
    ];

    const careCentries = [
        { value: "", label: "Seleccione un centro", selected: true },
        ...centriesFormat,
      ];
  
    useEffect(() => {
      if (location.search.includes("nuevo=true")) {
        handleNewCenter();
      }
    }, [location]);
  
    return (
      <div className="agencycontainer">
        <h2>CFEmáticos registrados</h2>
        <div className="top-block">
          {/* <form className="filterform left" onSubmit={handleFilterDataRows}>
            <Select
              options={agencies}
              defaultValue
              onChange={(option) => setFilterOptionSelected(option)}
            />
            <button type="submit">Procesar</button>
          </form> */}
          <div className="right">
            <button
              className="btn btn-register"
              onClick={() => {
                setRegister(true);
                setEdit(false);
                handleShow(true);
              }}
            >
              Registrar nuevo
            </button>
            
          </div>
        </div>
  
        <DataTable
          title="CFEmáticos"
          columns={columns}
          data={dataRows}
          selectableRows
          contextActions={actionsMemo}
          onSelectedRowsChange={handleRowSelected}
          pointerOnHover={true}
          pagination    
        />
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {register ? "Registro" : "Edición"} de Centros
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Agencia</Form.Label>
                <Select
                  options={agencies}
                  defaultValue={agencySelected != null ? agencySelected : null}
                  onChange={(option) => setFilterOptionSelected(option)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Agencia</Form.Label>
                <Select
                  options={careCentries}
                  defaultValue={agencySelected != null ? agencySelected : null}
                  onChange={(option) => setFilterOptionSelected(option)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Identificador del cfematico</Form.Label>
                <Form.Control
                  type="text"
                  value={dataEditSelected?.cfematic}
                  onChange={(event) => {}}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            <Button variant="primary" onClick={handleClose}>
              {register ? "Registrar centro" : "Guardar Cambios"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}
