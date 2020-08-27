import React, { useState, useEffect, useCallback } from 'react';
import { SubmarineModel, getSubmarines } from '../SubmarinesGameTools';
import { ISeaBattleBoardLogic, useSeaBattleBoardLogic } from '../../../../hooks/useSeaBattleBoardLogic';
import { HorizontalSubmarine, Point } from '../../../../models/seaBattleBoard';
import SeaBattleBoard from '../SeaBattleBoard/SeaBattleBoard';
import { ItemsType } from '../SeaBattleBoard/BoardItemsType';

export default function PlayerVsAI() {
    const playerTurn = 0;
    const [submarinesTools, setSubmarinesTools] = useState<SubmarineModel[]>(getSubmarines());
    const [enemySubmarinesTools, setEnemySubmarinesTools] = useState<SubmarineModel[]>(getSubmarines());
    const [board, placeSubmarine, play, myTurn, enemyRespond, IamReady, winner]: ISeaBattleBoardLogic = useSeaBattleBoardLogic({ numberOfSubmarines: submarinesTools.length, isPlayingFirst: true });
    const [AIBoard, AIPlaceSubmarine, AIPlay, AITurn, playerRespond, AIReady, AICheckWinner]: ISeaBattleBoardLogic = useSeaBattleBoardLogic({ numberOfSubmarines: submarinesTools.length, isPlayingFirst: false });
    const [AISubmarinesTools, setAISubmarinesTools] = useState<SubmarineModel[]>(getSubmarines());
    const [guess, setGuess] = useState([0,0]);

    useEffect(() => {
        if (AIBoard.myBoard.submarines.size === AISubmarinesTools.length) return;
        const submarineIndex = AIBoard.myBoard.submarines.size;
        const submarine: SubmarineModel = AISubmarinesTools[submarineIndex];
        const horzSubmarine = new HorizontalSubmarine(submarine.size);
        AIPlaceSubmarine(horzSubmarine, submarineIndex, 0);
    }, [AIBoard.myBoard.submarines.size, AIPlaceSubmarine, AISubmarinesTools]);

    function AIMove(x: number, y: number) {
        setTimeout(() => {
            const moveResult = play(x, y) as  {
                bombResult: string;
                coords: Point[];
            };
            playerRespond(x, y, moveResult.bombResult, moveResult.coords);
            const prevX = x;
            x = (x + 1) % 10
            if (x === 0 && prevX !== 0) {
                y = y + 1;
            }
            if (moveResult.bombResult === '/') {
                AIMove(x, y);
            } else if(moveResult.bombResult === '0' || moveResult.bombResult === 'X') {
                setGuess([x, y]);
            }
        }, 500);
    }

    const AIMoveMemo: (x: number, y: number) => void = useCallback(AIMove, [AIMove, guess, play, playerRespond])

    useEffect(() => {
        if (AITurn && winner === undefined) {
            AIMoveMemo(guess[0], guess[1]);
        }   
    }, [AIMoveMemo, AITurn, guess, winner])

    function getTurnStatusMessage() {
        if (IamReady) {
            if (AIReady) {
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

    function safePlay(x: number, y: number) {
        if (myTurn && winner === undefined) {
            askForMoveResult(x, y);
        }
    }

    function askForMoveResult(x: number, y: number) {
        const moveResult = AIPlay(x, y) as  {
            bombResult: string;
            coords: Point[];
        };
        enemyRespond(x, y, moveResult.bombResult, moveResult.coords);
        if (moveResult.bombResult === 'X') {
            const enemySubmarine = enemySubmarinesTools.filter((submarine: SubmarineModel) => submarine.size === moveResult.coords.length && !submarine.dropped);

            if (enemySubmarine.length !== 0) {
                enemySubmarine[0].dropped = true;
                setEnemySubmarinesTools([...enemySubmarinesTools]);
            }
        }
    }

    return (
        <div>
            Player Vs AI
            <div>
                {winner !== undefined ?
                    getWinnerMessage() :
                    getTurnStatusMessage()
                }
            </div>
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
                    hideRotate={true}
                    submarines={enemySubmarinesTools.filter((submarine: SubmarineModel) => submarine.dropped)}
                />
            </div>
        </div>
    )
}