export default interface IStepsForm {
    firstStep: boolean;
    lastStep: boolean;
    setup: (props: {steps: JSX.Element[], currentStep: string}) => void;
    next: () => JSX.Element;
    back: () => JSX.Element;
    readonly currentStepElem: JSX.Element;
}