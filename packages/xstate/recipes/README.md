https://xstate.js.org/docs/guides/actions.html#api

Actions can be added in the options (second argument to createMachine)

```
const triggerMachine = createMachine(
  {
    id: 'trigger',
    initial: 'inactive',
    states: {
      inactive: {
        on: {
          TRIGGER: {
            target: 'active',
            // transition actions
            actions: ['activate', 'sendTelemetry']
          }
        }
      },
      active: {
        // entry actions
        entry: ['notifyActive', 'sendTelemetry'],
        // exit actions
        exit: ['notifyInactive', 'sendTelemetry'],
        on: {
          STOP: { target: 'inactive' }
        }
      }
    }
  },
  {
    actions: {
      // action implementations
      activate: (context, event) => {
        console.log('activating...');
      },
      notifyActive: (context, event) => {
        console.log('active!');
      },
      notifyInactive: (context, event) => {
        console.log('inactive!');
      },
      sendTelemetry: (context, event) => {
        console.log('time:', Date.now());
      }
    }
  }
);
```

The action (exec) function takes three arguments:


Argument	Type	Description
context	TContext	The current machine context
event	event object	The event that caused the transition
actionMeta	meta object	An object containing meta data about the action (see below)


The actionMeta object includes the following properties:

Property	Type	Description
action	action object	The original action object
state	State	The resolved machine state, after transition


Guards
https://xstate.js.org/docs/guides/guards.html#guards-condition-functions


Guards (Condition Functions)
A condition function (also known as a guard) specified on the .cond property of a transition, as a string or condition object with a { type: '...' } property, and takes 3 arguments:

Argument	Type	Description
context	object	the machine context
event	object	the event that triggered the condition
condMeta	object	meta data (see below)
The condMeta object includes the following properties:

cond - the original condition object
state - the current machine state, before transition
_event - the SCXML event