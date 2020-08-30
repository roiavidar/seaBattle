import { firebase } from "../../../../libraries/firebase";
import { IGameConfig } from "../GameSetup.model";

export async function createGame(vsPlayer: boolean, roomName: string, done: any) {
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