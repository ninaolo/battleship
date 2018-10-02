# Battleship
This is a simple game of Battleship written in JavaScript. It was a school project (lab3 of the course DD2390 at KTH).

NOTE: this app is written with a very simple/basic and old style of JavaScript.

## Running the app
Simply open `index.html` in a browser and start playing.

![Screenshot](/screenshot.png?raw=true)

## Questions from the lab

**What is the differences between == and ===? What is the best practice for using which?**

The difference is that === strictly compares two variables and returns true if the two are of the same type and value. The == also compares for equality after type conversion. For example, 0 == '' but 0 !== ''. The best practice is to use === as much as possible, to avoid confusing cases returning true when they should not be equal.


**Do javascript have classes? Are prototypes classes? Motivate the answer.**

Strictly speaking, JavaScript does not have classes. However, one can imitate the behavior of classes by using prototypes, but there are differences. Prototypes are a style of object-oriented programming where it is possible to have inheritance between classes by writing a prototype and letting other classes clone from this.

EDIT: JavaScript classes were introduced in ECMAScript 6. These are however 'syntactical sugar' for the existing prototype-based inheritance.


**What is a callback in Javascript?**

A callback is a way of using a JavaScript function and can be seen as a pattern. A callback function is a function which is passed to another function and executed inside of it. They can for example be stored in variables and used later. A callback function is a `closure`, meaning that it can use variables within the executing function's scope.


**How are callbacks used asynchronously?**

Callbacks allows for asynchronous execution of code, meaning that the code can run 'sometime in the future'. For example, this is useful when dealing with file downloads, user input etc. which might take some time. An example:

```downloadFile('http://example.com/file.txt', handleFile)```

This allows for the function handleFile() to be executes asynchrolously when the download is complete, without blocking the whole program.


