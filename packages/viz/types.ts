import type {
  AnyEventObject,
  AnyInterpreter,
  State,
  StateMachine,
} from "xstate";
import { Model } from "xstate/lib/model.types";

export type AnyStateMachine = StateMachine<any, any, any>;

export type StateFrom<T> = T extends StateMachine<
  infer TContext,
  any,
  infer TEvent
>
  ? State<TContext, TEvent>
  : T extends Model<infer TContext, infer TEvent>
  ? State<TContext, TEvent, any, any>
  : never;

export type AnyState = State<any, any>;

export type SourceProvider = 'gist' | 'registry';

export type ServiceRefEvents =
  | {
      type: 'xstate.event';
      event: AnyEventObject;
    }
  | {
      type: 'xstate.state';
      state: AnyState;
    };

export interface ServiceData {
  sessionId: string;
  machine: AnyStateMachine;
  state: AnyState;
  status: AnyInterpreter['status'];
  source: 'inspector' | 'visualizer' | 'child';
  parent: string | undefined;
}

export type SimulationMode = 'inspecting' | 'visualizing';

export enum EmbedMode {
  Viz = 'viz',
  Panels = 'panels',
  Full = 'full',
}
export enum EmbedPanel {
  Code = 'code',
  State = 'state',
  Events = 'events',
  Actors = 'actors',
  Settings = 'settings',
}
export interface ParsedEmbed {
  mode: EmbedMode;
  panel: EmbedPanel;
  showOriginalLink: boolean;
  readOnly: boolean;
  pan: boolean;
  zoom: boolean;
  controls: boolean;
}
export type EmbedContext =
  | { isEmbedded: false }
  | ({ isEmbedded: true; originalUrl: string } & ParsedEmbed);

export interface Point {
  x: number;
  y: number;
}
