import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";

export function Albums() {
  //useState para el modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //variables para mostrar listado de fotos
  const [photos, setPhotos] = useState();
  
  // variables para mostrar listado de albums
  const [albums, setAlbums] = useState();
  const [albums2, setAlbums2] = useState();
  const url = "https://jsonplaceholder.typicode.com/albums";

  //variables para nombre de usuario y nombre 
  const [nameAlbum, setNameAlbum] = useState();
  const [nameUser, setNameUser] = useState();

  //Buscador para el listado de albums
  const handleShearch = (e)=>{
    var shearchWord = e.target.value
    var result = albums.filter((element)=>{
      if (element.id == shearchWord || element.title == shearchWord){
        return element;
      }
    })

    if (shearchWord == ""){
      setAlbums2(albums);
    }else{
      setAlbums2(result);
    }
    
  }

  //Función para mostrar todas las fotos del album seleccionado
  const handleShow = (id, nameAlbum, idUser) => {
    var urlPhotos =
      "https://jsonplaceholder.typicode.com/albums/" + id + "/photos";

    var urlUsers = "https://jsonplaceholder.typicode.com/users/" + idUser;

    //Consumo de API para las fotos
    const fecthApiPhotos = async () => {
      const response = await fetch(urlPhotos);
      const responseJSON = await response.json();
      setPhotos(responseJSON);
    };

    //Consumo de API para capturar el nombre de usuario
    const fecthApiUsers = async () => {
      const response = await fetch(urlUsers);
      const responseJSON = await response.json();
      setNameUser(responseJSON.username);
    };

    setNameAlbum(nameAlbum);
    fecthApiPhotos();
    fecthApiUsers();
    setShow(true);
  };


  /* Columnas que se mostraran en el datatable */
  var columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Acciones",
      selector: (row) => {
        return <button
        className="btn btn-info btn-outline text-white"
        onClick={() =>
          handleShow(row.id, row.title, row.userId)
        }
      >
        show photos
      </button>

      },
      sortable: true,
    },

  ];

  //función para mostrar el listado completo de los albums
  const fecthApi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    setAlbums(responseJSON);
  };

  useEffect(() => {
    fecthApi();
  }, []);




  return (
    <>

    {/* INICIO MODAL PARA MOSTRAR FOTOS DE ALBUM SELECCIONADO */}
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-100w"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            "{nameAlbum}" by {nameUser}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {!photos ? (
              <span>Alerta</span>
            ) : (
              photos.map((element, index) => {
                return (
                  <Col>
                    <Card
                      style={{ width: "18rem", marginTop: "30px" }}
                      key={index}
                    >
                      <Card.Img variant="top" src={element.thumbnailUrl} />
                      <Card.Body>
                        <Card.Title className="font-weight-bolder">
                          Title : {element.title}
                        </Card.Title>
                        <Card.Text></Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* FIN MODAL PARA MOSTRAR FOTOS DE ALBUM SELECCIONADO */}


      <Row>
        <Col sm="12" md="6" lg="3">
            <input id="filter" className="form-control float-right m-3" placeholder="Shearch" onChange={(e)=>handleShearch(e)}></input>
        </Col>
      </Row>

      <DataTable
        columns={columns}
        title="List albums"
        data={!albums2 ? albums : albums2}
        defaultSortField="id"
        defaultSortAsc={false}
        pagination
        highlightOnHover
      />

    </>
  );
}
