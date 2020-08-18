import React, { useState, useEffect } from 'react';
import { IGameConfig } from '../../GameSetup/GameSetup.model';
import SeaBattleBoard from '../SeaBattleBoard/SeaBattleBoard';
import { useSeaBattleBoardLogic, ISeaBattleBoardLogic } from '../../../../hooks/useSeaBattleBoardLogic';
import { submarines, SubmarineModel } from '../SubmarinesGameTools';
import { ItemsType } from '../SeaBattleBoard/BoardItemsType';
import { firebase } from '../../../../libraries/firebase';
export default function PlayerVsPlayer(props: {
    gameSetup: IGameConfig
}) {
    const {gameSetup} = props;
    const playerTurn = gameSetup.isPlayingFirst ? 0 : 1;
    const [board, placeSubmarine, play, myTurn, enemyRespond]: ISeaBattleBoardLogic = useSeaBattleBoardLogic({ isPlayingFirst: gameSetup.isPlayingFirst });
    const [submarinesTools, setSubmarinesTools] = useState<SubmarineModel[]>(submarines);

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection("game")
        .where("roomId", "==", gameSetup.id)
        .onSnapshot(function (qs: any){
            const batch: any = [];
            qs.forEach(function(doc: any) {
                batch.push({id: doc.id, ...doc.data()});
            });

            const lastTurn = batch[batch.length - 1];
            if (lastTurn && (lastTurn.player === playerTurn && lastTurn.bombResult !== '')) {
                enemyRespond(lastTurn.x, lastTurn.y, lastTurn.bombResult);
            } else if (lastTurn && (lastTurn.player !== playerTurn && lastTurn.bombResult === '')) {
                const bombResult = play(lastTurn.x, lastTurn.y);
                notifyBombResult(lastTurn, bombResult);
            }
        });

        return function() {
            unsubscribe();
        }
    }, []);

    function safePlay(x: number, y: number) {
        // const item = board.enemyBoard.cellAt([x, y]);
        // item?.bomb();
        if (myTurn) {
            // const result = play(x, y);
            askForMoveResult(x, y);
        }
    }

    function notifyBombResult(lastTurn: any, bombResult: any) {
        const db = firebase.firestore();
        db
        .collection('game')
        .add({
            roomId: gameSetup.id,
            player: lastTurn.player,
            bombResult,
            x: lastTurn.x,
            y: lastTurn.y
        });
    }

    function askForMoveResult(x: number, y: number) {
        const db = firebase.firestore();
        db
        .collection('game')
        .add({
            roomId: gameSetup.id,
            player: playerTurn,
            bombResult: '',
            x,
            y
        });
    }

    return (
        <div>
            <div>{myTurn ? 'Bomb a square !' : 'Wait for other player turn'}</div>
            <div>
                <div>My Board:</div>
                <SeaBattleBoard
                    submarines={submarinesTools}
                    setSubmarines={setSubmarinesTools} 
                    board={board.myBoard}
                    placeSubmarine={placeSubmarine}
                    itemsType={ItemsType.SUBMARINE} />
            </div>
            <div>
                <div>Enemy Board:</div>
                <SeaBattleBoard 
                    board={board.enemyBoard}
                    play={safePlay}
                />
            </div>
        </div>
    )
}