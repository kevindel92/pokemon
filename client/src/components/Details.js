import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getDetails } from "../actions/index";

export default function Details() {
    let dispatch = useDispatch();
    let pkmDetail = useSelector((state) => state.pokemon);
    const { id } = useParams();
    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]);
    return (
        <>
            <div>
                <Link to="/home">
                    <button>Return to home</button>
                </Link>
                {pkmDetail.name ? (
                    <div>
                        <div>
                            <h1>{pkmDetail.name}</h1>
                        </div>
                        <img src={pkmDetail.image} alt= "img not found"></img>
                        <div>
                            <h2>Stats: </h2>
                            <ul>
                                <li>Types: {pkmDetail.type}</li>
                                <li>Hp: {pkmDetail.hp}</li>
                                <li>Attack: {pkmDetail.attack}</li>
                                <li>Defense: {pkmDetail.defense}</li>
                                <li>Speed: {pkmDetail.speed}</li>
                                <li>Height: {pkmDetail.height}</li>
                                <li>Weight: {pkmDetail.weight}</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </>
    );
};