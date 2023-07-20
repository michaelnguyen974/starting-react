import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";


const Input = styled.input`
  width: 100%;
  padding: 0.2rem;
  font-size: large;
`;

const PokemonFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(({filter}) => filter);
  
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