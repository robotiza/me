import * as React from 'react';
import { MyMachineReactContext } from './myMachine';

let renderCount = 0;

export function ComponentB() {
  const actorRef = MyMachineReactContext.useActorRef();
  const isState3 = MyMachineReactContext.useSelector((state) => 
    state.matches('state3')
  );

  renderCount++;

  return (
    <section>
      <h1>Component B</h1>
      <output>
        isState3: <strong>{JSON.stringify(isState3)}</strong>
      </output>
      <output>
        renderCount: <strong>{renderCount}</strong>
      </output>
      <button onClick={() => actorRef.send('button3Clicked')}>BUTTON 3</button>
    </section>
  );
};