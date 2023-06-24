import { type ActionFunction, type EventObject } from "xstate";
import { type WithCount } from "./context";

export const decrement: ActionFunction<WithCount, EventObject> = context => context.count - 1;

export const increment: ActionFunction<WithCount, EventObject> = context => context.count + 1;
