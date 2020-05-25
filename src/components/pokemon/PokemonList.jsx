import React from 'react';
import { getAllPokemon, getPokemon } from '../../services/pokemon';
import PokemonCard from './PokemonCard';

function PokemonList() {

    const [pokemonData, setPokemonData] = React.useState([]);
    const [nextUrl, setNextUrl] = React.useState('');
    const [prevUrl, setPrevUrl] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

    React.useEffect(() => {
        async function fetchData() {
            let response = await getAllPokemon(initialUrl);
            setNextUrl(response.next);
            setPrevUrl(response.previous);
            await loadingPokemon(response.results);
            setLoading(false);
        }
        fetchData();
    }, []);

    const loadingPokemon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon.url);
            return pokemonRecord;
        }));

        setPokemonData(_pokemonData);
    }

    const next = async () => {
        setLoading(true);
        let data = await getAllPokemon(nextUrl);
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const prev = async () => {
        if (!prevUrl) return;
        setLoading(true);
        let data = await getAllPokemon(prevUrl);
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    return (
        <div className="container">
            <div className='p-4 text-center'>
                <button className="btn mx-3" onClick={prev}>Prev</button>
                <button className="btn mx-3" onClick={next}>Next</button>
            </div>
            <div className='row'>
                {
                    loading ? (
                        <h1>Loading...</h1>
                    ) : (
                            pokemonData.map(
                                (pokemon, index) =>
                                    <PokemonCard
                                        key={index}
                                        pokemon={pokemon}
                                    />
                            )
                        )
                }
            </div>
            <div className='p-4 text-center'>
                <button className="btn mx-3" onClick={prev}>Prev</button>
                <button className="btn mx-3" onClick={next}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;