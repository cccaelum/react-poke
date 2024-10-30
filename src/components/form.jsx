import { useState } from 'react';

function Pokeform() {
    const [pokemon, setPokemon] = useState('')
    const [pokemonData, setPokemonData] = useState(null)

    const fetchPokemon = async (pokemonName) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            const data = await response.json();
            console.log(data);
            setPokemonData(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPokemon(pokemon);
        setPokemon('');
      }

    return (
        <>
        <form onSubmit={handleSubmit}>
      <label htmlFor="pokemon"></label>
      <input type="text" placeholder="Ditto..."  id="pokemon" name="pokemon" value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
      <button type="submit" class="button">Buscar</button>
    </form>

    {pokemonData !== null ? (
                <div>
                    <h2>{`Nombre: ${pokemonData.name}`}</h2>
                    <p>{`Altura: ${pokemonData.height}`}</p>
                    <p>{`Peso: ${pokemonData.weight}`}</p>
                    <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                </div>
            ) : null}
        </>
    )
}

export default Pokeform;