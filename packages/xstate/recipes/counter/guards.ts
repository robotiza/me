import { type ConditionPredicate, type EventObject } from "xstate";
import { type WithCount } from "./context";

export const isNotMax: ConditionPredicate<WithCount, EventObject> = context => context.count < 10;

export const isNotMin: ConditionPredicate<WithCount, EventObject> = context => context.count >= 0;
