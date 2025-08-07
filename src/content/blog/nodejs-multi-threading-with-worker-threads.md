---
title: Node.js Multi-Threading with Worker Threads
description: Boost Node.js performance for CPU-heavy tasks using Worker Threads
publishDate: 2024-09-10 22:39:07
img: https://cdn.hashnode.com/res/hashnode/image/upload/v1726017030358/0e5bc502-246f-4370-926b-a4243b5ad509.png
# img_alt
tags:
  - worker-threads
  - nodejs
---

Have you ever wondered how **JavaScript/Node.js** efficiently handles complex requests despite being single-threaded? What happens when a CPU-intensive task runs on your backend, affecting other requests? Is there a way to run these tasks separately and simultaneously? In this article, we'll explore how to achieve this by understanding single-threading vs. multi-threading and how the _Worker Threads_ module can help improve Node.js performance.

##### **SIngle-threaded JavaScript:**

We all know that, unlike languages like **C++**, **C#**, and **Java**, which support multi-threading, JavaScript is single-threaded because it was originally built for client-side scripting to make web pages interactive and run only in the browser. But over time, we can now run JavaScript on the server thanks to Node.js. Due to this single-threaded nature, Node.js is very efficient for I/O-bound tasks.

Node.js's non-blocking I/O model has an event loop at its core, allowing Node.js to perform non-blocking operations even though JavaScript is single-threaded. The event loop enables Node.js to handle multiple concurrent operations efficiently, despite its single-threaded nature.

**Why Multi-Threading is Important in Node.js**:

Now, when dealing with CPU-heavy tasks, the single-threaded nature of Node.js can struggle, causing performance issues. For example, if the main thread handles a time-consuming task like file compression or heavy computation, simple HTTPS requests can take too long to respond. This creates performance issues for the user, which can be very frustrating. To resolve these issues and improve performance, multi-threading can be a great solution.

Before diving into how to achieve multi-threading, let's first understand single-threading and multi-threading and their differences.

### Single vs. Multi-threading:

**Single-threading** refers to executing one task at a time on a single core. This means that only one operation can be processed sequentially at any given moment. For example, if you have two tasks to complete, the second task must wait for the first task to finish, regardless of how long the first task takes. This approach can lead to blocking, where the current task being processed delays the execution of subsequent tasks until it is completed.

On the other hand, **multi-threading** refers to executing multiple operations or tasks simultaneously at any given moment. In this method, instead of waiting for one process to complete, multiple tasks are executed concurrently by dividing them into multiple threads. This allows tasks to be processed at the same time, improving efficiency and performance.

#### Example:

Imagine a restaurant with only one chef in the kitchen who can prepare only one dish at a time. When orders come in, they pile up, and it takes a long time to complete them. Customers have to wait a long time to get their orders, which can become a major issue and slow down the entire restaurant.

Imagine having multiple chefs in the restaurant, each handling different dishes at the same time. This helps orders get prepared faster and serves customers more quickly, improving the overall performance of the restaurant.

Similarly, in an application, single-threading can lead to delays and performance issues, whereas multi-threading can achieve better performance with the help of concurrency and parallelism.

#### How Multi-Threading Works on Single-Core vs Multi-Core CPUs:

#### Single-core:

One question you might have is whether multi-threading is possible on a single-core CPU, given that single-threading refers to executing one task at a time on a single core. The answer is yes, but it does not achieve true parallelism. However, it still provides better performance than single-threading.

Too overwhelming? Let me explain. On a multi-core system, each thread runs on a single core. So, if you have 2 processes, in multi-threading, two threads will run these processes in parallel on 2 different cores. Now you might wonder, what if you have 10 processes to run but only 8 cores available? Or you have a single core but want to execute two threads? How will this be managed?

Well, there are a few important methods through which these results are achieved. Let's discuss some of them briefly.

1. **Time slicing:** In this method, each thread gets a small, equal slice of CPU time in rotation, executing the threads concurrently. The CPU rapidly switches between different tasks, giving each a small slice of processing time. This creates the illusion of parallel processing, even though only one task is running at any given moment.

2. **Context switching:** In this method, the CPU rapidly switches between processes, saving the state of the current execution and loading the next. This is repeated to provide concurrent execution.

3. **Priority-based scheduling:** Priorities are assigned to threads, with higher-priority threads getting more time and being executed first. This is helpful for critical tasks that need to be prioritized.

##### Multi-core:

The above methods for a single core work well when the number of threads is greater than the CPU cores. Let's discuss some additional methods:

1. **Load-balancing:** The operating system distributes tasks among multiple CPU cores based on the current load. This ensures that all the cores are used effectively and efficiently.

2. **Thread pools:** The number of active threads is kept to match the number of cores, and the rest are queued and executed as soon as a core becomes available.

3. **Work Stealing:** In this method, idle cores will take tasks from the queues of busy cores, increasing the efficiency of running tasks.

There are also several other methods to use multi-threading in single-core or multi-core systems, but the ones mentioned above are the most commonly used. It's worth mentioning that almost every modern CPU has multiple cores, making the use of multi-core threading increasingly relevant.

Now I've mentioned a few times that running on a single core isn't true parallelism; it offers concurrency. So next, let's understand the difference between concurrency and parallelism.

### Concurrency vs. Parallelism:

> "Concurrency is about dealing with lot of things at once, Parallelism is about doing a lot of things at once" - Rob Pike

As Rob Pike said, concurrency is when you're dealing with multiple things at once. For example, imagine a chef cooking multiple dishes. The chef might switch between tasks, like cutting vegetables while rice is cooking, then frying chicken while waiting for the dal to finish. When executing multiple threads on a single core, the CPU switches rapidly between threads, handling multiple tasks at once using the methods discussed above.

Parallelism, on the other hand, is doing multiple tasks at the same time. This is like having multiple chefs work on their own dish independently, which is true parallelism. True parallelism is achievable on multi-core CPUs where each thread runs on its own core.

For more about this, you can watch [**Concurrency is not Parallelism by Rob Pike**](https://youtu.be/oV9rvDllKEg?si=r1rAcivJq6x1QISn)

### When to Use Multi-Threading in Node.js

As mentioned earlier, Node.js can handle I/O-bound tasks efficiently due to its non-blocking I/O model and the Event Loop. This allows Node.js to perform non-blocking operations effectively. These I/O-bound tasks mainly include fetching data from a database, making API calls, or reading files. Behind the scenes, Node.js uses libuv, a multi-platform support library, to handle asynchronous I/O operations efficiently. You can read more about libuv [here](https://docs.libuv.org/en/v1.x/).

However, when CPU-intensive tasks, also known as CPU-bound tasks like processing images, performing heavy computations, or running loops, come into play, they take time to execute. This causes the Event Loop to be blocked until the task is completed. As a result, other simple tasks or requests cannot be executed, leading to significant performance issues. This goes against the golden rule of Node.js: [Don't block the Event Loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop).

To solve the problem of CPU-intensive tasks, we need to use multi-threading. This is where the Node.js worker threads module becomes useful.

### Introducing the Node.js Worker Threads Module

The Node.js **worker threads** module was introduced in Node 10.5.0 and was released as stable in Node v12 LTS.

Before understanding how it works, it's important to understand the concept of processes and threads.

#### Process vs. Thread:

A **process** is a running program within the operating system that has its own memory and can execute one task at a time. One process cannot see or access the memory of other processes. On single-core machines, these processes run on a single thread concurrently by rapidly switching between them, as explained above. On multi-core machines, the processes run in parallel with one process on each core. If there are more processes than cores, they will be executed concurrently with the help of each core.

Unlike processes, **threads** do not have their own memory and reside within the memory of one process. When we create a process, it can have multiple threads within the same memory. These threads can communicate with each other through messages and can also pass data using the process's memory.

#### Worker Threads:

The worker threads module in Node.js allows the application to offload CPU-intensive tasks to another thread, helping to avoid blocking the main thread. This way, the CPU-intensive task runs in another thread using the same process's memory and can communicate with the main thread through messages, sharing data and improving performance.

Let's create a demo Node.js application with Express to see how to implement this module and how it affects our performance. For example, we will use a for loop running 10 billion times and observe the output.

### Implementing Worker Thread Module

To implement the `worker_threads` module, let's create a simple `Express` app and demonstrate how we can offload the CPU-intensive task to a separate thread and improve performance.

Start a Node.js project by initializing it with the following command:

```bash
npm init
```

Next, install **express** to set up the server:

```bash
npm i express
```

Create a file called `app.js` and set up the Express app to run on port 3000:

```javascript
import express from 'express';

const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
  if (!error) console.log(`Server is successfully running on port ${PORT}`);
  else console.log(`Error occurred, server can't start. Details: ${error}`);
});
```

Add a simple `/` home route to return a success message:

```javascript
app.get('/', (_, res) => {
  res.json({ success: true, message: 'Home page' });
});
```

Now, let’s create the `/worker` route, which runs a CPU-intensive task (e.g., a for loop that runs 10 billion times):

```javascript
app.get('/worker', (_, res) => {
  let count = 0;
  for (let index = 0; index < 10000000000; index++) {
    count++;
  }
  res.json({ success: true, message: 'Worker page', value: count });
});
```

Start the server:

```bash
node app.js # or index.js
```

Using **Postman**, let's test both endpoints. First, hit the home endpoint and see the results:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725965076019/b166bbd4-5e2e-439e-a077-6d712c8fac28.png)

The `/` home route responds quickly.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725965269392/57b2b8de-a347-4317-b6d4-e23616aa5f77.png)

The `/worker` route takes around 7 seconds to complete the task. Now let's hit the `/worker` route first and then the `/` home route

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725965349571/d8cbbb9d-d2c4-488a-bd6c-04665d3ddb40.png)

The worker page took 7 seconds, just like before.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725965392230/f6a3f2fb-4591-4241-b91b-be8ba4294b3c.png)

But surprisingly, the home page with just a minimal response took 5 seconds. This is because, since it's running on a single thread, the worker route blocked the execution of the request to the home page.

To solve the blocking issue, we can offload the CPU-intensive task to another thread using Node.js's **worker_threads** module.

First, let's move the logic to a new file called `worker-thread.js`.

```javascript
// worker-thread.js
let count = 0;
for (let index = 0; index < 10000000000; index++) {
  count++;
}
```

Then, create a `worker-thread` route and import the Worker class from the `worker_threads` module.

```javascript
import { Worker } from 'node:worker_threads';

app.get('/worker-thread', (_, res) => {
  //
});
```

Now, using the `parentPort` method of `worker_threads`, we can send data from the `worker-threads.js` file to the parent port using the message event, which will be triggered.

```javascript
import { parentPort } from 'node:worker_threads';

let count = 0;
for (let index = 0; index < 10000000000; index++) {
  count++;
}

parentPort.postMessage(count);
```

Now, using the Worker class, we can receive the data with the message event by providing the file path to a Worker instance and send the received data in a response as follows:

```javascript
app.get('/worker-thread', (_, res) => {
  const worker = new Worker('./worker-thread.js');
  worker.on('message', (count) => {
    res.json({ success: true, message: 'Worker threads page', value: count });
  });
});
```

Now, restart the server and test the endpoints again with Postman. We'll test by running the worker-thread endpoint and then the home page to see if the response is delayed or not.

Response from the home page:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725966520099/cfb77e89-acfe-4133-a287-69c341cbc1a0.png)

Response from the worker-threads route:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725966558407/47414758-f6af-4fa5-af84-7a6b3282f465.png)

As demonstrated, the **worker-thread** route no longer blocks the request to the home page, even though it still takes 7 seconds to complete the for loop and send the response. This improvement is possible because the logic is now handled in a separate thread, enabling our program to process tasks in parallel. If you'd like to explore the complete implementation, feel free to visit the full code in the [GitHub repository](https://github.com/dushmanta05/worker-threads).

By utilizing the **worker_threads** module, you can easily offload CPU-intensive tasks to separate threads, preventing them from impacting the performance of the main thread. This significantly boosts the efficiency of your application, particularly by avoiding event loop blocking. For more detailed information on **worker_threads** or other methods of multi_threading modules in Node.js, you can refer to the [official documents](https://nodejs.org/api/worker_threads.html).

### Note:

**Parallelism:** The worker-threads module makes our application more efficient by improving performance through offloading CPU-intensive tasks to another thread. However, it's worth mentioning that we can only achieve true parallelism if the deployed server has multiple core CPUs. With single-core CPUs, we can achieve concurrency, as mentioned earlier.

**Thread Management:** It's also important to remember that multi-threading comes with challenges. It can increase code complexity, leading to issues like race conditions, thread synchronization,, and memory sharing. So, while using worker-threads, you should be careful with the implementation.

---

I hope this article has helped clarify the concept of multi-threading and how you can leverage the **worker_threads** module to enable multi-threading in Node.js. If you spot any errors or have feedback and suggestions for improvement, I'd love to hear from you. Thank you for reading, and have a wonderful day! :)
