import Calculator, { type CalculatorAction, type CalculatorState } from "@robotiza/ui/Calculator";
import options from "@robotiza/xstate/recipes/calculator";
import config from "@robotiza/xstate/recipes/calculator/calculator.machine.json";
import { type CalculatorContext } from "@robotiza/xstate/recipes/calculator/context";
import type { Meta, StoryObj } from '@storybook/react';
import { useMachine } from "@xstate/react";
import React, { useMemo } from "react";
import { Machine } from "xstate";

const machine = Machine<CalculatorContext>(
    config,
    /*
        "alert": {
            "invoke": {
                "src": {
                    "actions": [
                        "alert"
                    ]
                },
                "onDone": {
                    "target": "start",
                    "actions": [
                        "reset"
                    ]
                }
            }
        }
    */
    options
);

export const reducer = (prevState: CalculatorState, action: CalculatorAction): CalculatorState => {
    console.log('Event - Payload', { event: action.type, payload: action.payload });

    return prevState;
}

const CalculatorMachine: React.FC = () => {
    const [{ context, value }, send] = useMachine(machine, {});
    const dispatch = (action: CalculatorAction): void => {
        send(action.type, action.payload);
    };
    const state = useMemo<CalculatorState>(
        () => ({
            context: { display: context.display },
            value: value.toString(),
        }),
        [context.display, value]
    );
    return (
        <Calculator state={state} dispatch={dispatch} />
    )
};

const meta = {
    title: 'Example/Calculator',
    component: CalculatorMachine,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
      layout: 'fullscreen',
    },
  } satisfies Meta<typeof CalculatorMachine>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const CalculatorWithMachine: Story = {
    args: {
    },
  };
  
  