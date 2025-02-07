function simulateMemoryLeak() {
    const data = [];
    console.log("Start:");
    logUsage();

    const interval = setInterval(() => {
        for (let i = 0; i < 1000; i++) {
            data.push(new Array(1000).join('x'));
        }
        if (data.length > 100000) {
            cleanup(data);
        }
    }, 100);

    setTimeout(() => {
        console.log("After 1 minute:");
        logUsage();
        clearInterval(interval);
    }, 60000);
}

function logUsage() {
    if (performance.memory) {
        console.log(`Used: ${Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)} MB`);
    } else {
        console.warn("performance.memory is not supported in this browser.");
    }
}

function cleanup(array) {
    array.length = 0;
    logUsage();
}

simulateMemoryLeak();


/*
Output:
Start:
VM265:24 Used: 24 MB
undefined
VM265:24 Used: 66 MB
VM265:24 Used: 58 MB
VM265:24 Used: 50 MB
VM265:24 Used: 73 MB
VM265:24 Used: 66 MB
VM265:16 After 1 minute:
VM265:24 Used: 26 MB
*/