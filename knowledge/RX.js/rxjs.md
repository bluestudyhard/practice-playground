## Rx.js 的概念和个人理解

[rxjs](https://rxjs.tech/guide/observable)，从本质上来说就是用来操作流的工具库，什么是流呢，比如说在一个在线学堂，我的观众数，提问数之类的数据都不是一开始就有的，而是随着时间产生的，那么这些数据集就是流，Rxjs 就是为了处理这些流而产生的工具，可以进行流的截断(unsubscribe),延迟(setTimeout),防抖(debounceTime)。
而且 rxjs 的流是同步的，但是互相独立的，互相不干扰的。
RxJS 是一个用于处理异步事件流的库
**可以将 RxJS 视为处理事件的 Lodash。**
看到的超赞的[blog1](https://juejin.cn/post/7090422222195523621#heading-13) [blog2](https://juejin.cn/post/7003328753556258846)
RxJS 中解决异步事件管理的基本概念有：

- **Observable（可观察者）**：表示未来（future）值或事件的可调用集合的概念。

- **Observer（观察者）**：是一个回调集合，它知道如何监听 Observable 传来的值。

- **Subscription（订阅）**：表示 Observable 的一次执行，主要用于取消执行。

- **Operator（操作符）**：是纯函数，可以使用 map、filter、concat、reduce 等操作来以函数式编程风格处理集合。

- **Subject（主体）**：相当于一个 EventEmitter，也是将一个值或事件多播到多个 Observers 的唯一方式。

- **Scheduler（调度器）**：是控制并发的集中化调度器，允许我们在计算发生时进行协调，例如 setTimeout 或 requestAnimationFrame 或其它。

## Observables

### 什么是 Observables

可以理解为就是数据流，不同于

## Observer

## Operators 操作符

### 常用的操作符

#### of

- of 用于简便的创造 Observable，这些 Observable 将会直接启动。

```js {.line-numbers}
// of 操作符是会立刻产生3个Observable
of(1, 2, 3).subscribe(console.log);
```

#### pipe

- pipe()和 js 的 pipe 思想是一致的，他可以将几个操作符结合起来，最终返回一个新的 Observable

```js {.line-numbers}
import { pipe } from 'rxjs';

observable.pipe(operator1(), operator2(), operator3(), ...)

```

#### map 和 filter

- js 用的老多了，老朋友，在这里的用法是差不多的，map 返回一个新的 Observable，filter 过滤得到新的

```js {.line-numbers}
of(2, 3, 4)
  .pipe(
    map((x) => x * x),
    filter((value) => value < 10) // 过滤掉value剩下小于10的
  )
  .subscribe((v) => console.log(v));
```

#### fromEvent

- 从 DOM 事件创建一个 Observable

```js {.line-numbers}
const button = document.querySelector("button");
const click$ = fromEvent(button, "click");
```

#### scan

- 有点像 js 的 reduce(),将流的结果叠加

```js {.line-numbers}
fromEvent(btn1, "click")
  .pipe(
    map((x) => 1),
    scan((total, curr) => total + curr)
  )
  .subscribe((v) => {
    console.log(v);
    result1.innerHTML = v.toString();
  });
// 每点击一次就增加 0 1 2 3 4
```

#### mergeWith

- v8 中 merge(合并两个流),被移除了，用 mergeWith 来替代，用法: stream1.mergeWith(stream2),以下是一个简易的加减计算器，demo 在[stackblitz](https://stackblitz.com/edit/rxjs-xrbhmp?file=index.html,style.css,index.ts)

```js {.line-numbers}
fromEvent(btn1, "click")
  .pipe(
    map((x) => 1),
    mergeWith(fromEvent(btn2, "click").pipe(map((y) => -1))),
    scan((total, curr) => total + curr)
  )
  .subscribe((v) => {
    console.log(v);
    result1.innerHTML = v.toString();
  });
```

#### from()

- from()可以把数组，Promise 等转换为一个 Observable
  几乎可以把任何的东西转换为 Observablehhh

```js {.line-numbers}
const array = [10, 20, 30];
const result = from(array);

result.subscribe((x) => console.log(x));

// Logs:
// 10
// 20
// 30
```

#### switchMap (常用 and 重要！)

它用于将 Observable 的每个值映射为一个新的 Observable，并且只发出最新映射的 Observable 的值，忽略先前的映射。
如果连续点击按钮，只有最新的 Observable 会发出值，而之前的 Observable 会被取消,所以这个特性可以用于在搜索框的重复请求

```js {.line-numbers}
const button = document.getElementById("myButton");

fromEvent(button, "click")
  .pipe(
    switchMap((event) => {
      // 返回一个延迟1秒后发出值的Observable
      return of("Clicked!").pipe(delay(1000));
    })
  )
  .subscribe((value) => {
    console.log(value);
  });
```

#### debounceTime()

- 设置节流时间，即多少 ms 内不能发送相同的请求

## Subject

它是一个特殊的 Observable，同时也是一个观察者。Subject 既可以作为数据源（Observable），也可以作为数据的消费者（观察者），其实就是一个多播的 Observable

Subject 的主要用途是在多个订阅者之间共享数据，并且能够将数据广播给所有订阅它的观察者。它允许你在任意时刻动态地向订阅者发送新值。

Subject 可以看作是一个事件总线或广播系统，它可以将值或事件传递给多个订阅者。当你想要在不同的订阅者之间共享数据、将值广播给多个订阅者、或者在任意时刻手动推送新值时，Subject 就非常有用。

以下的我还没用到
Subject 有以下几种类型：

1. **BehaviorSubject**：BehaviorSubject 是一种特殊的 Subject，它会记住最新的值，并在有新的订阅者时立即向其发送该值。新的订阅者会立即收到最新值，然后继续接收后续的值。

2. **ReplaySubject**：ReplaySubject 会在有新的订阅者时，向其发送所有已经发送的值，即使它们在订阅之前已经发出。你可以指定 ReplaySubject 保存的历史记录数量。

3. **AsyncSubject**：AsyncSubject 只会在 Subject 完成时，向订阅者发送最后一个值。如果 Subject 在完成之前没有发出任何值，则订阅者将不会收到任何值。

下面是一个示例，演示了 Subject 的基本用法：

```javascript
import { Subject } from "rxjs";

// 创建一个Subject
const subject = new Subject();

// 订阅Subject
const subscription1 = subject.subscribe((value) => {
  console.log("Subscriber 1:", value);
});

// 发送新值给订阅者
subject.next("Hello");

// 订阅Subject的另一个订阅者
const subscription2 = subject.subscribe((value) => {
  console.log("Subscriber 2:", value);
});
```

Subject 可用于多个订阅者之间的通信和数据共享。它在许多场景下非常有用，例如事件总线、状态管理等。
