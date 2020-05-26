import React from 'react';
import pokemon from './pokemon.png';
import styled from 'styled-components';

const Sprite = styled.img`
    width: 2em;
    height: 2em;
`;

function Navbar() {
    return (
        <div className='navbar navbar-expand-md navbar-dark fixed-top'>
            <a className='navbar-brand ml-3' href='#'>
                <Sprite src={pokemon} alt="" />
                Pokedex
            </a>
        </div>
    );
}

export default Navbar;