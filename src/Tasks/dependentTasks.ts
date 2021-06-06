import { pipe } from 'fp-ts/function';
import { map, of } from 'fp-ts/Task';

pipe(
  of(2),
  map((v) => v * 3),
  map((v) => v + 4)
)().then((v) => console.log(v));
