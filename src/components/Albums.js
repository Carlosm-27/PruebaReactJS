import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export function Albums() {
  //useState para el modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    var urlFotos =
      "https://jsonplaceholder.typicode.com/albums/" + id + "/photos";

    const fecthApiPhotos = async () => {
      const response = await fetch(urlFotos);
      const responseJSON = await response.json();
      setPhotos(responseJSON);
      console.log(responseJSON);
    };

    fecthApiPhotos();
    setShow(true);
  };

  //API - list photos
  const [photos, setPhotos] = useState();

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
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>PHOTOS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OwlCarousel className="owl-theme" loop margin={10} nav>
            <div class="item">
              <h4>1</h4>
            </div>
            <div class="item">
              <h4>2</h4>
            </div>
            <div class="item">
              <h4>3</h4>
            </div>
            <div class="item">
              <h4>4</h4>
            </div>
            <div class="item">
              <h4>5</h4>
            </div>
            <div class="item">
              <h4>6</h4>
            </div>
            <div class="item">
              <h4>7</h4>
            </div>
            <div class="item">
              <h4>8</h4>
            </div>
            <div class="item">
              <h4>9</h4>
            </div>
            <div class="item">
              <h4>10</h4>
            </div>
            <div class="item">
              <h4>11</h4>
            </div>
            <div class="item">
              <h4>12</h4>
            </div>
          </OwlCarousel>
          ;{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
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
