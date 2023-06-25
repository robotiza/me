import { assign } from "xstate";
import { ActionFunction, EventObject } from "xstate";
import { CalculatorContext } from "./context";
import { CalculatorEventObject } from "./event";

export const alert: ActionFunction<CalculatorContext, EventObject> = (context, event) => () => {
    // eslint-disable-next-line no-alert
    // alert('Cannot divide by zero!');
    return Promise.resolve();
};

function doMath(operand1: string, operand2: string, operator: string): number {
    switch (operator) {
        case '+':
            return +operand1 + +operand2;
        case '-':
            return +operand1 - +operand2;
        case '/':
            return +operand1 / +operand2;
        case 'x':
            return +operand1 * +operand2;
        default:
            return Infinity;
    }
}

export const defaultReadout = assign({
    display: () => {
        console.log("defaultReadout");

        return "0.";
    },
});

export const defaultNegativeReadout = assign<CalculatorContext, CalculatorEventObject>({
    display: () => "-0.",
});

export const appendNumBeforeDecimal = assign<CalculatorContext, CalculatorEventObject>({
    display: (context, event) => {
        // from "123." => "1234."
        return `${context.display.slice(0, -1)}${event.key}.`;
    }
});

export const appendNumAfterDecimal = assign<CalculatorContext, CalculatorEventObject>({
    display: (context, event) => {
        return `${context.display}${event.key}`;
    }
});

export const setReadoutNum = assign<CalculatorContext, CalculatorEventObject>({
    display: (context, event) => {
        return `${event.key}.`;
    },
});

export const setNegativeReadoutNum = assign<CalculatorContext, CalculatorEventObject>({
    display: (context, event) => `-${event.key}.`,
});

export const startNegativeNumber = assign<CalculatorContext, CalculatorEventObject>({
    display: () => "-",
});

export const recordOperator = assign<CalculatorContext, CalculatorEventObject>({
    operand1: context => context.display,
    operator: (context, event) => event.operator,
});

export const setOperator = assign<CalculatorContext, CalculatorEventObject>({
    operator: context => context.operator,
});

export const computePercentage = assign<CalculatorContext, CalculatorEventObject>({
    display: context => (+context.display / 100).toString(),
});

export const compute = assign<CalculatorContext, CalculatorEventObject>({
    display: context => {
        const result = doMath(
            context.operand1!,
            context.operand2!,
            context.operator!,
        );

        console.log(
            `doing calculation ${context.operand1} ${context.operator} ${context.operand2} = ${result}`,
        );

        return result.toString();
    },
});

export const storeResultAsOperand1 = assign<CalculatorContext, CalculatorEventObject>({
    operand1: context => context.display,
});

export const storeResultAsOperand2 = assign<CalculatorContext, CalculatorEventObject>({
    operand2: context => context.display,
});

export const saveOperand2 = assign<CalculatorContext, CalculatorEventObject>({
    operand2: context => context.display,
});

export const reset = assign<CalculatorContext, CalculatorEventObject>({
    display: () => "0.",
    operand1: () => undefined,
    operand2: () => undefined,
    operator: () => undefined,
});