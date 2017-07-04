const DOMNodeCollection = require("./dom_node_collection.js");

function eDOM(selector) {
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);

  } else if (typeof selector === 'function') {
    if (document.readyState === "complete") {
      selector();
    } else {
      eDOM.readyFunctions.push(selector);
      if (eDOM.readyFunctions.length === 1) {
        document.addEventListener("DOMContentLoaded", (event) => {
          eDOM.readyFunctions.forEach( (func) => {
            func(event);
          });
        });
      }
    }
  } else {
    const elementList = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(elementList));
  }
}


window.$e = eDOM;
