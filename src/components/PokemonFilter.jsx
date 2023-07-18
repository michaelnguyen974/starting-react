import React, { useContext } from "react";
import styled from "@emotion/styled";
import PokemonContext from "../PokemonContext";

const Input = styled.input`
  width: 100%;
  padding: 0.2rem;
  font-size: large;
`;

const PokemonFilter = () => {
  const {filter, filterSet} = useContext(PokemonContext);
    return <Input
        type="text"
        value={filter}
        onChange={(event) => filterSet(event.target.value)}
    />
    
}

export default PokemonFilter;