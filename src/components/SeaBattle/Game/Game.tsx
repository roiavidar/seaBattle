import React from 'react';
import { IGameConfig } from '../GameSetup/GameSetup.model';
import { firebase } from '../../../libraries/firebase';
import PlayerVsPlayer from './PlayerVsPlayer/PlayerVsPlayer';
import PlayerVsAI from './PlayerVsAI/PlayerVsAI';

export default function Game(props: {
    onBackHandler: () => void,
    gameSetup: IGameConfig
}) {
    const {onBackHandler, gameSetup} = props;

    function handleCloseGame() {
        const db = firebase.firestore();
        db.collection('rooms').doc(gameSetup.id).update({
            active: 'false',
            connectedPlayers: 2,
            numberOfPlayers: 2
        });
        onBackHandler();
    }

    return (
        <div>
            {
                gameSetup.vsPlayer
                ?
                <PlayerVsPlayer gameSetup={gameSetup} />
                :
                <PlayerVsAI />
            }
            <button onClick={handleCloseGame}>Back</button>
        </div>
    )
}