import React from 'react';
import { getAllPokemon, getPokemon, getAllPokemonName } from '../../services/pokemon';
import PokemonCard from './PokemonCard';
import pokemon from './pokemon.png';
import styled from 'styled-components';

const Sprite = styled.img`
    width: 3em;
    height: 3em;
`;

function PokemonList() {

    const [allPokemon, setAllPokemon] = React.useState([]);
    const [searchPokemon, setSearchPokemon] = React.useState('');


    const [currentPokemonList, setCurrentPokemonList] = React.useState([]);
    let [pokemonData, setPokemonData] = React.useState([]);
    const [nextUrl, setNextUrl] = React.useState('');
    const [prevUrl, setPrevUrl] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    const initialUrl = 'https://pokeapi.co/api/v2/pokemon';
    function handleChange(event) {
        const searchedPokemon = event.target.value;
        setSearchPokemon(searchedPokemon);
        if (searchPokemon === '') {
            setPokemonData(currentPokemonList);
        } else {
            searchFunction();
        }
    }

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
        setCurrentPokemonList(_pokemonData);
        setPokemonData(_pokemonData);
    }

    const loadPokemon = async (data) => {
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

    React.useEffect(() => {
        async function fetchData() {
            const searchUrl = 'https://pokeapi.co/api/v2/pokemon?limit=964';
            let response = await getAllPokemonName(searchUrl);
            setAllPokemon(response.results);
        }
        fetchData();
    }, []);

    const searchFunction = async () => {
        if (searchPokemon !== '') {
            pokemonData = allPokemon.filter(pokemon => (
                pokemon.name.includes(searchPokemon.toLowerCase())
            ));
            await loadPokemon(pokemonData);
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 mx-auto search-row">
                <div className="input-group m-3">
                    <input type="text" onChange={handleChange} className="form-control" placeholder="Search Pokemons..." value={searchPokemon} />
                    <div className="input-group-append">
                        <Sprite src={pokemon} alt="" />
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <button className="btn m-3" onClick={prev}>Prev</button>
                <button className="btn m-3" onClick={next}>Next</button>
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
            <div className='d-flex justify-content-center'>
                <button className="btn m-3" onClick={prev}>Prev</button>
                <button className="btn m-3" onClick={next}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;