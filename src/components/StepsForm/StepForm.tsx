import IStepsForm from "./IStepsForm";

export default class StepsForm implements IStepsForm {
    private currentStep: number = 0;
    private steps: JSX.Element[] = [];
    public firstStep: boolean = true;
    public lastStep: boolean = false;

    constructor() {}

    setup(props: {
        steps: JSX.Element[],
        currentStep: string
    }) {
        this.steps = props.steps;

        this.currentStep = this.steps.findIndex((jsxElem: JSX.Element) => jsxElem.type.name === props.currentStep);

        if (this.steps.length === 1) {
            this.lastStep = true;
        }
    }

    next() {
        if (!this.lastStep) {
            this.currentStep++;
            this.firstStep = false;
        }
        this.lastStep = this.currentStep === (this.steps.length - 1);

        return this.steps[this.currentStep];
    }

    back() {
        if (!this.firstStep) {
            this.currentStep--;
            this.lastStep = false;
        }
        this.firstStep = this.currentStep === 0

        return this.steps[this.currentStep];
    }

    get currentStepElem() {
        return this.steps[this.currentStep];
    }
}