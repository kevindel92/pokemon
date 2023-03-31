import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../actions";

export default function SearchBar() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value.toLowerCase());
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (name.length < 1 || name[0] === "" || typeof name !== "string") {
            alert("Please, enter a valid name");
        } else {
            dispatch(searchByName(name));
            setName("");
        }
    }
    return (
        <div className="">
            <form onSubmit={(e) => handleSubmit(e)}>
                <input value={name} className="" type="text" placeholder="Search Pokemon" onChange={(e) => handleChange(e)}></input>
                    <button className="" type="submit">Search</button>
            </form>
        </div>
    );
};