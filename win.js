const queryString = window.location.search
console.log(queryString)
const urlParams = new URLSearchParams(queryString)

const temps = urlParams.get('temps')
const n = urlParams.get('n')

const number = document.querySelector('.number')

console.log(n)
console.log(temps)
number.textContent = `${n}`

const audio1 = document.querySelector('#congrats')
audio1.play()