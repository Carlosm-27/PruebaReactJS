import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";


function Users() {
  //variables para mostrar el listado de usuarios
  const [users, setUsers] = useState();
  const [users2, setUsers2] = useState();
  const url = "https://jsonplaceholder.typicode.com/users";

  //Evento para buscar un usuario en especifico
  function handleShearch(e){
    var shearchWord = e.target.val;
    var result = users.filter((element)=>{
      if (element.username == shearchWord || element.name == shearchWord || 
        element.id == shearchWord || element.address.city == shearchWord ||
        element.address.zipcode == shearchWord || element.company.name == shearchWord ||
        element.phone == shearchWord){
        return element;
      }
    })

    if (shearchWord == ""){
      setUsers2(users);
    }else{
      setUsers2(result);
    }
    
  }

  //Array que contiene las columnas (encabezados) y registros - para mostrar la datatable
  var columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "UserName",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.address.city,
      sortable: true,
    },
    {
      name: "Zipcode",
      selector: (row) => row.address.zipcode,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "CompanyName",
      selector: (row) => row.company.name,
      sortable: true,
    },
    {
      name: "Ubication",
      selector: (row) => {
        var ubi =
          "https://www.google.com/maps/@" +
          row.address.geo.lat +
          ", " +
          row.address.geo.lng;
        return <a href={ubi}>Ubication</a>;
      },
      sortable: true,
    },
  ];

  //Función para mostrar el listado de usuarios completo
  const fecthApi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    setUsers(responseJSON);
  };

  useEffect(() => {
    fecthApi();
  }, []);

  return (
    <div className="">
      <Row>
        <Col sm="12" md="6" lg="3">
            <input id="filter" className="form-control float-right m-3" placeholder="Shearch" onChange={(e)=>handleShearch(e)}></input>
        </Col>
      </Row>

      <DataTable
        columns={columns}
        title="List user"
        data={!users2 ? users : users2}
        defaultSortField="id"
        defaultSortAsc={false}
        pagination
        highlightOnHover
      />
    </div>
  );
}

export default Users;
