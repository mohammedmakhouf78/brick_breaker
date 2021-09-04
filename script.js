let app = document.getElementById('app')
let player = document.getElementsByClassName('player')[0]
let playerBar = document.getElementById('player-bar')
let enemyContainer = document.getElementById('objs')
let enemy = document.getElementsByClassName('obj')[0]
let enemies = document.getElementsByClassName('obj')
let tempPlayer = document.getElementById('temp-player')
let continueButton = document.getElementById('continue-btn')
let scoreSpan = document.getElementById('score')
let liveSpan = document.getElementById('lives')
let playAgainbutton = document.getElementById('play-again')
let screenWidth = document.body.clientWidth
let screenHeight = screen.height
let gameIsPlaying = true
let startLeft = Math.floor(Math.random() * screenWidth)
let startBottom = 30
let moveLeft = 1
let moveBottom = 1
let barStartLeft = 0
let barMoveleft = 15
let enemyPosition = 15
let PlayerRect;
let ballSpeed = 0.1
let score = 0
let lives = 10

document.onkeydown = keyCheck
addEnemys()

for (let item of document.getElementsByClassName('player')) {
    PlayerRect = item.getBoundingClientRect()
}

if (gameIsPlaying) {
    setInterval((e) => {
        checkIfOutOfBoundries()
        movePlayerBall()
        playerDied()
        gameEnded()
    }, 1)
}





function checkIfOutOfBoundries() {
    let playerPosition;
    for (let item of document.getElementsByClassName('player')) {
        playerPosition = getPositionAtCenter(item)
    }
    if (startLeft >= screenWidth) {
        if(moveLeft > 0){
            moveLeft = -moveLeft
        }else{
            moveLeft = -moveLeft
        }
    }
    if (startBottom >= screenHeight - 150) {
        if(moveBottom > 0){
            moveBottom = -moveBottom
        }else{
            moveBottom = -moveBottom
        }
    }
    if (startBottom <= 0) {
        if(moveBottom > 0){
            moveBottom = moveBottom
        }else{
            moveBottom = - moveBottom
        }
    }
    if (startLeft <= 50) {
        if(moveLeft > 0){
            moveLeft = moveLeft
        }else{
            moveLeft = - moveLeft
        }
    }
    for (let item of enemies) {
        let enemyPosition = getPositionAtCenter(item)
        let distance = Math.hypot(playerPosition.x - enemyPosition.x, playerPosition.y - enemyPosition.y)
        if (distance >= 0 && distance <= 40 && !item.classList.contains('broken')) {
            item.classList.add('broken')
            moveBottom *= -1
            checkToIncreaseSpeed()
            score += 1
            scoreSpan.innerHTML = score
        }
    }

}

function playerDied() {
    let playerPosition;
    for (let item of document.getElementsByClassName('player')) {
        playerPosition = item.getBoundingClientRect()
    }

    let barPosition = playerBar.getBoundingClientRect()
    
    if(isCollide(playerPosition,barPosition)){
        moveBottom *= -1
    }


    if (startBottom <= 0) {
        continueButton.style.display = "initial"
        startLeft = 500
        startBottom = 200
        player.style.display = "none"
        tempPlayer.style.display = "initial"
        tempPlayer.style.bottom = `${startBottom}px`
        tempPlayer.style.left = `${startLeft}px`

        if(gameIsPlaying){
            lives -= 1
            liveSpan.innerHTML = lives
        }

        gameIsPlaying =false
    }


}

function getPositionAtCenter(element) {
    const { top, left, width, height } = element.getBoundingClientRect()
    return {
        x: left + width / 2,
        y: top + height / 2
    }
}

function movePlayerBall() {
    startBottom += moveBottom
    startLeft += moveLeft
    player.style.bottom = `${startBottom}px`
    player.style.left = `${startLeft}px`
}


function keyCheck(e) {
    e = e || window.event;
    if (e.keyCode == '37' && barStartLeft >= 50) {
        barStartLeft -= barMoveleft
        playerBar.style.left = `${barStartLeft}px`
    }

    else if (e.keyCode == '39' && barStartLeft <= screenWidth - 100) {
        barStartLeft += barMoveleft
        playerBar.style.left = `${barStartLeft}px`
    }
}

function addEnemys() {
    for (let i = 0; i < 142; i++) {
        enemyContainer.append(enemy.cloneNode())
    }
}


function checkToIncreaseSpeed(){
    let brockenElementsCount = document.getElementsByClassName('broken').length
    if (brockenElementsCount % 3 == 0 && brockenElementsCount != 0 ){
        if (moveLeft > 0){
            moveLeft += ballSpeed
        }else{
            moveLeft -= ballSpeed
        }
        if(moveBottom > 0){
            moveBottom += ballSpeed
        }else{
            moveBottom -= ballSpeed
        }
        barMoveleft += 5
    }
}




function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function resumePlaying(){
    console.log('continue')
    startLeft = 500
    startBottom = 200
    player.style.display = "initial"
    tempPlayer.style.display = "none"
    player.style.bottom = `${startBottom}px`
    player.style.left = `${startLeft}px`

    continueButton.style.display = "none"

    gameIsPlaying = true
}

function gameEnded(){
    if (lives <= 0){
        gameIsPlaying = false
        app.style.display = 'none'
        playAgainbutton.style.display = 'initial'
    }
}

function playAgain(){
    gameIsPlaying = true
    app.style.display = 'initial'
    app = document.getElementById('app')
    player = document.getElementsByClassName('player')[0]
    playerBar = document.getElementById('player-bar')
    enemyContainer = document.getElementById('objs')
    enemy = document.getElementsByClassName('obj')[0]
    enemies = document.getElementsByClassName('obj')
    tempPlayer = document.getElementById('temp-player')
    continueButton = document.getElementById('continue-btn')
    scoreSpan = document.getElementById('score')
    liveSpan = document.getElementById('lives')
    screenWidth = document.body.clientWidth
    screenHeight = screen.height
    gameIsPlaying = true
    startLeft = Math.floor(Math.random() * screenWidth)
    startBottom = 30
    moveLeft = 1
    moveBottom = 1
    barStartLeft = 0
    barMoveleft = 15
    enemyPosition = 15
    PlayerRect;
    ballSpeed = 0.1
    score = 0
    lives = 10

    scoreSpan.innerHTML = score
    liveSpan.innerHTML = lives

    enemyContainer.innerHTML = '<div class="obj"></div>'
    
    enemy.className = 'obj'
    addEnemys()
    checkToIncreaseSpeed()

    for (let item of document.getElementsByClassName('player')) {
        PlayerRect = item.getBoundingClientRect()
    }
    
    if (gameIsPlaying) {
        setInterval((e) => {
            checkIfOutOfBoundries()
            movePlayerBall()
            playerDied()
            gameEnded()
        }, 1)
    }

    playAgainbutton.style.display = "none"
}