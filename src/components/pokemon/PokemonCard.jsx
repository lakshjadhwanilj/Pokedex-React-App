import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Sprite = styled.img`
    width: 5em;
    height: 5em;
`;

const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover{
        cursor: pointer;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

function PokemonCard(props) {

    const pokemonIndex = props.pokemon.id;
    const imageUrl = 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/' + pokemonIndex + '.png?raw=true';
    const pokemonName = props.pokemon.name;

    return (
        <div className='col-md-3 col-sm-4 mb-5'>
            <StyledLink to={`pokemon/${pokemonIndex}`}>
                <Card className='card'>
                    <h5 className="card-header">{pokemonIndex}</h5>
                    <Sprite className="card-img-top mx-auto mt-2 rounded" src={imageUrl} />
                    <div className='card-body mx-auto'>
                        <h6 className='card-title'>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h6>
                    </div>
                </Card>
            </StyledLink>
        </div>
    );
}

export default PokemonCard;