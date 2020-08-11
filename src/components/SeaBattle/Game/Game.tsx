import React from 'react';
import { IGameConfig } from '../GameSetup/GameSetup.model';
import { firebase } from '../../../libraries/firebase';

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
            Game
            <div>
               room name:  {gameSetup.roomName}
            </div>
            <div>
                vs player: {gameSetup.vsPlayer ? 'true' : 'false'}
            </div>
            <button onClick={handleCloseGame}>Back</button>
        </div>
    )
}