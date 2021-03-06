/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor(elements) {
    this.elements = elements;
  }

  html(string) {
    if (string === undefined) {
      if (this.elements.length > 0) {
        return this.elements[0].innerHTML;
      }
    } else {
        this.elements.forEach((element) => {
          element.innerHTML = string;
        });
      }
    }

  empty() {
    this.html('');
  }

  append(arg) {
    this.elements.forEach((element) => {
      if (arg instanceof DOMNodeCollection) {
        let html = '';
        arg.elements.forEach((newElement) => {
          html += newElement.outerHTML;
        });
        element.innerHTML += html;
      } else if (arg instanceof HTMLElement) {
        element.innerHTML += arg.outerHTML;
      } else if (typeof arg === 'string') {
        element.innerHTML += arg;
      }
    });
  }

  attr(name, value) {
    if (value === undefined) {
      if (this.elements.length > 0) {
        return this.elements[0].getAttribute(name);
      } else {
        this.elements.forEach((element) => {
          if (value === null) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value);
          }
        });
      }
    }
  }

  addClass(name) {
    this.elements.forEach((element) => {
      if (element.className === "") {
        element.className = name;
      } else {
        let classNames = element.className.split(' ');
        if (!classNames.includes(name)) {
          classNames.push(name);
        }
        element.className = classNames.join(' ');
      }
    });
  }

  removeClass(name) {
    this.elements.forEach((element) => {
      let classNames = element.getAttribute("class").split(' ');
      classNames = classNames.filter((element) => element !== name);
      if (classNames.length === 0) {
        element.removeAttribute("class");
      } else {
        element.setAttribute("class", classNames.join(' '));
      }
    });
  }

  children() {
    let result = [];
    this.elements.forEach((element) => {
      result = result.concat(Array.from(element.children));
    });
    return new DOMNodeCollection(result);
  }

  parent() {
    let result = [];
    this.elements.forEach((element) => {
      result.push(element.parentNode);
    });
    return new DOMNodeCollection(result);
  }

  find(selector) {
    let result = [];
    this.elements.forEach((element) => {
      let elementList = element.querySelectorAll(selector);
      result = result.concat(Array.from(elementList));
    });
    return new DOMNodeCollection(result);
  }

  remove() {
    this.elements.forEach((element) => {
      const parent = element.parentNode;
      parent.removeChild(element);
    });
    this.elements=[];
  }

  on(type, callback) {
    this.elements.forEach((element) => {
      element.addEventListener(type, callback);
      element[`eDOM-${type}-listener`] = callback;
    });
  }

  off(type) {
    this.elements.forEach((element) => {
      let callback = element[`eDOM-${type}-listener`];
      element.removeEventListener(type, callback);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

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




window.eDOM = eDOM;


document.addEventListener('DOMContentLoaded', () => {

eDOM(".add-class").on("click", () => {
  eDOM("li").addClass("red");
});

eDOM(".remove-class").on("click", () => {
  eDOM("li").removeClass("red");
});

eDOM(".empty-text").on("click", () => {
  eDOM("li").empty();
});

eDOM(".replace-text").on("click", () => {
  eDOM("li").html("hello");
});

eDOM(".remove-elements").on("click", () => {
  eDOM("li").remove();
});

eDOM(".append-text").on("click", () => {
  eDOM("li").append(" 2017");
});




});


/***/ })
/******/ ]);