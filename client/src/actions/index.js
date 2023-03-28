import axios from "axios";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_BY_NAME = "GET_BY_NAME";
export const TYPE_FILTER = "TYPE_FILTER";
export const CREATED_FILTER = "CREATED_FILTER";
export const ORDER = "ORDER";
export const CREATE_POKEMON = "CREATE_POKEMON";

export function getPokemons() {
    try {
        return async function (dispatch) {
            var info = await axios.get("http://localhost:3001/pokemon");
            return dispatch({
                type: GET_ALL_POKEMONS,
                payload: info.data
            });
        };
    } catch (error) {
        console.log(error);
    }
}

//---------------------------------------------------------------------------------------

export const getTypes = () => {
    try {
        return async function (dispatch) {
            var info = await axios.get("http://localhost:3001/type");
            return dispatch({
                type: GET_ALL_TYPES,
                payload: info.data
            });
        };
    } catch (error) {
        console.log(error);
    }
};

//------------------------------------------------------------------------------

export const getDetails = (id) => {
    return async function (dispatch) {
        try {
            var info = await axios.get(`http://localhost:3001/pokemon/${id}`);
            if (info.data.id.length > 8) {
                let pokemon = info.data;
                pokemon.type = pokemon.types.map(({ name }) => name).toString();
                return dispatch({
                    type: GET_DETAILS,
                    payload: pokemon
                });
            } else {
                return dispatch({
                    type: GET_DETAILS,
                    payload: info.data
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

//-----------------------------------------------------------------------------------

export const filterByType = (payload) => {
    try {
        return {
            type: FILTER_BY_TYPES,
            payload
        };
    } catch (error) {
        console.log(error);
    }
};

//---------------------------------------------------------------------------------

export function searchByName(name) {
    return async function (dispatch) {
        try {
            const info = await axios.get(`http://localhost:3001/pokemon?name=${name}`);
            return dispatch({
                type: GET_BY_NAME,
                payload: info.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

//----------------------------------------------------------------------

export const typeFilter = (payload) => {
    return {
        type: TYPE_FILTER,
        payload
    };
};

//-----------------------------------------------------------------------

export const createdFilter = (payload) => {
    return {
        type: CREATED_FILTER,
        payload
    };
};

//-------------------------------------------------------------------

export const orderSort = (payload) => {
    return {
        type: ORDER,
        payload
    };
};

//--------------------------------------------------------------

export const createPokemon = (payload) => {
    return async function (dispatch) {
        try {
            const info = await axios.post("http://localhost:3001/pokemon", payload);
            return dispatch({
                type: CREATE_POKEMON,
                payload: info.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};