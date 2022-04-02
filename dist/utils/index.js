"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValWithUnit = void 0;
// 将宽度和高度转换为有单位的值
function getValWithUnit(val) {
    if (!val)
        return '0';
    const valStr = val.toString();
    if (['px', '%'].some(k => valStr.endsWith(k)))
        return valStr;
    return `${valStr}px`;
}
exports.getValWithUnit = getValWithUnit;
