import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { Row, Col} from "react-bootstrap";

export function Albums() {
  //useState para el modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //API - list photos
  const [photos, setPhotos] = useState();

  
  const handleShow = (id, nameAlbum, idUser) => {
      var urlPhotos =
      "https://jsonplaceholder.typicode.com/albums/" + id + "/photos";

      var urlUsers = "https://jsonplaceholder.typicode.com/users/"+idUser
      
      const fecthApiPhotos = async () => {
        const response = await fetch(urlPhotos);
        const responseJSON = await response.json();
        setPhotos(responseJSON);
      };

      const fecthApiUsers = async () => {
        const response = await fetch(urlUsers);
        const responseJSON = await response.json();
        console.log(responseJSON);
        setNameUser(responseJSON.username);
      };



      setNameAlbum(nameAlbum);
      fecthApiPhotos();
      fecthApiUsers();
      setShow(true);
    };
    
  //API - list albums
  const [albums, setAlbums] = useState();
  const url = "https://jsonplaceholder.typicode.com/albums";

  const fecthApi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    setAlbums(responseJSON);
  };

  const [nameAlbum, setNameAlbum] = useState();
  const [nameUser, setNameUser] = useState();

  useEffect(() => {
    fecthApi();
  }, []);

  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-100w"

      >
        <Modal.Header closeButton>
          <Modal.Title>"{nameAlbum }"  by {nameUser}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {!photos ? (
              <span>Alerta</span>
            ) : (
              photos.map((element, index) => {
                return (
                  <Col>
                    <Card style={{ width: "18rem", marginTop: "30px" }} key={index}>
                      <Card.Img variant="top" src={element.thumbnailUrl} />
                      <Card.Body>
                        <Card.Title className="font-weight-bolder">Title : {element.title}</Card.Title>
                        <Card.Text>
                        </Card.Text>
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

      <table className="mx-auto w-75 mt-5 table table-hover table-striped ">
        <thead>
          <tr>
            <th>iserId</th>
            <th>id</th>
            <th>title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!albums ? (
            <tr>
              {" "}
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            albums.map((elemento, index) => {
              return (
                <tr key={index}>
                  <td>{elemento.userId}</td>
                  <td>{elemento.id}</td>
                  <td>{elemento.title}</td>
                  <td>
                    <button
                      className="btn btn-info btn-outline text-white"
                      onClick={() => handleShow(elemento.id, elemento.title, elemento.userId)}
                    >
                      show photos
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
}
