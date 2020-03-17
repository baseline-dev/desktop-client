const EventEmitter = require('events');

let emitter;
function getEventBus() {
  if (emitter) return emitter;
  emitter = new EventEmitter();
  return emitter;
}

export {
  getEventBus
}