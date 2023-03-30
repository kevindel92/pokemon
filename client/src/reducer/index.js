import {
    GET_ALL_POKEMONS,
    GET_ALL_TYPES,
    // FILTER_BY_TYPES,
    GET_DETAILS,
    GET_BY_NAME,
    TYPE_FILTER,
    CREATED_FILTER,
    ORDER,
    CREATE_POKEMON
} from "../actions/index";

let initialState = {
    allPokemons : [],
    allPokemonsCopy: [],
    allTypes: [],
    pokemon: {}
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                allPokemonsCopy: action.payload,
                pokemon: {}
            };
            case GET_ALL_TYPES:
                return {
                    ...state,
                    allTypes: action.payload
                };
                case GET_DETAILS:
                    return {
                        ...state,
                        allTypes: action.payload
                    };
                    case GET_BY_NAME:
                        return {
                            ...state,
                            allPokemons: action.payload.length 
                            ? action.payload 
                            : "not found"
                        };
                        case TYPE_FILTER:
                            const pokemonFilterT = state.allPokemonsCopy;
                            const filter = action.payload === "all"
                            ? state.allPokemonsCopy
                            : pokemonFilterT.filter((e) => e.type.includes(action.payload));
                            return {
                                ...state,
                                allPokemons: filter.length
                                ? filter
                                : "not found"
                            };
                            case CREATED_FILTER:
                                const pokemonFilterC = state.allPokemonsCopy;
                                let pokemonsCreated = pokemonFilterC;
                                if (action.payload === "created")
                                pokemonsCreated = pokemonFilterC.filter((el) => isNaN(el.id));
                                if (action.payload === "api")
                                pokemonsCreated = pokemonFilterC.filter((el) => !isNaN(el.id));
                                return {
                                    ...state,
                                    allPokemons: pokemonsCreated.length
                                    ? pokemonsCreated
                                    : "not found"
                                };
                                case ORDER:
                                    let nameArray =
                                    action.payload === "az"
                                    ? state.allPokemons.sort(function (a, b) {
                                        if (a.name > b.name) {
                                            return 1;
                                        }
                                        if (a.name < b.name) {
                                            return -1;
                                        }
                                        return 0;
                                    })
                                    : action.payload === "za"
                                    ? state.allPokemons.sort(function (a, b) {
                                        if (a.name > b.name) {
                                            return -1;
                                        }
                                        if (a.name < b.name) {
                                            return 1;
                                        }
                                        return 0
                                    })
                                    : action.payload === "worstAtk"
                                    ? state.allPokemons.sort (function (a,b) {
                                        if (a.attack > b.attack) {
                                            return 1;
                                        }
                                        if (a.attack < b.attack) {
                                            return -1;
                                        }
                                        return 0;
                                    })
                                    : action.payload === "bestAtk"
                                    ? state.allPokemons.sort(function (a, b) {
                                        if (a.attack > b.attack) {
                                            return -1;
                                        }
                                        if (a.attack < b.attack) {
                                            return 1;
                                        }
                                        return 0;
                                    })
                                    : state.allPokemons.sort(function (a, b) {
                                        if (a.id > b.id) {
                                            return 1;
                                        }
                                        if (a.id < b.id) {
                                            return -1;
                                        }
                                        return 0;
                                    });
                                    return {
                                        ...state,
                                        allPokemons: nameArray
                                    };
                                    case CREATE_POKEMON:
                                        return {
                                            ...state
                                        };
                                        default:
                                            return state;
                                    }
                            }

export default rootReducer;