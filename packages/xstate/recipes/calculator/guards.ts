import { ConditionPredicate } from "xstate";
import { CalculatorContext } from "./context";
import { CalculatorEventObject } from "./event";


const not = (fn: ConditionPredicate<CalculatorContext, CalculatorEventObject>): ConditionPredicate<CalculatorContext, CalculatorEventObject> => (...args) => !fn(...args);

export const isZero: ConditionPredicate<CalculatorContext, CalculatorEventObject> = (context, event) => event.key === 0;

export const isNotZero: ConditionPredicate<CalculatorContext, CalculatorEventObject> = not(isZero);

export const isMinus: ConditionPredicate<CalculatorContext, CalculatorEventObject> = (context, event) => event.operator === '-';

export const isNotMinus = not(isMinus);

export const divideByZero: ConditionPredicate<CalculatorContext, CalculatorEventObject> = (context, event) => {
    return (
        (!context.operand2 || context.operand2 === '0.') && context.operator === '/'
    );
};

export const notDivideByZero: ConditionPredicate<CalculatorContext, CalculatorEventObject> = not(divideByZero);
