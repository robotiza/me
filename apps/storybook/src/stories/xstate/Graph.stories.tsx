import { CanvasProvider } from "@robotiza/viz/canvas/CanvasContext";
import { Graph } from "@robotiza/viz/graph/Graph";
import { toDirectedGraph } from "@robotiza/viz/graph/directedGraph";
import { SimulationProvider } from "@robotiza/viz/simulation/SimulationContext";
import { simulationMachine } from "@robotiza/viz/simulation/simulationMachine";
import options from "@robotiza/xstate/recipes/calculator";
import config from "@robotiza/xstate/recipes/calculator/calculator.machine.json";
import { type CalculatorContext } from "@robotiza/xstate/recipes/calculator/context";
import type { Meta, StoryObj } from "@storybook/react";
import { useInterpret, useMachine } from "@xstate/react";
import { useMemo } from "react";
import { Machine, type EventObject } from "xstate";
import { useInterpretCanvas } from "@robotiza/viz/canvas/useInterpretCanvas";

const machine = Machine<any, any, EventObject>(
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

function CalculatorGraph() {
  const [{ context, value }, send] = useMachine(machine, {});
  const state = useMemo(
    () => ({
      context: { display: context.display },
      value: value.toString(),
    }),
    [context.display, value]
  );
  const node = machine.getStateNode(state.value);
  const digraph = useMemo(
    () => toDirectedGraph(node as any),
    [node],
  );

  const simService = useInterpret(simulationMachine);

  const canvasService = useInterpretCanvas({
    sourceID: '',
    embed: {
      isEmbedded: true,
    },
  });

  return (
    <SimulationProvider value={simService}>
      <CanvasProvider value={canvasService}>
        <Graph digraph={digraph!} />
      </CanvasProvider>
    </SimulationProvider>
  );
}


const meta = {
  title: 'xstate/Graph',
  component: CalculatorGraph,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CalculatorGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GraphForCalculatorMachine: Story = {
  args: {
    digraph: null
  },
};
