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