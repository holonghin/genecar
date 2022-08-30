let robotScore = []
function collectSocre() {
    for(var i = 0; i < robot.length; i++){
        robotScore[i] = robot[i].score
    }
}
setTimeout(collectSocre, 10000)
console.log(robotScore)