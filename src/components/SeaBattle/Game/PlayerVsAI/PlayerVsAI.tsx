import React from 'react';
import { useSeaBattlePlayerVsAI } from '../../../../hooks/useSeaBattlePlayerVsAI';
import SeaBattlePlayerAndEnemyBoard from '../SeaBattleBoard/SeaBattlePlayerAndEnemyBoard';

export default function PlayerVsAI() {
    const [winner, getWinnerMessage, getTurnStatusMessage, submarinesTools, setSubmarinesTools, board, safePlay, placeSubmarine, enemySubmarinesTools] = useSeaBattlePlayerVsAI();
    
    return (
        <div>
            Player Vs AI
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