export var App = coreState => {
  return h("button", {
    style: "background-color:red;",
    className: "",
    onClick: () => {
      console.log("PLEASE WORK");
      coreState.set("WOW YOU REALLY CLICKED THE BUTTON??????");
    }
  }, "CLICK ME");
};