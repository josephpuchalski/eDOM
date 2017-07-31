# eDOM (easyDOM)

## A fast and feature-rich JavaScript Library

A lightweight and streamlined JavaScript DOM program that allows users to make changes to the DOM easily with less lines of code.

## How to Use

It is very simple and easy to use in your own JavaScript apps! Here are some examples below:

Add Classes:
```
  eDOM("li").addClass("red");
```
Remove Classes:
```
  eDOM("li").removeClass("red");
```
Add innerHTML:
```
eDOM("li").append(" 2017");
```
Replace innerHTML:
```
eDOM("li").html("hello");
```
Empty innerHTML:
```
  eDOM("li").empty();
```
Remove HTML elements:
```
  eDOM("li").remove();
```

For the complete list, please check out the features below!

## Features

### DOM Traversal and Manipulation
  The library includes the following streamlined functions:
  - html() - Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.

  - empty() - Remove all child nodes of the set of matched elements from the DOM.

  - append() - Insert content, specified by the parameter, to the end of each element in the set of matched elements.

  - attr() - Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.

  - addClass() -  Adds the specified class to each element in the set of matched elements.

  - removeClass() - Remove a single class, multiple classes, or all classes from each element in the set of matched elements.

  - children() - Get the children of each element in the set of matched elements.

  - parent() - Get the parent of each element in the current set of matched elements.

  - find() - Get the descendants of each element in the current set of matched elements.

  - remove() - Remove the set of matched elements from the DOM.

### Event Handling
  The library includes the following support:
  - on() - Attach an event handler function to the selected elements.
  - off() - Remove an event handler.

### AJAX Requesting
  Simplified the process of making an AJAX request
  - ajax()
