import React from 'react';
import { NEW_GAME, JOIN_GAME } from '../constants';

export default function Menu(props: {
    selectGameSetup: (gameSetup: string) => void
}) {
    const { selectGameSetup } = props;

    return (
        <div>
            <h3>Sea Battle !</h3>
            <button onClick={() => selectGameSetup(NEW_GAME)}>New Game</button>
            <button onClick={() => selectGameSetup(JOIN_GAME)}>Join Game</button>
        </div>
    )
}