let robotScore = []
function collectSocre(x){
    for(var i = 0; i < robotScore.length; i++){
        x[i] = robot[i].score
    }
    return x
}
let result = setTimeout(collectSocre(robotScore), 5000)
console.log(result)