import { array, task } from 'fp-ts';

const tasks = [task.of(1), task.of(2)];

const k = task.task;

array.sequence(task.task)(tasks)().then(console.log);
