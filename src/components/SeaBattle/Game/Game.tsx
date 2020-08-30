import React from 'react';
import { IGameConfig } from '../GameSetup/GameSetup.model';
import PlayerVsPlayer from './PlayerVsPlayer/PlayerVsPlayer';
import PlayerVsAI from './PlayerVsAI/PlayerVsAI';
import { handleCloseGame } from './closeGame';

export default function Game(props: {
    onBackHandler: () => void,
    gameSetup: IGameConfig
}) {
    const {onBackHandler, gameSetup} = props;

    return (
        <div>
            {
                gameSetup.vsPlayer
                ?
                <PlayerVsPlayer gameSetup={gameSetup} />
                :
                <PlayerVsAI />
            }
            <button onClick={() => handleCloseGame(gameSetup, onBackHandler)}>Back</button>
        </div>
    )
}