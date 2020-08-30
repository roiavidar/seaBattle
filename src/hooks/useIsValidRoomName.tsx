import { useEffect, useState } from 'react';
import { firebase } from '../libraries/firebase';

export function useIsValidRoomName(roomName: string) {
    const [loading, setLoading] = useState(false);
    const [roomNameValid, setRoomNameValid] = useState<boolean>(false);

    useEffect(() => {
        let unsubscribe: (() => any);

        if (roomName === '') {
            setRoomNameValid(false);
        } else {
            unsubscribe = firebase.firestore().collection("rooms")
            .where("name", "==", roomName)
            .where("active", "==", "true")
            .onSnapshot(function (qs: any){
                setLoading(false);
    
                const batch: any = [];
                qs.forEach(function(doc: any) {
                    batch.push({id: doc.id, ...doc.data()});
                });
    
                setRoomNameValid(batch.length === 0 ? true : false);
            });
        }
        
        return function() {
            setLoading(true);
            unsubscribe && unsubscribe();
        }
    }, [roomName]);

    return [roomNameValid, loading];
}