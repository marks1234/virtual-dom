import { State } from "./framework/state.js"

export const App = (coreState: State<string>) => {
  return <button style="background-color:red;" className="" onClick={() => {
    console.log("PLEASE WORK")
    coreState.set("WOW YOU REALLY CLICKED THE BUTTON??????")
  }}>CLICK ME</button>

} 