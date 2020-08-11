import React, { useState } from 'react';
import StepsForm from '../StepsForm/StepForm';
import { NEW_GAME } from './constants';
import Menu from './Menu/Menu';
import GameSetup from './GameSetup/GameSetup';
import Game from './Game/Game';
import { IGameConfig } from './GameSetup/GameSetup.model';

const stepsForm = new StepsForm();

export default function SeaBattleGame() {
    const [ gameSetupType, setGameSetupType ] = useState<string>(NEW_GAME);
    const [ gameSetup, setGameSetup ] = useState<IGameConfig | undefined>(undefined);
    const steps = [
        <Menu selectGameSetup={selectGameSetup} />,
        <GameSetup
                onStartGame={onStartGame}
                onBackHandler={onBackHandler} 
                gameSetup={gameSetupType} />,
        <Game 
            onBackHandler={goToFirstStep}
            gameSetup={gameSetup as IGameConfig} />
    ];
    const [currentStep, setCurrentStep] = useState(steps[0].type.name);

    function onNextHandler() {
        const newStep = stepsForm.next();
        setCurrentStep(newStep.type.name);
    }

    function onBackHandler() {
        const newStep = stepsForm.back();
        setCurrentStep(newStep.type.name);
    }

    function selectGameSetup(gameSetupType: string) {
        setGameSetupType(gameSetupType);
        onNextHandler();
    }

    function onStartGame(gameSetup: IGameConfig) {
        setGameSetup(gameSetup);
        onNextHandler();
    }

    function goToFirstStep() {
        onBackHandler();
        onBackHandler();
    }

    stepsForm.setup({steps, currentStep});

    return (
        <div>
             {stepsForm.currentStepElem}       
        </div>
    )
}