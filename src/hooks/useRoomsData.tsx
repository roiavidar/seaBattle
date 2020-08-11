import { useEffect, useState } from 'react';
import { IRoomMetaData } from '../components/SeaBattle/GameSetup/GameSetup.model';
import { firebase } from '../libraries/firebase';

export function useRoomsData() {
    const [roomsData, setRoomsData] = useState<IRoomMetaData[] | null>(null);

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection("rooms")
        .where('active', '==', 'true')
        .onSnapshot(function (qs: any){
            const batch: any = [];
            qs.forEach(function(doc: any) {
                batch.push({id: doc.id, ...doc.data()});
            })
            setRoomsData(batch);
        });

        return function() {
            unsubscribe();
        }
    }, []);

    return roomsData;
}