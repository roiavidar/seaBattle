import React from 'react';
import { NEW_GAME } from '../constants';
import NewGameSetup from './NewGameSetup/NewGameSetup';
import JoinGameSetup from './JoinGameSetup/JoinGameSetup';
import { IGameConfig } from './GameSetup.model';

export default function GameSetup(props: {
    onBackHandler: () => void,
    onStartGame: (gameSetup: IGameConfig) => void,
    gameSetup: string
}) {
    const {onBackHandler, onStartGame, gameSetup} = props;

    if (!gameSetup) {
        onBackHandler();
    }

    return (
        <div>
            {
                gameSetup === NEW_GAME ?
                    <NewGameSetup done={onStartGame} /> :
                    <JoinGameSetup done={onStartGame} />
            }
            <button onClick={onBackHandler}>Back</button>
        </div>
        
    )
}