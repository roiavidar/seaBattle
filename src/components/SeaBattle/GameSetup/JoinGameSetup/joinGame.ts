import { IRoomMetaData } from "../GameSetup.model";
import { firebase } from "../../../../libraries/firebase";

export function join(roomData: IRoomMetaData, done: any) {
    const db = firebase.firestore();
    db.collection('rooms').doc(roomData.id).update({
        active: 'false',
        connectedPlayers: 2,
        numberOfPlayers: 2
    });

    done({
        id: roomData.id,
        vsPlayer: true,
        roomName: roomData.name,
        isPlayingFirst: false
    });
}