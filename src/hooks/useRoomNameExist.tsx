import { useEffect, useState } from 'react';
import { firebase } from '../libraries/firebase';

export function useRoomNameExist(roomName: string) {
    const [loading, setLoading] = useState(false);
    const [roomNameExist, setRoomNameExist] = useState<boolean | null>(null);

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection("rooms")
        .where("name", "==", roomName)
        .where("active", "==", "true")
        .onSnapshot(function (qs: any){
            setLoading(false);

            const batch: any = [];
            qs.forEach(function(doc: any) {
                batch.push({id: doc.id, ...doc.data()});
            });

            setRoomNameExist(batch.length !== 0 ? true : false);
        });

        return function() {
            setLoading(true);
            unsubscribe();
        }
    }, [roomName]);

    return [roomNameExist, loading];
}