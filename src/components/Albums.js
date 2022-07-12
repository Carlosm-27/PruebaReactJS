import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useEffect } from "react";

function Albums() {

    const [albums, SetAlbums] = useState();
    const url = "https://jsonplaceholder.typicode.com/albums";

    const fecthApi = async () =>{
        const response = await fetch(url);
        const responseJSON = await response.json();
        SetAlbums(responseJSON);
    }

    useEffect(() => {
        fecthApi();
      }, []);

    return(

        <>
        <table className="mx-auto w-75 mt-5 table table-hover table-striped">
            <thead>
                <tr>
                    <th>iserId</th>
                    <th>id</th>
                    <th>title</th>                </tr>
            </thead>
            <tbody>
                {
                    !albums ? "Loading..." : 
                    albums.map((elemento, index)=>{
                        return <tr key={index}>
                            <td>{elemento.userId}</td>
                            <td>{elemento.id}</td>
                            <td>{elemento.title}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        </>


    );
}

export default Albums;