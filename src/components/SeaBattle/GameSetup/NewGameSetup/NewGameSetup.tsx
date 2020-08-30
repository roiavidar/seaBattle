import React, { useState } from 'react';
import { useIsValidRoomName } from '../../../../hooks/useIsValidRoomName';
import { IGameConfig } from '../GameSetup.model';
import { createGame } from './createGame';

const labelStyle = {
    display: 'block'
}

export default function NewGameSetup(props: {
    done: (gameSetup: IGameConfig) => void
}) {
    const {done} = props;
    const [vsPlayer, setVsPLayer] = useState<boolean>(false);
    const [roomName, setRoomName] = useState<string>('');
    const [roomNameValid, loading] = useIsValidRoomName(roomName);
    
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
            <button onClick={() => createGame(vsPlayer, roomName, done)} disabled={loading || (!roomNameValid && vsPlayer)}>Create Game</button>
        </div>
    )
}