import React from 'react';
import { getPokemonData, getPokemonDescription } from '../../services/pokemon';
import StatsProgress from './StatsProgress';
import TYPE_COLORS from './TypeColor';

function Pokemon(props) {

    const [pokemonData, setPokemonData] = React.useState({
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        height: '',
        weight: '',
        abilities: [],
        eggGroups: [],
    });

    React.useEffect(() => {
        async function fetchData() {
            const { pokemonIndex } = props.match.params;

            // Urls for pokemon information
            const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonIndex;
            const pokemonSpeciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/' + pokemonIndex;

            // Get pokemon information
            let pokemonInfo = await getPokemonData(pokemonUrl);
            const name = pokemonInfo.name;
            const imageUrl = pokemonInfo.sprites.front_default;
            let { hp, attack, defense, speed, specialAttack, specialDefense } = '';
            pokemonInfo.stats.map(stat => {
                switch (stat.stat.name) {
                    case 'hp':
                        hp = stat['base_stat'];
                        break;
                    case 'attack':
                        attack = stat['base_stat'];
                        break;
                    case 'defense':
                        defense = stat['base_stat'];
                        break;
                    case 'speed':
                        speed = stat['base_stat'];
                        break;
                    case 'special-attack':
                        specialAttack = stat['base_stat'];
                        break;
                    case 'special-defense':
                        specialDefense = stat['base_stat'];
                        break;
                    default:
                        break;
                }
                return;
            });

            const height = Math.round((pokemonInfo.height * 0.32054 + 0.0001) * 100) / 100;
            const weight = Math.round((pokemonInfo.weight * 0.220462 + 0.0001) * 100) / 100;
            const types = pokemonInfo.types.map(type => type.type.name);
            const abilities = pokemonInfo.abilities.map(ability => (
                ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)
            ));

            // Get pokemon description
            let pokemonDescription = await getPokemonDescription(pokemonSpeciesUrl);

            let description = '';
            pokemonDescription.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });

            const eggGroups = pokemonDescription.egg_groups.map(eggGroup => (
                eggGroup.name.charAt(0).toUpperCase() + eggGroup.name.slice(1)
            ));

            setPokemonData({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                pokemonIndex: pokemonIndex,
                imageUrl: imageUrl,
                types: types,
                description: description,
                stats: {
                    hp: hp,
                    attack: attack,
                    defense: defense,
                    speed: speed,
                    specialAttack: specialAttack,
                    specialDefense: specialDefense
                },
                height: height,
                weight: weight,
                abilities: abilities,
                eggGroups: eggGroups,
            });
        }
        fetchData();
    });

    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-5">
                            <h5>{pokemonData.pokemonIndex}</h5>
                        </div>
                        <div className="col-7">
                            <div className="float-right">
                                {pokemonData.types.map(type => (
                                    <span className='badge badge-pill mr-1' style={{ backgroundColor: `#${TYPE_COLORS[type]}`, color: 'white' }}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body mb-0 pb-0">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img src={pokemonData.imageUrl} className='card-img-top rounded mx-auto' alt='' />
                        </div>
                        <div className="col-md-9">
                            <h4 className='mx-auto'>{pokemonData.name}</h4>
                            <StatsProgress key='HP' name='HP' value={pokemonData.stats.hp} />
                            <StatsProgress key='ATTACK' name='ATTACK' value={pokemonData.stats.attack} />
                            <StatsProgress key='DEFENSE' name='DEFENSE' value={pokemonData.stats.defense} />
                            <StatsProgress key='SPEED' name='SPEED' value={pokemonData.stats.speed} />
                            <StatsProgress key='SPECIALATTACK' name='SPECIAL ATTACK' value={pokemonData.stats.specialAttack} />
                            <StatsProgress key='SPECIALDEFENSE' name='SPECIAL DEFENSE' value={pokemonData.stats.specialDefense} />
                        </div>
                        <div className="row mt-2 text-center">
                            <div className="col mx-auto">
                                <p className="mx-auto">{pokemonData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="card-body mt-0 pt-0">
                    <h5 className="card-title text-center">Profile</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-6">
                                    <h6 className="float-right">Height:</h6>
                                </div>
                                <div className="col-6">
                                    <h6 className="float-left">{pokemonData.height} ft.</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <h6 className="float-right">Weight:</h6>
                                </div>
                                <div className="col-6">
                                    <h6 className="float-left">{pokemonData.weight} lbs.</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-6">
                                    <h6 className="float-right">Abilities:</h6>
                                </div>
                                <div className="col-6">
                                    <h6 className="float-left">
                                        {pokemonData.abilities.map(ability => (
                                            <span>{ability} </span>
                                        ))}
                                    </h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <h6 className="float-right">Egg Groups:</h6>
                                </div>
                                <div className="col-6">
                                    <h6 className="float-left">{pokemonData.eggGroups.map(eggGroup => (
                                        <span>{eggGroup} </span>
                                    ))}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pokemon;