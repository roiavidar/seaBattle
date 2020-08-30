import React from 'react';
import { IGameConfig } from '../../GameSetup/GameSetup.model';
import SeaBattleBoard from '../SeaBattleBoard/SeaBattleBoard';
import { ItemsType } from '../SeaBattleBoard/BoardItemsType';
import { SubmarineModel } from '../submarine.model';
import { useSeaBattlePlayerVsPlayer } from '../../../../hooks/useSeaBattlePlayerVsPlayer';
export default function PlayerVsPlayer(props: {
    gameSetup: IGameConfig
}) {
    const {gameSetup} = props;
    const [winner, getWinnerMessage, getTurnStatusMessage, submarinesTools, setSubmarinesTools, board, placeSubmarine, safePlay, enemySubmarinesTools] = useSeaBattlePlayerVsPlayer(gameSetup);

    return (
        <div>
            <div>Playing {gameSetup.isPlayingFirst ? 'first' : 'second'}</div>
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