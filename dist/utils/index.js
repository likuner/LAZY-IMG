// 将宽度和高度转换为有单位的值
export function getValWithUnit(val) {
    if (!val)
        return '0';
    const valStr = val.toString();
    if (['px', '%'].some(k => valStr.endsWith(k)))
        return valStr;
    return `${valStr}px`;
}
