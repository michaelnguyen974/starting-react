import React, { useContext } from "react";
import styled from "@emotion/styled";
import PokemonContext from "../PokemonContext";

const Input = styled.input`
  width: 100%;
  padding: 0.2rem;
  font-size: large;
`;

const PokemonFilter = () => {
  const {state: { filter }, dispatch} = useContext(PokemonContext);
    return (
    <Input
        type="text"
        value={filter}
        onChange={(event) => dispatch({
          type: 'SET_FILTER',
          payload: event.target.value,
        })}
    />
    )
    
}

export default PokemonFilter;