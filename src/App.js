import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";


const PokemonRow = ({ pokemon, onSelect }) => (
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
      <td>
        <button onClick={() => onSelect(pokemon)}>Select!</button>
      </td>
    </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

// every key in selected item is mapped to a property that goes to pokemon info
const PokemonInfo = ({name, base}) => (
  <div>
     <h1> {name.english} </h1>
     <table>
      <tbody>
        {
          Object.keys(base).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>{base[key]}</td>
            </tr>
          ))
        }
      </tbody>
     </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  })
};

const Title = styled.h1`
text-align: center
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70%, 30%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto,
  width: 800px,
  paddingTop: 1rem,
`
const Input = styled.input`
  width: 100%;
  padding: 0.2rem;
  font-size: x-large;
`
const TableHeader = styled.th`
  text-align: left;
  font-size: x-large;
`

function App() {
  // React hook
  const [filter, filterSet] = React.useState(""); // return current state (filter) and filterSet sets value of the filter (event)
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedItem, selectedItemSet] = React.useState(null);

  // runs a function in reaction to a change. Get data once upon page reload
  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json") // endpoint that contains our pokemon data
    .then((resp) => resp.json()) // gives a promise
    .then((data) => pokemonSet(data))
  }, []);

  return (
    <Container>
      <Title>Pokemon Search</Title>
  
      <TwoColumnLayout>
        <div>
          <Input
            value={filter} 
            onChange={(event) => filterSet(event.target.value)}
          />
          <table width="100%">
            <thead>
                <tr>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonRow key={pokemon.id} pokemon={pokemon} onSelect={(pokemon) => selectedItemSet(pokemon)}/>
                ))}
            </tbody>
          </table>
        </div>
        {selectedItem && (<PokemonInfo {...selectedItem} />)}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
