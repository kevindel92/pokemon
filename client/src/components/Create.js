import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../actions/index";
import { Link, useHistory } from "react-router-dom";
import { createPokemon } from "../actions/index";

export default function Create() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.allTypes);
    const pokemons = useSelector((state) => state.allPokemons);
    const history = useHistory();
    const [input, setInput] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        type: []
    });
    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value.toLowerCase()
        });
        setFormErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value
            })
        );
    };
    const handleSelect = (e) => {
        setInput({
            ...input,
            type: [...new Set([...input.type, e.target.value])]
        });
        setFormErrors(
            validate({
                ...input,
                type: [...input.type, e.target.value]
            })
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let error = Object.keys(validate(input));
        if (error.length !== 0 || !input.type.length) {
            alert("Please, fill in the fields correctly");
            return;
        } else {
            dispatch(createPokemon(input));
            alert("Your pokemon has been created");
            setInput({
                name: "",
                image: "",
                hp: "",
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weight: "",
                type: []
            });
            history.push("/home");
        }
    };
    const handleDeleteT = (e) => {
        setInput({
            ...input,
            type: []
        });
    };
    const [formErrors, setFormErrors] = useState({});
    function validateName(str) {
        if (!/^[a-zA-Z\s]*$/.test(input.name)) return true;
        if (str.length < 1) return true;
        if (str[0] === "") return true;
    };
    function validateDuplicateName(str) {
        let filtro = pokemons.filter((p) => p.name === str);
        if (filtro.length) {
            return true;
        }
    };
    function validateImg(str) {
        if (typeof str !== "string") return true;
    };
    function validateTypes(input) {
        if (input.length < 1) return true;
        if (input.length > 2) return true;
    };
    function validateStats(num) {
        if (isNaN(num)) return true;
        if (num < 1 || num > 999) return true;
    };

    function validate(data) {
        let errors = {};
        if (validateName(data.name)) errors.name = "Invalid name";
        if (validateImg(data.image)) errors.image = "Invalid imagee url";
        if (validateTypes(data.type)) errors.type = "Select types: min 1, max 2";
        if (validateStats(data.hp)) errors.hp = "Min value: 0, max value: 999";
        if (validateStats(data.speed)) errors.speed = "Min value: 0, max value: 999";
        if (validateStats(data.attack)) errors.attack = "Min value: 0, max value: 999";
        if (validateStats(data.defense)) errors.defense = "Min value: 0, max value: 999";
        if (validateStats(data.weight)) errors.weight = "Min value: 0, max value: 999";
        if (validateStats(data.height)) errors.height = "Min value: 0, max value: 999";
        if (validateDuplicateName(data.name)) errors.name = "Name has already exist";
        return errors;
    };
    return (
        <div>
            <Link to="/home">
                <button>Return Home</button>
            </Link>
            <h1>Create your Pokemon!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div>
                        <label>Name: </label>
                        <input type="string" value={input.value} name="name" onChange={(e) => handleChange(e)}></input>
                        {formErrors.name ? (
                            <h4>
                                <small>{formErrors.name}</small>
                            </h4>
                        ) : (
                            false
                        )}
                    </div>
                    <div>
                        <label>Image: </label>
                        <input type="url" value={input.image} name="image" onChange={(e) => handleChange(e)}></input>
                        {formErrors.image ? (
                            <h4>{formErrors.image}</h4>
                        ) : (
                            false
                        )}
                    </div>
                    <div>
                        <label>Hp: </label>
                        <input type="number" value={input.hp} name="hp" onChange={(e) => handleChange(e)}></input>
                        {formErrors.hp ? (
                            <h4>{formErrors.hp}</h4>
                        ) : (
                            false
                        )}
                    </div>
                    <div>
                        <label>Attack: </label>
                        <input type="number" value={input.attack} name="attack" onChange={(e) => handleChange(e)}></input>
                        {formErrors.attack ? (
                            <h4>{formErrors.attack}</h4>
                        ) : (
                            false
                        )}
                    </div>
                    <div>
                        <label>Defense: </label>
                        <input type="number" value={input.defense} name="defense" onChange={(e) => handleChange(e)}></input>
                        {formErrors.defense ? (
                            <h4>{formErrors.defense}</h4>
                        ) : (
                            false
                        )}
                    </div>
                    <div>
                        <label>Speed: </label>
                        <input type="number" value={input.speed} name="speed" onChange={(e) => handleChange(e)}></input>
                        {formErrors.speed ? (
                            <h4>{formErrors.speed}</h4>
                        ) : (
                            false
                        )}
                    </div>
                    <div>
                        <label>Height: </label>
                        <input type="number" value={input.height} name="height" onChange={(e) => handleChange(e)}></input>
                        {formErrors.height ? (
                            <h4>{formErrors.height}</h4>
                        ) : (
                            false
                        )}
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input type="number" value={input.weight} name="weight" onChange={(e) => handleChange(e)}></input>
                        {formErrors.weight ? (
                            <h4>{formErrors.weight}</h4>
                        ) : (
                            false
                        )}
                    </div>
                    <div>
                        <label>Types: </label>
                        <select onChange={(e) => handleSelect(e)}>
                            {types.map((t) => (
                                <option type="checkbox" ket={t.name} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                        <span>{input.type.map((t) => t + ", ")}
                        <button type="button" onClick={handleDeleteT}>x</button></span>
                        {formErrors.type ? (
                            <h4>{formErrors.type}</h4>
                        ) : (
                            false
                        )}
                    </div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
};