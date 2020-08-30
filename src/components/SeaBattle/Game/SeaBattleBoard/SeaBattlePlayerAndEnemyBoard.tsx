import React from 'react';
import SeaBattlePlayerBoard from './SeaBattlePlayerBoard';
import { ItemsType } from './BoardItemsType';
import SeaBattleBoard from './SeaBattleBoard';
import { SubmarineModel } from '../submarine.model';
import { Board, Submarine } from '../../../../models/seaBattleBoard';

export default function SeaBattlePlayerAndEnemyBoard(props: {
    winner: number | undefined,
    getWinnerMessage: () => string,
    getTurnStatusMessage: () => string,
    submarinesTools: SubmarineModel[],
    setSubmarinesTools: (submarines: SubmarineModel[]) => void,
    board: {
        myBoard: Board,
        enemyBoard: Board
    },
    placeSubmarine: (submarine: Submarine, row: number, column: number) => boolean,
    safePlay: (x: number, y: number) => void,
    enemySubmarinesTools: SubmarineModel[]
}) {
    const {winner, getWinnerMessage, getTurnStatusMessage, submarinesTools, setSubmarinesTools, board, placeSubmarine, safePlay, enemySubmarinesTools} = props;
    return (
        <div>
            <div>
                {winner !== undefined ?
                    getWinnerMessage() :
                    getTurnStatusMessage()
                }
            </div>
            <div>
                <div>My Board:</div>
                <SeaBattlePlayerBoard
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
                    submarines={enemySubmarinesTools.filter((submarine: SubmarineModel) => submarine.dropped)}
                    placeSubmarine={placeSubmarine}
                    itemsType={ItemsType.SUBMARINE}
                    setSubmarines={setSubmarinesTools}
                />
            </div>
        </div>
    )
}