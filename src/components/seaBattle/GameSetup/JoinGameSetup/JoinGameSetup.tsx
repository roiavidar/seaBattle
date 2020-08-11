import React from 'react';
import { IGameConfig, IRoomMetaData } from '../GameSetup.model';
import { useRoomsData } from '../../../../hooks/useRoomsData';
import RoomData from './RoomData';
import { firebase } from '../../../../libraries/firebase';

export default function JoinGameSetup(props: {
    done: (gameSetup: IGameConfig) => void
}) {
    const {done} = props;
    const roomsData: IRoomMetaData[] | null = useRoomsData();

    function join(roomData: IRoomMetaData) {
        const db = firebase.firestore();
        db.collection('rooms').doc(roomData.id).update({
            active: 'false',
            connectedPlayers: 2,
            numberOfPlayers: 2
        });

        done({
            id: roomData.id,
            vsPlayer: true,
            roomName: roomData.name
        });
    }

    if (!roomsData) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div>
            {   roomsData.length !== 0
                ?
                roomsData.map((data: IRoomMetaData) => (
                    <RoomData key={data.id} info={data} join={() => join(data)} />
                ))
                :
                <div>No Rooms !</div>
            }
        </div>
    )
}