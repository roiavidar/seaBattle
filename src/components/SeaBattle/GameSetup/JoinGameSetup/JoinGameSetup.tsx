import React from 'react';
import { IGameConfig, IRoomMetaData } from '../GameSetup.model';
import { useRoomsData } from '../../../../hooks/useRoomsData';
import RoomData from './RoomData';
import { join } from './joinGame';

export default function JoinGameSetup(props: {
    done: (gameSetup: IGameConfig) => void
}) {
    const {done} = props;
    const roomsData: IRoomMetaData[] | null = useRoomsData();

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
                    <RoomData key={data.id} info={data} join={() => join(data, done)} />
                ))
                :
                <div>No Rooms !</div>
            }
        </div>
    )
}