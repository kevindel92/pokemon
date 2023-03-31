import React from "react";
import "../styles/Paginado.css"
export default function Paginado({ pkmPerPage, pagePkm, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(pagePkm / pkmPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="paginado">
            <h4 className="page">Page: </h4>
            <nav>
                <ul className="pag">{pageNumbers && pageNumbers.map((number) => (
                    <button className="page-btn" key={number} onClick={() => paginado(number)}></button>
                ))}</ul>
            </nav>
        </div>
    );
};