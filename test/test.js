function counterAnimation(id, start, end, step, duration) {
    const counterElement = document.querySelector(id)
    let range = end - start
    let current = step

    let timer = setInterval(() => {
        current += step
        counterElement.textContent = current

        if(current >= end) {
            clearInterval(timer)
            counterElement.textContent = end
        }
    }, duration)
}

counterAnimation('.test', 12000, 186720, 3252, 90)