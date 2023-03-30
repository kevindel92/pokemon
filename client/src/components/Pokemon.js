import React from "react";
import { Link } from "react-router-dom";

export default function Pokemon ({ id, name, type, image }) {
    return (
        <>
            <div>
                <h3>{name.toUpperCase()}</h3>
                <img src={image} alt="img not found"></img>
                <h4>Types: {type}</h4>
                <div>
                    <Link to={`/home/details/${id}`}>
                        <button>See more details</button>
                    </Link>
                </div>
            </div>
        </>
    );
};