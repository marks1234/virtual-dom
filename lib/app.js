export var App = coreState => {
  return h("button", {
    onClick: () => {
      console.log("PLEASE WORK");
      coreState.set("WOW YOU REALLY CLICKED THE BUTTON??????");
    }
  }, "CLICK ME");
};