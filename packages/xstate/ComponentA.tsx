import * as React from "react";
import { MyMachineReactContext } from "./my-machine";

export function ComponentA() {
    const [state, send] = MyMachineReactContext.useActor();

    return (
        <section>
            <h1>Component A</h1>
            <output>
                state: <strong>{JSON.stringify(state.value)}</strong>
            </output>
            <button onClick={() => send('button1Clicked')}>
                BUTTON 1
            </button>
            <button onClick={() => send('button2Clicked')}>
                BUTTON 2
            </button>
            <button onClick={() => send('button3Clicked')}>
                BUTTON 3
            </button>
        </section>
    );
};