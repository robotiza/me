import * as React from "react";
import { MyMachineReactContext } from "./my-machine";

export default function App({ Component, pageProps }) {
  return (
    <MyMachineReactContext.Provider>
      <Component {...pageProps} />
    </MyMachineReactContext.Provider>
  );
}