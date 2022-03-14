/* eslint-disable @typescript-eslint/ban-types */
const DEFAULT_TIMEOUT = 300;
export const debounce = (fn: Function, ms = DEFAULT_TIMEOUT) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
