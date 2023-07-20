import React from "react";
import { useSelector, useDispatch } from "react-redux";

import PokemonRow from "./PokemonRow";

const PokemonTable = () => {
    const dispatch = useDispatch();
    const { filter, pokemon } = useSelector(({ filter, pokemon }) => ({
        filter,
        pokemon,
    }));
    
    return <table width="100%">
            <tbody>
                {pokemon
                .filter(({ name: { english } }) =>
                    english
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase())
                )
                .slice(0, 20)
                .map((pokemon) => (
                    <PokemonRow
                    pokemon={pokemon}  
                    onClick={(pokemon) => dispatch({
                        type: 'SET_SELECTED_POKEMON',
                        payload: pokemon,
                    })}
                    key={pokemon.id}
                    />
                ))}
            </tbody>
    </table>
}

export default PokemonTable;