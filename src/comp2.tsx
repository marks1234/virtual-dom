import { router } from "./core.js"



export const component1 = () => {
  return <p>
    THIS IS COMP1
    <button onClick={() => { router.navigate('/test') }}> </button>
  </p>
}