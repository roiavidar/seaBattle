import React from 'react';
import SeaBattleBoard from '../SeaBattleBoard/SeaBattleBoard';
import { ItemsType } from '../SeaBattleBoard/BoardItemsType';
import { SubmarineModel } from '../submarine.model';
import { useSeaBattlePlayerVsAI } from '../../../../hooks/useSeaBattlePlayerVsAI';

export default function PlayerVsAI() {
    const [winner, getWinnerMessage, getTurnStatusMessage, submarinesTools, setSubmarinesTools, board, safePlay, placeSubmarine, enemySubmarinesTools] = useSeaBattlePlayerVsAI();
    
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