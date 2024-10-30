import { useState, useEffect } from 'react';

function Pokeform() {
    const [pokemon, setPokemon] = useState('')
    const [pokemonData, setPokemonData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchPokemon = async (pokemonName) => {
        try {
            setLoading(true);
            setPokemonData(null);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error(`Pokémon no encontrado: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setPokemonData(data);
            setError(null);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
      if (pokemon) { 
          fetchPokemon(pokemon);
      } }, [pokemon]);

    return (
        <>
        <form>
      <label htmlFor="pokemon"></label>
      <input type="text" placeholder="Buscar pokemon..."  id="pokemon" name="pokemon" value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
    </form>

    {loading && <p>Cargando...</p>}

    {error && <p className="error">{error}</p>}

    {pokemonData && (
                <div>
                    <h2>{`${pokemonData.name}`}</h2>
                    {pokemonData.sprites?.front_default ? ( 
                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                    ) : (
                        <p>No se encontró imagen.</p>
                        
                    )}
                </div>
            )}
        </>
    )
}

export default Pokeform;