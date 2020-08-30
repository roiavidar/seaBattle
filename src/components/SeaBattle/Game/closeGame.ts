import { firebase } from "../../../libraries/firebase";
import { IGameConfig } from "../GameSetup/GameSetup.model";

export function handleCloseGame(gameSetup: IGameConfig, done: any) {
    const db = firebase.firestore();
    db.collection('rooms').doc(gameSetup.id).update({
        active: 'false',
        connectedPlayers: 2,
        numberOfPlayers: 2
    });
    done();
}