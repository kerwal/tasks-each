const tasks_each = require(".");
const { EventEmitter } = require("events");

const devices = [
    {
        name: "Device 1",
        ip: "0.0.0.1"
    },
    // {
    //     name: "Device 2",
    //     ip: "0.0.0.2"
    // },
    // {
    //     name: "Device 3",
    //     ip: "0.0.0.3"
    // },
    // {
    //     name: "Device 4",
    //     ip: "0.0.0.4"
    // },
];

function task1(device, callback) {
    setTimeout(() => {
        console.log(device.name, device.ip, "Task 1: Step 1 complete");
        setTimeout(() => {
            console.log(device.name, device.ip, "Task 1: Step 2 complete");
            setTimeout(() => {
                console.log(device.name, device.ip, "Task 1: Step 3 complete");
                callback('task 1 complete');
            }, 1000);
        }, 1000);
    }, 1000);
}

function task2(device, callback) {
    setTimeout(() => {
        console.log(device.name, device.ip, "Task 2: Step 1 complete");
        setTimeout(() => {
            console.log(device.name, device.ip, "Task 2: Step 2 complete");
            setTimeout(() => {
                console.log(device.name, device.ip, "Task 2: Step 3 complete");
                callback('task 2 complete');
            }, 1000);
        }, 1000);
    }, 1000);
}

function task3(device, callback) {
    setTimeout(() => {
        console.log(device.name, device.ip, "Task 3: Step 1 complete");
        setTimeout(() => {
            console.log(device.name, device.ip, "Task 3: Step 2 complete");
            setTimeout(() => {
                console.log(device.name, device.ip, "Task 3: Step 3 complete");
                callback('task 3 complete');
            }, 1000);
        }, 1000);
    }, 1000);
}


var emitter = new EventEmitter();
emitter.on('item starting', (device) => {
    console.log('starting tasks on', device);
});

emitter.on('task starting', (device, task) => {
    console.log('starting', task.name, 'on', device);
});

emitter.on('task finished', (device, task, result) => {
    console.log('finished', task.name, 'on', device, '; result:', result);
});

emitter.on('item finished', (device, results) => {
    console.log('finished tasks on', device, ", results:", results);
});

tasks_each([task1, task2, task3], devices, emitter)
    .then(() => {
        console.log("done");
    });
