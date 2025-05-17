// Callback Hell (bad coding practice, this is not an error) happens when we have many nested callback in an asynchronous code / functions (callback hell is not any kind of error, but reflects to the problem of hard to debug, not easy to understand coding because of heavy nesting of callbacks in asynchronous code )
// To avoid callback hell we have switched to promise with .then and async await syntax

// example of callback hell

setTimeout(function() {
    console.log("1");
    setTimeout(function() {
        console.log("2");
        setTimeout(function() {
            console.log("3");
        }, 2000);
    }, 3000);
}, 1000);

// simplified version of the above code is promise
function promiseSetTimeout(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, duration);
    })
}

// solving callback hell using promise with .then but lead to Promise chaining and then the solution is using async await

// promiseSetTimeout(1000).then(function() {
//     console.log("1")
//     promiseSetTimeout(2000).then(function() {
//         console.log("2")
//         promiseSetTimeout(3000).then(function() {
//             console.log("3");
//         })
//     })
// })

// solving promise chaining with async await

async function main() {
    await promiseSetTimeout(1000);
    console.log("1");
    await promiseSetTimeout(2000);
    console.log("2");
    await promiseSetTimeout(3000);
    console.log("3");
}

// main();