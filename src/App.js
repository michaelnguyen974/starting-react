import React from "react";

import styled from "@emotion/styled";
import { CssBaseline } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";


// state is current state of the store 
// action is an object defines the mutation to be applied to the state. Then a new state is returned
const pokemonReducer = (state = {
  pokemon: [],
  filter: "",
  selectedPokemon: null,
}, action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'SET_POKEMON':
      return {
        ...state,
        pokemon: action.payload
    };
    case 'SET_SELECTED_POKEMON':
      return {
        ...state,
        selectedPokemon: action.payload
    };
    default: 
      return state;
  }
};

const store = configureStore({
  reducer: pokemonReducer
});

const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;

function App() {
  const dispatch = useDispatch();
  const pokemon = useSelector(({ pokemon }) => pokemon)

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => 
        dispatch({
          type: 'SET_POKEMON',
          payload: data,
        })
      );
  }, []);

  if (!pokemon) {
    return <div>Loading data</div>;
  }

  return (
    // share state with other components
      <PageContainer>
        <CssBaseline />
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          <PokemonInfo />
        </TwoColumnLayout>
      </PageContainer>
      
    );
   
}

export default () => <Provider store={store}><App /></Provider>