import React, { useState } from 'react';
import { IGameConfig } from '../../GameSetup/GameSetup.model';
import SeaBattleBoard from '../SeaBattleBoard/SeaBattleBoard';
import { useSeaBattleBoardLogic, ISeaBattleBoardLogic } from '../../../../hooks/useSeaBattleBoardLogic';
import { submarines, SubmarineModel } from '../SubmarinesGameTools';
import { ItemsType } from '../SeaBattleBoard/BoardItemsType';

export default function PlayerVsPlayer(props: {
    gameSetup: IGameConfig
}) {
    const {gameSetup} = props;
    const [board, placeSubmarine, play, myTurn, enemyTurn]: ISeaBattleBoardLogic = useSeaBattleBoardLogic({ isPlayingFirst: gameSetup.isPlayingFirst });
    const [submarinesTools, setSubmarinesTools] = useState<SubmarineModel[]>(submarines);
    function safePlay(x: number, y: number) {
        const item = board.enemyBoard.cellAt([x, y]);
        item?.bomb();
        if (myTurn) {
            play(x, y)
        }
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