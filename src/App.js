import React from "react";
import pokemon from "./pokemon.json";
import PropTypes from "prop-types";

import "./App.css";

const PokemonRow = ({ pokemon }) => (
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
    </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  })
};

function App() {
  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1em",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <table width="100%">
        <tbody>
          {pokemon.slice(0, 20).map((pokemon) => (
            <PokemonRow key={pokemon.id} pokemon={pokemon} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
