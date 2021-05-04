import { task } from 'fp-ts';

const deepThought: task.Task<number> = () => Promise.resolve(100);

deepThought().then((n) => {
  console.log(`The answer is ${n}`);
});
