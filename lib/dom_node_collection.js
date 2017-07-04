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
      element[`gemQuery-${type}-listener`] = callback;
    });
  }

  off(type) {
    this.elements.forEach((element) => {
      let callback = element[`gemQuery-${type}-listener`];
      element.removeEventListener(type, callback);
    });
  }
}

module.exports = DOMNodeCollection;
