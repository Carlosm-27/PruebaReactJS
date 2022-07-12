import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from "react-data-table-component";
import { useState } from "react";
import { useEffect } from "react";

function Users() {

    const [users, SetUsers] = useState();
    const url = "https://jsonplaceholder.typicode.com/users";

    const fecthApi = async () =>{
        const response = await fetch(url);
        const responseJSON = await response.json();
        SetUsers(responseJSON);
    }

    useEffect(() => {
        fecthApi();
      }, []);

    return(

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
                {
                    !users ? "Loading..." : 
                    users.map((elemento, index)=>{
                        var ubi = "https://www.google.com/maps/@" + elemento.address.geo.lat + ", " + elemento.address.geo.lng;
                        return <tr key={index}>
                            <td>{elemento.id}</td>
                            <td>{elemento.name}</td>
                            <td>{elemento.username}</td>
                            <td>{elemento.address.city}</td>
                            <td>{elemento.address.zipcode}</td>
                            <td>{elemento.phone}</td>
                            <td>{elemento.company.name}</td>
                            <td><a href={ubi}>ubication</a></td>

                        </tr>
                    })
                }
            </tbody>
        </table>
        </DataTable>


    );
}

export default Users;