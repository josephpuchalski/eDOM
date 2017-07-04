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


}

module.exports = DOMNodeCollection;
