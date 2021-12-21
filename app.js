const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ffc620','#00dced','#9f00ff','#ff0061','#3FB568','#ffcfd3' ]


let time = 0
let score = 0
let interval = 0

function Start(){
    startBtn.addEventListener('click', event => {
    event.preventDefault() 
    screens[0].classList.add('up')
    timeListF()
})
}

function timeListF(){
    timeList.addEventListener('click', event =>{
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[2].classList.remove('down')
        screens[1].classList.add('up')
    }
    startGame()
})
}


function boardF(){
    board.addEventListener('click',event => {
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})
}

function startGame(){
    interval = setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
    boardF()
    
}


function finishGame(){
    clearInterval(interval)
    timeEl.parentNode.classList.add('hide')
    board.innerHTML += `<h1>Score: <span class = "primary">${score}</span></h1>`  
}



function decreaseTime(){
    if (time <= 0){
        finishGame()  
    } else {
        let current = --time
        if (current < 10){
            current = `0${current}`
        }
        setTime(current)
    }
}
function setTime(value){
    timeEl.innerHTML = `00:${value}`
}


function createRandomCircle(){
    const circle = document.createElement('div')
    circle.classList.add('circle')
    setColor(circle)
    const {width, height} = board.getBoundingClientRect()
    const size = getRandomNumber(10, 60)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    board.append(circle)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
}


function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}


function setColor(element){
    const color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor(){
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}


Start()



// automatically kills the balls
// function winTheGame(){
//     function kill(){
//         const circle = document.querySelector('.circle')
        
//     }
//     if (circle){
//         kill()
//     }
//     setInterval(kill, 42)
// }
