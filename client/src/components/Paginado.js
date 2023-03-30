import React from "react";

export default function Paginado({ pkmPerPage, pagePkm, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(pagePkm / pkmPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <h4>Page: </h4>
            <nav>
                <ul>{pageNumbers && pageNumbers.map((number) => (
                    <button key={number} onClick={() => paginado(number)}></button>
                ))}</ul>
            </nav>
        </div>
    );
};