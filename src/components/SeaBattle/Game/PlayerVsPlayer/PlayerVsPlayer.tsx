import React from 'react';
import { IGameConfig } from '../../GameSetup/GameSetup.model';
import { useSeaBattlePlayerVsPlayer } from '../../../../hooks/useSeaBattlePlayerVsPlayer';
import SeaBattlePlayerAndEnemyBoard from '../SeaBattleBoard/SeaBattlePlayerAndEnemyBoard';
export default function PlayerVsPlayer(props: {
    gameSetup: IGameConfig
}) {
    const {gameSetup} = props;
    const [winner, getWinnerMessage, getTurnStatusMessage, submarinesTools, setSubmarinesTools, board, placeSubmarine, safePlay, enemySubmarinesTools] = useSeaBattlePlayerVsPlayer(gameSetup);

    return (
        <div>
            <div>Playing {gameSetup.isPlayingFirst ? 'first' : 'second'}</div>
            <SeaBattlePlayerAndEnemyBoard
                winner={winner}
                getWinnerMessage={getWinnerMessage}
                getTurnStatusMessage={getTurnStatusMessage}
                submarinesTools={submarinesTools}
                setSubmarinesTools={setSubmarinesTools}
                board={board}
                placeSubmarine={placeSubmarine}
                safePlay={safePlay}
                enemySubmarinesTools={enemySubmarinesTools}
            />
        </div>
    )
}