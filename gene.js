let robotScore = []
function collectSocre(x){
    for(var i = 0; i < robotScore.length; i++){
        x[i] = robot[i].score
    }
    return x
}
const result = setTimeout(collectSocre, 20*10**3)
document.getElementById("arrPrint").innerHTML = result;