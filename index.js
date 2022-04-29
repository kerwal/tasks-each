const async = require("async");
const { EventEmitter } = require("events");

// tasks_each(tasks, array, event_callback) - calls each function in tasks[] in sequence for each item in array[]
//  and passes the item to the function
//  - tasks (function[]): the list of functions to call for each item in array[]
//      task functions must be in the form: (item, next) => { next(result|Error); }
//  - items (object[]): the list of items to call the functions for
//  - emitter (EventEmitter): an EventEmitter to receive the events:
//          - 'item starting'
//          - 'task starting'
//          - 'task finished'
//          - 'item finished'
function tasks_each(tasks, items, emitter) {
    // validate emitter once
    var events = undefined;
    if (emitter && emitter instanceof EventEmitter)
        events = emitter;
    // TODO return total results in Promise resolution
    // for each item in array, call tasks and hand the item to each
    return async.each(items, (item, item_callback) => {
        // emit 'starting' event
        events.emit('item starting', item, tasks);
        // console.log("launching tasks on:", "Item " + array.findIndex(_item => _item === item));
        const series_funcs = tasks.map(task => (task_callback) => {
            // emit 'task starting' event
            events.emit('task starting', item, task);
            task(item, (result) => {
                // emit 'task finished' event
                events.emit('task finished', item, task, result);
                // when the task/func is complete on item then call the callback to satisfy async
                task_callback(null, result);
            });
        });
        async.series(series_funcs)
            .then((results) => {
                // emit 'finished' event
                events.emit('item finished', item, results);
                // when series is complete on item then call the callback to satisfy async
                item_callback();
            })
            .catch((error) => {
                console.log(error);
            });
    });
}

module.exports = tasks_each;

// TODO should Task function receive results or status from previous Task functions?