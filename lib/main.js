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

eDOM.readyFunctions = [];

eDOM.extend = function (obj, ...args) {
  args.forEach((el) => {
    Object.keys(el).forEach((key) => {
      obj[key] = el[key];
    });
  });
  return obj;
};

eDOM.ajax = function (options) {
  const defaults = {
    method: 'GET',
    url: null,
    dataType: 'JSON',
    data: {},
    success: () => {},
    error: () => {}
  };

  eDOM.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(defaults.method, defaults.url);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      defaults.success(JSON.parse(xhr.response));
    } else {
      defaults.error();
    }
  };
  xhr.send(JSON.stringify(defaults.data));

};



window.$e = eDOM;
