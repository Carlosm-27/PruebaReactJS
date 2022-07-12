import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { useEffect } from "react";

function Users() {
  const [users, setUsers] = useState();
  const url = "https://jsonplaceholder.typicode.com/users";
  var columns = [
    {
        name: "Id",
        selector: (row) => row.id,
        sortable: true
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true
    },
    {
        name: "UserName",
        selector: (row) => row.username,
        sortable: true
    },
    {
        name: "City",
        selector: (row) => row.address.city,
        sortable: true
    },
    {
        name: "Zipcode",
        selector: (row) => row.address.zipcode,
        sortable: true
    },
    {
        name: "Phone",
        selector: (row) => row.phone,
        sortable: true
    },
    {
        name: "CompanyName",
        selector: (row) => row.company.name,
        sortable: true
    },
    {
        name: "Ubication",
        selector: (row) => row.address.geo.lat,
        sortable: true
    },


  ]

  const fecthApi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    setUsers(responseJSON);
  };

  useEffect(() => {
    fecthApi();
  }, []);

  return (
    <>
      <DataTable
        columns={columns}
        noHeader
        data={users}
        defaultSortField="id"
        defaultSortAsc={false}
        pagination
        highlightOnHover
      />


      
      <DataTable>
        <table className="mx-auto w-75 mt-5 table table-hover table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>City</th>
              <th>Zipcode</th>
              <th>Phone</th>
              <th>Company name</th>
              <th>Ubication</th>
            </tr>
          </thead>
          <tbody>
            {!users
              ? "Loading..."
              : users.map((elemento, index) => {
                  var ubi =
                    "https://www.google.com/maps/@" +
                    elemento.address.geo.lat +
                    ", " +
                    elemento.address.geo.lng;
                  return (
                    <tr key={index}>
                      <td>{elemento.id}</td>
                      <td>{elemento.name}</td>
                      <td>{elemento.username}</td>
                      <td>{elemento.address.city}</td>
                      <td>{elemento.address.zipcode}</td>
                      <td>{elemento.phone}</td>
                      <td>{elemento.company.name}</td>
                      <td>
                        <a href={ubi}>ubication</a>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}

export default Users;
