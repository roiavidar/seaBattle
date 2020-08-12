import React, { useState } from 'react';
import { useRoomNameExist } from '../../../../hooks/useRoomNameExist';
import { IGameConfig } from '../GameSetup.model';
import { firebase } from '../../../../libraries/firebase';

const labelStyle = {
    display: 'block'
}

export default function NewGameSetup(props: {
    done: (gameSetup: IGameConfig) => void
}) {
    const {done} = props;
    const [vsPlayer, setVsPLayer] = useState<boolean>(false);
    const [roomName, setRoomName] = useState<string>('');
    const [roomNameExist, loading] = useRoomNameExist(roomName);
    let roomNameValid = false;

    if (roomNameExist !== null && roomName !== '') {
        roomNameValid = !roomNameExist;
    }

    async function createGame() {
        let docRef = null;
        if (vsPlayer) {
            const db = firebase.firestore();
            docRef = await db.collection('rooms').add({
                active: "true",
                connectedPlayers: 1,
                numberOfPlayers: 2,
                name: roomName
            });
        }

        const gameConfig: IGameConfig = {
            id: (docRef && docRef.id) || 'private game',
            vsPlayer,
            roomName,
            isPlayingFirst: true
        }
        
        done(gameConfig);
    }

    return (
        <div>
            <div>
                <h4>Pick your opponent:</h4>
                <label style={labelStyle}>
                    <input type="radio" name="gameType" value="AI" defaultChecked={!vsPlayer} onClick={() => setVsPLayer(false)} />
                    AI
                </label>
                <label style={labelStyle}>
                    <input type="radio" name="gameType" value="Player" onClick={() => setVsPLayer(true)} />
                    Player
                    {
                        vsPlayer ?
                            <input type="text" placeholder="type room name" onChange={(event) => setRoomName(event.target.value)} />
                            : null
                    }
                </label>
            </div>
            <button onClick={() => createGame()} disabled={loading || (!roomNameValid && vsPlayer)}>Create Game</button>
        </div>
    )
}