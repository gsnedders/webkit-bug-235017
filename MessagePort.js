// Create a random id to distinguish this worker's messages.
const id = Math.random().toString(16);
console.log('worker', id);

// Listen for a MessagePort sent by the page.
addEventListener('message', event => {
  console.log(id, 'received port');
  /** @type {MessagePort?} */ const port = event.data;

  // Return the MessagePort after receiving a message on it.
  port.start();
  port.addEventListener('message', event => {
    console.log(id, 'received message', event.data);
    // @ts-ignore
    postMessage(port, [port]);
  }, { once: true });
});