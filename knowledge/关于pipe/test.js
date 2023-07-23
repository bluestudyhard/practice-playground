// let arr = [1, 2, 3];
// let arr2 = [...arr];
// 在这里的话，...arr是js里的剩余参数，默认格式...args，也就是说，他会根据你参数的多少来判断后续的操作，不需要一开始自定义参数。
// let func3 = (...arr) => arr.reduce((a, b) => a + b, 0);
// console.log(func3(1, 2, 3, 4));

// array.reduce(callback, initialValue)
// 一般用法 array.reduce((累加器, 当前值) => a + b, 0) 每次计算他会自己遍历数组，然后根据当前值和前一次计算的结果累加，函数同理
// 逐步解读一下pipe (...funcs)=>{ } 是剩余参数，表示每一个参数都是一个函数
// return (args)=>{ } 是最终函数的返回值，初始值为args
// return funcs.reduce((result, func)=>{ }, args) 是一个数组的reduce方法，result是上一次计算的结果，func是当前的函数，args是初始值
// return func(result) 是每次计算的结果，也就是说，每次计算都会调用一次函数，然后将结果返回给下一次计算
/**const pipe = (...funcs) => { ... }：这是一个箭头函数的定义，使用剩余参数语法（...funcs）接收任意数量的函数作为参数，并将它们存储在 funcs 数组中。

return (arg) => { ... }：这是一个内部的箭头函数，它接受一个参数 arg，表示要传递给第一个函数的参数。

return funcs.reduce((result, func) => { ... }, arg);：这是一个使用 reduce 方法的语句，用于按顺序调用每个函数并传递参数。

funcs.reduce(...)：reduce 方法用于遍历 funcs 数组中的每个函数，并将它们连接起来。
(result, func) => { ... }：这是 reduce 方法的回调函数，它接受两个参数：result 表示上一个函数的返回值，func 表示当前要调用的函数。
return func(result);：在每次迭代中，回调函数将调用当前的函数 func，并将上一个函数的返回值 result 作为参数传递给当前函数。函数调用的结果将成为下一次迭代的 result 值。
最终，pipe 函数返回一个新的函数，该函数将按顺序调用每个函数，并将初始参数 arg 传递给第一个函数。 */

// const pipe = (...funcs) => {
//   return (args) => {
//     return funcs.reduce((result, func) => {
//       return func(result);
//     }, args);
//   };
// };
// let func = (x) => x + 1;
// let func1 = (x) => x + 2;

// let result = pipe(func, func1)(1); // 4
// console.log(result);
