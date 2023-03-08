import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import Select from "react-select";
import { data, columns, dataCareCentries } from "./ordersConfig";
import { dataAgency, downloadCSV } from "../CareCenter/centersconfig";
import DataTable from "react-data-table-component";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./Orders.scss";

export default function Orders() {
  //console.log(location)

  const [edit, setEdit] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [agencySelected, setAgencySelected] = React.useState(null);
  const [filterOptionSelected, setFilterOptionSelected] = React.useState(null);
  const [dataEditSelected, setDataEditSelected] = React.useState(null);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [dataTableFilter, setDataTableFilter] = React.useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setDataEditSelected(null);
    setEdit(null);
    setRegister(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  let firstCharge = data.data?.map((dat) => {
    //console.log(dat);
    let perOperation = (100 / data.count) * dat.ordersCount,
      percentage = perOperation.toFixed(2);
    //percentage = arrayper[0] + '.' + arrayper[1].slice(0,2);

    return {
      ...dat,
      sortable: true,
      percentage: percentage,
      view: (
        <button
          className="btn data-view"
          onClick={() => alert("No disponible por el momento")}
        >
          <i className="fa-solid fa-eye"></i>
        </button>
      ),
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
  /* firstCharge = [
      ...firstCharge,

      {
        cfematic: <h3>Total:</h3>,
        ordersCount: data.count,
        percentage: '100%'
      }
    ] */
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
    //...centriesFormat,
  ];

  const subHeaderComponentMemo = React.useMemo(() => {
    /* const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    }; */

    return (
     /*  <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      /> */
      <input placeholder="Buscar orden"/>
    );
  }, []);

  return (
    <div className="agencycontainer">
      <h2>CFEmáticos registrados</h2>
      <div className="top-block">
        <form className="filterform left" onSubmit={handleFilterDataRows}>
          <label>Agencia</label>
          <Select
            options={agencies}
            defaultValue
            onChange={(option) => setFilterOptionSelected(option)}
          />
          <label>Centro</label>
          <Select
            options={agencies}
            defaultValue
            onChange={(option) => setFilterOptionSelected(option)}
          />
          <label>cfematico</label>
          <Select
            options={agencies}
            defaultValue
            onChange={(option) => setFilterOptionSelected(option)}
          />
          <Form.Label>Desde</Form.Label>
          <Form.Control type="date" onChange={(event) => {}} />
          <Form.Label>Hata</Form.Label>
          <Form.Control type="date" onChange={(event) => {}} />
          <button type="submit">Procesar</button>
        </form>
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
      <div className="filter-data-table-container">
        <input type="text" placeholder="Ingrese el texto a buscar" onChange={(event)=>{
           /* if(event.target.value){
              console.log(event.target.value)
              let datafiltered = dataRows.filter(row=> {
                console.log('agency', row.agency)
                console.log(row.agency.toString()) 
                debugger
                return row.agency.toLowerCase() == event.target.value.toLowerCase;
                //|| row.centry.toLowerCase == event.target.value.toLowerCase || row.ordersCount == event.target.value.toLowerCase || row.cfematic.toLowerCase == event.target.value.toLowerCase || row.percentage == event.target.value.toLowerCase
              })
              console.log('datafiltered', datafiltered)
           }else{
            setDataTableFilter(null)
           } */
        }}/>
      </div>
      <DataTable
        title="CFEmáticos"
        columns={columns}
        data={dataTableFilter? dataTableFilter :dataRows}
        selectableRows
        contextActions={actionsMemo}
        onSelectedRowsChange={handleRowSelected}
        pointerOnHover={true}
        pagination
        subHeaderComponent={subHeaderComponentMemo}
      />

      <p className="data-total">
        <b>Total de ordenes: </b>
        {data?.count}
      </p>

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
                //defaultValue={cfematicSelected != null ? cfematicSelected : null}
                onChange={(option) => setFilterOptionSelected(option)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Agencia</Form.Label>
              <Select
                options={careCentries}
                //defaultValue={cfematicSelected != null ? cfematicSelected : null}
                onChange={(option) => setFilterOptionSelected(option)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cfematico</Form.Label>
              <Form.Control
                type="text"
                value={dataEditSelected?.cfematic}
                onChange={(event) => {}}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Archivo</Form.Label>
              <Form.Control
                type="file"
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
