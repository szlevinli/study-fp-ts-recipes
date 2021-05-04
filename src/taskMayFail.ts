import { either, taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/function';

// tryCatch 属于 interop, 即交互操作
// 解释: 将一个可能会返回拒绝的 `Promise` 转换为永不拒绝的 `Promise`
//       并采用 `Either` 替代
// 原文: Transforms a `Promise` that may reject to a `Promise`
//       that never rejects and return an `Either` instead.
// Signature:
//   <E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E)
//      => TaskEither<E, A>
const fetchGreeting = taskEither.tryCatch<Error, { name: string }>(
  () => new Promise((resolve) => resolve(JSON.parse(`{"name": "Carol"}`))),
  (reason) => new Error(String(reason))
);

// 当调用 `TaskEither` 放回一个 `Promise`, 该 `Promise` resolve 的值是 `Either`
fetchGreeting()
  // `e` 是一个 `Either`
  .then((e) =>
    pipe(
      e, // e :: Either
      // `fold` 函数属于 **destructor**, 即将 `Either` 中的值'压缩'成一个值返回
      // 这里 `either.fold` 是将 `Either<Error, {name: string}>` '压缩' 成 string.
      either.fold(
        (err) => `I'm sorry, I don't know who you are. (${err.message})`,
        (x) => `Hello, ${x.name}`
      )
    )
  )
  .then(console.log);
