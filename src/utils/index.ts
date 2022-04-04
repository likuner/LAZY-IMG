
// converts width and height to values with units
export function getValWithUnit(val: string | number): string {
  if(!val) return '0'
  const valStr = val.toString()
  if( ['px', '%'].some(k => valStr.endsWith(k)) ) return valStr
  return `${valStr}px`
}

// throttle function that unit by milliseconds
export function throttle(fn: Function, delay: number = 300, leading: boolean = true){
  const context = this
  let timer = null
  let executed = false
  return (...args: any[]) => {
    if(!executed && leading) {
      fn.apply(context, args)
      executed = true
    }
    else if(!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, delay)
    }
  }
}