import React from 'react';
import { IGameConfig } from '../../GameSetup/GameSetup.model';
import SeaBattleBoard from '../SeaBattleBoard/SeaBattleBoard';
import { useSeaBattleBoardLogic, ISeaBattleBoardLogic } from '../../../../hooks/useSeaBattleBoardLogic';

export default function PlayerVsPlayer(props: {
    gameSetup: IGameConfig
}) {
    const {gameSetup} = props;
    const [board, placeSubmarine, play, myTurn, enemyTurn]: ISeaBattleBoardLogic = useSeaBattleBoardLogic({ isPlayingFirst: gameSetup.isPlayingFirst });

    function safePlay(x: number, y: number) {
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
                    board={board.myBoard}
                    placeSubmarine={placeSubmarine}
                    play={safePlay} />
            </div>
            <div>
                <div>Enemy Board:</div>
                <SeaBattleBoard 
                    board={board.enemyBoard} />
            </div>
        </div>
    )
}