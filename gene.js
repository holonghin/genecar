let robotScore = []
function collectSocre() {
    for(var i = 0; i < robots.length; i++){
        robotScore[i] = robots[i].score
    }
    console.log(robotScore)
}
setTimeout(collectSocre, 10000)