export function debounce(func,delay) {      //节流函数
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        } else {
            setTimeout(() => {
                func.apply(this, args);
            }, delay);
        }
    }
}