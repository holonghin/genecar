for(var i = 0; i < robots.length; i++){
    if (robots[i].score < 220){
        if (robots.length > 1) robots.splice(i, 1);
        if (GUIs.length > 1) {
            GUIs[i].hide();
            GUIs.splice(i, 1);
        }
        if (i >= robots.length) i = robots.length - 1;
        updateLocalParams(i);
        winner = 0;
        winnerScore = 9999;
    }
}
setTimeout(saveEvent, 25000)
