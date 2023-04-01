export function debounce (func, delay = 300) {
    let timer;
    return function () {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func()
        }, time)
    }
}
