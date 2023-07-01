export const debounce = (fn: Function, delay: number) => {
    let timeout: number

    return (...args: any[]) => {
        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
