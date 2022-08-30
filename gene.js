let robotScore = []
function collectSocre(){
    for(var i = 0; i < robotScore.length; i++){
        robotScore[i] = robot[i].score
    }
    return x
}
setTimeout(collectSocre, 5*(10**3))
console.log(robotScore)