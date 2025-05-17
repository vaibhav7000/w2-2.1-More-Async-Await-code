// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);


function sqaure(n) {
    return n * n;
}

function cube(n) {
    return n * n * n;
}


function sumOfSomething(a, b, callback) {
    return callback(a) + callback(b);
}

console.log(sumOfSomething(1, 3, cube));

// Using asynchronous functions like setTimeout, setInterval JS can approach towards asynchronous language / multi-threaded language (can use other thread to do the task) and the main thread can sit ideal and or can do simple stuff


// callbacks are the ugly way of approaching the asynchronous nature of the JS 


function setTimeoutCallback(callback) {
    setTimeout(function(){
        callback("How the things are going!!")
    }, 2000);
}

setTimeoutCallback(function(data) {
    console.log(data);
})

// approach 2 -> promisfied version does not need to pass callback we will map resolve with the function passed in .then and reject will be mapped using .catch
function setTimeoutPromise() {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 2000);
    })
}


setTimeoutPromise().then(function() {
    console.log("Doing the work");
}).catch(function() {
    console.log("error occured!!");
})

// approach 3 Not using .then and .catch Else using async and await

async function main() {
    // will not be using await because we are currently printing the value, if using await we will get undefined because resolve does not return
    const data = await  setTimeoutPromise();
    console.log(data);
}

main();

// callback hell

function sqaure(a) {
    return a * a;
}

function cude(b) {
    return b * b;
}

function sumOfSomething(a, b) {
    return a + b;
}

console.log(sqaure(1), sqaure(2));

// major use of callback is with asynchronous nature of JS
// things that takes time in JS should not be called on the main thread, rather they should be converted into asynchronous code and let the other thread perform the operation

// asynchronous function -> does not runs on the main thread if they run the main thread will be stuck on that
// most of the time we will be using JS provide asnchronous function, but instead of using the callback approach we will converting that into Promise version or either we will get promised asynchronous function like fetch

// async function is not asynchronous function rather it is the syntax to make the asynchronous function call cleaner and easy to manage

// setTimeout, setInterval, fetch, fs.readFile, fs.writeFile all these are asynchronous function => does not run on the main thread

// Using event-loop the main thread picks up the callback functions from the callback queue and then runs according to that

// going away from the main thread means we will be approaching to the asynchronous nature of JS