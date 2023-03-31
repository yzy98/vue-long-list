const throttle = (fn, delay) => {
  let timeout = null;
  
  return function() {
    const context = this;
    const args = arguments;

    if (timeout) {
      return;
    }

    timeout = setTimeout(() => {
      fn.apply(context, args);
      timeout = null;
    }, delay);
  }
};

export { throttle };