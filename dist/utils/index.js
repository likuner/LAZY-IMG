"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.getValWithUnit = void 0;
// converts width and height to values with units
function getValWithUnit(val) {
    if (!val)
        return '0';
    const valStr = val.toString();
    if (['px', '%'].some(k => valStr.endsWith(k)))
        return valStr;
    return `${valStr}px`;
}
exports.getValWithUnit = getValWithUnit;
// throttle function that unit by milliseconds
function throttle(fn, delay = 300, leading = true) {
    const context = this;
    let timer = null;
    let executed = false;
    return (...args) => {
        if (!executed && leading) {
            fn.apply(context, args);
            executed = true;
        }
        else if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, delay);
        }
    };
}
exports.throttle = throttle;
