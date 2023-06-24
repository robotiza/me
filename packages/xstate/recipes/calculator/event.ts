import { EventObject } from "xstate";

export interface CalculatorEventObject extends EventObject {
    key: number | string;
    operator: string;
}