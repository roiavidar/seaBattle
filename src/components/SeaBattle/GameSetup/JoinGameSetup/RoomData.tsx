import React from 'react';
import { IRoomMetaData } from '../GameSetup.model';

export default function RoomData(props: {
    info: IRoomMetaData,
    join: () => void
}) {
    const { info, join } = props;

    return (
        <div>
            {info.name} <button onClick={join}>Join</button>
        </div>
    )
}