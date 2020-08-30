import { useState, useEffect } from "react";
import { SubmarineModel } from "../components/SeaBattle/Game/submarine.model";
import { getSubmarines } from "../components/SeaBattle/Game/SubmarinesGameTools";
import { ISeaBattleBoardLogic, useSeaBattleBoardLogic } from "./useSeaBattleBoardLogic";
import { firebase } from "../libraries/firebase";
import { IGameConfig } from "../components/SeaBattle/GameSetup/GameSetup.model";
import { ISeaBattlePlayerVsPlayer } from "./seaBattlePlayerVs.model";

export function useSeaBattlePlayerVsPlayer(gameSetup: IGameConfig): ISeaBattlePlayerVsPlayer {
    const playerTurn = gameSetup.isPlayingFirst ? 0 : 1;
    const [enemyReady, setEnemyReady] = useState(false);
    const [submarinesTools, setSubmarinesTools] = useState<SubmarineModel[]>(getSubmarines());
    const [board, placeSubmarine, play, myTurn, enemyRespond, IamReady, winner]: ISeaBattleBoardLogic = useSeaBattleBoardLogic({ numberOfSubmarines: submarinesTools.length, isPlayingFirst: gameSetup.isPlayingFirst });
    const [enemySubmarinesTools, setEnemySubmarinesTools] = useState<SubmarineModel[]>(getSubmarines());

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection("game")
        .where("roomId", "==", gameSetup.id)
        .onSnapshot(function (qs: any){
            const batch: any = [];
            qs.forEach(function(doc: any) {
                batch.push({id: doc.id, ...doc.data()});
            });

            batch.sort((itemA: { time: number; }, itemB: { time: number; }) => itemB.time - itemA.time);
            const lastTurn = batch[0];
            if (lastTurn) {
                if (isMyMoveResult(lastTurn)) {
                    const coords = JSON.parse(lastTurn.coords);
                    enemyRespond(lastTurn.x, lastTurn.y, lastTurn.bombResult, coords);
                    if (lastTurn.bombResult === 'X') {
                        const enemySubmarine = enemySubmarinesTools.filter((submarine: SubmarineModel) => submarine.size === coords.length && !submarine.dropped);

                        if (enemySubmarine.length !== 0) {
                            enemySubmarine[0].dropped = true;
                            setEnemySubmarinesTools([...enemySubmarinesTools]);
                        }
                    }
                } else if (isEnemyMove(lastTurn)) {
                    const result = play(lastTurn.x, lastTurn.y);
                    if (result !== false) {
                        notifyBombResult(lastTurn, result);    
                    }
                } else if (!enemyReady && isEnemyPlayerReady(lastTurn.ready)) {
                    setEnemyReady(true);
                }
            }

            function isMyMoveResult(lastTurn: any) {
                return lastTurn.player === playerTurn && lastTurn.bombResult !== '';
            }

            function isEnemyMove(lastTurn: any) {
                return enemyReady && lastTurn.x !== -1 && lastTurn.player !== playerTurn && lastTurn.bombResult === '';
            }

            function isEnemyPlayerReady(playerReady: number) {
                const me = gameSetup.isPlayingFirst ? 0 : 1;
                return playerReady !== me;
            }
            

            function notifyBombResult(lastTurn: any, result: any) {
                const db = firebase.firestore();
                db
                .collection('game')
                .add({
                    roomId: gameSetup.id,
                    player: lastTurn.player,
                    bombResult: result.bombResult,
                    coords: JSON.stringify(result.coords || []),
                    x: lastTurn.x,
                    y: lastTurn.y,
                    time: new Date().getTime()
                });
            }
        });

        return function() {
            unsubscribe();
        }
    }, [enemyRespond, gameSetup.id, play, playerTurn]);


    useEffect(() => {
        if (IamReady) {
            const db = firebase.firestore();
            db
            .collection('game')
            .add({
                roomId: gameSetup.id,
                player: playerTurn,
                bombResult: '',
                x: -1,
                y: -1,
                ready: playerTurn,
                time: new Date().getTime()
            });
        }
    }, [IamReady]);

    function safePlay(x: number, y: number) {
        if (myTurn && winner === undefined) {
            askForMoveResult(x, y);
        }
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
            y,
            time: new Date().getTime()
        });
    }

    function getTurnStatusMessage() {
        if (IamReady) {
            if (enemyReady) {
                return myTurn ? 'Bomb a square !' : 'Wait for other player turn';
            } else {
                return 'Waiting for other player';
            }
        } else {
            return 'Place your submarines';
        }
    }

    function getWinnerMessage() {
        return winner === playerTurn ? 'You Win !' : 'You Lose, try again !';
    }

    return [winner, getWinnerMessage, getTurnStatusMessage, submarinesTools, setSubmarinesTools, board, placeSubmarine, safePlay, enemySubmarinesTools]
}