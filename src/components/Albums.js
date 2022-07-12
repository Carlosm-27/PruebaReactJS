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

  const handleShow = (id) => {
    var urlFotos =
      "https://jsonplaceholder.typicode.com/albums/" + id + "/photos";

    const fecthApiPhotos = async () => {
      const response = await fetch(urlFotos);
      const responseJSON = await response.json();
      setPhotos(responseJSON);
      console.log(photos);
    };

    fecthApiPhotos();
    setShow(true);
  };

  //API - list albums
  const [albums, SetAlbums] = useState();
  const url = "https://jsonplaceholder.typicode.com/albums";

  const fecthApi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    SetAlbums(responseJSON);
  };

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
          <Modal.Title>PHOTOS</Modal.Title>
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
                      onClick={() => handleShow(elemento.id)}
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
