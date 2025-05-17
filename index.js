// run `node index.js` in the terminal

const fs = require("fs");


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

// Promises will be used to pass callback to the already implemented asynchronous function rather using the callback syntax 
// Most of the time we will be using the already implemented asynchronous functions


// we be writing "copyright Vaibhav Chawla" to the a.txt after the data present in it

// approach 1 callback syntax
function readAndWriteCopyRight(path, writeData, successCallback, errorCallback) {
    fs.readFile(path, "utf-8", function(err, data) {
        if(!err) {
            const finalData = data + " " + writeData
            console.log(finalData)
            successCallback(path, finalData) // here will be writing the final data
            return
        }

        errorCallback(err);
    }); 
}

readAndWriteCopyRight("./a.txt", "CopyRight Vaibhav Chawla", (path, finalData) => {
    // will be writing data into the file
    fs.writeFile(path, finalData, {
        encoding: "utf-8",
        flag: "a",  // flag: "a" -> means does not clear the data already present rather append that with the previous one
    }, function(err) {
        if(err) {
            console.log("error occured while writing the data");
        }
    })
}, function(err) {
    console.log(err);
})


// we will never ever create our asynchronous function rather we have simplified the passing of the callback function to these functions so that they will looks cleaner

// approach 2 using .then() and .catch() to pass the callback 

function readAndWriteFilePromise(path, writeData) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, "utf-8", function(err, data) {
            if(!err) {
                const finalData = data + " " + writeData;
                fs.writeFile(path, finalData, {
                    encoding: "utf-8",
                    flag: "a",
                }, function(err) {
                    if(err) {
                        reject({
                            err,
                            fromWhere: "This comes from the write file",
                        })
                        return
                    }

                    resolve({
                        data: finalData, 
                        fromWhere: "No error came"
                    })
                })

                return
            }

            reject({
                err,
                fromWhere: "this error is from the read file"
            });
        })
    })
}

readAndWriteFilePromise("./a.txt", "CopyRight Vaibhav Chawla").then(function(data) {
    console.log("This will be an object")
    console.log(data);
}).catch(function(err) {
    console.log(err);
})

// approach 3 using the async await syntax rather then using .then and .catch, when using the async await we have to wrap the promised version of function into new function, its the syntax

async function main(path, finalData) {
    try {
        const data = await readAndWriteFilePromise("./a.txt", "CopyRight Vaibhav Chawla");
        console.log(data);
    } catch(err) {
        console.log(err);
    }
}