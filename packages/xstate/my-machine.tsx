import { createMachine } from "xstate";
import { createActorContext } from "@xstate/react";

export const myMachine = createMachine({
  id: "myMachine",
  initial: `state1`,
  on: {
    button1Clicked: `state1`,
    button2Clicked: `state2`,
    button3Clicked: `state3`
  },
  states: {
    state1: {},
    state2: {},
    state3: {}
  }
});

const LOCAL_STORAGE_KEY = "myPersistedState";

function rehydrateState() {
  // Required because Next.js will initially load MyMachineReactContext on the server
  if (typeof window === "undefined") {
    return myMachine.initialState;
  }

  return (
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ||
    myMachine.initialState
  );
}

export const MyMachineReactContext = createActorContext(
  myMachine,
  { state: rehydrateState() },
  (state) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  }
);