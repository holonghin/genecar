var sel_pop = [];
var cr = 8;
var mr = 1;
var max_ite = 15;
let parent_data = Array.from(Array(20), () => new Array(8));
let child_data = Array.from(Array(30), () => new Array(8));
let new_pop = Array.from(Array(50), () => new Array(8));
function genetic_algorithm(){
    selectEvent();
    for (var i = 0; i < 30; i+=2) { 
        while(1){
            var p1 = _random(0, 19);
            var p2 = _random(0, 19);
            if(p2 == p1) p2 = _random(0, 19);
            else break;
        }
        crossover_mutation(i, parent_data[p1], parent_data[p2]);
    }
    // print(child_data);
    for (var i = 0; i < 20; i++) new_pop[i] = parent_data[i];
    for (var i = 20; i < 50; i++) new_pop[i] = child_data[i - 20];
    // print(new_pop);
    addRobots();
    // print(robots);
}


function selectEvent() {
    // for (var i = 0; i < robots.length; i++) {
    //     if ((robots[i].score < 245) || (robots[i].theta > 0)) {
    //         currentID = i;
    //         delCarEvent();
    //     }
    // }
    for (var i = 0; i < robots.length; i++) sel_pop[i] = robots[i];
    sel_pop.sort(function(a, b){return a.score - b.score;});
    var j = 0;
    for(var i = 0; i < sel_pop.length; i++){
        if(j == 20){
            break;
        } 
        if ((sel_pop[i].score > 245) && (sel_pop[i].theta < 0)){
            parent_data[j][0] = sel_pop[i].robotWidth;
            parent_data[j][1] = sel_pop[i].sensorNo;
            parent_data[j][2] = sel_pop[i].sensor_distance;
            parent_data[j][3] = sel_pop[i].sensor_width;
            parent_data[j][4] = sel_pop[i].maxAccel;
            parent_data[j][5] = sel_pop[i].maxVel;
            parent_data[j][6] = sel_pop[i].Kp;
            parent_data[j][7] = sel_pop[i].Kd;
            j++;
        } 
   }
//    print(sel_pop);
//    print(parent_data);
}

function addData(){
    var j = 0;
     for(var i = 0; i < sel_pop.length; i++){
        if(j == 25){
            break;
        }
        if ((sel_pop[i].score > 245) && (sel_pop[i].theta < 0)){
            parent_data[j][0] = sel_pop[i].robotWidth;
            parent_data[j][1] = sel_pop[i].sensorNo;
            parent_data[j][2] = sel_pop[i].sensor_distance;
            parent_data[j][3] = sel_pop[i].sensor_width;
            parent_data[j][4] = sel_pop[i].maxAccel;
            parent_data[j][5] = sel_pop[i].maxVel;
            parent_data[j][6] = sel_pop[i].Kp;
            parent_data[j][7] = sel_pop[i].Kd;
            j++;
        } 
    }
    // console.log(parent_data)
}

function crossover_mutation(n, parent1, parent2) {
    // print(parent1);
    // print(parent2);
    // var rw = _random(24, 200);
    // var sn = Math.floor(_random(5, 9) / 2) * 2 + 1;
    // var sd = _random(30, 300);
    // var sw = _random(3, 30);
    // var mv = _random(5, 7) + Math.random();
    // var ma = 0.5;
    // var kp =_random(0, 5);
    // var kd =_random(0, 5);
    // let randomData = [rw, sn, sd, sw,  mv, ma, kp, kd];
    var z1 = _random(0, 9);
    if (z1 < cr) {
        var cross_location = _random(1, 7);
        var a = parent1.slice(0, cross_location);
        var b = parent2.slice(0, cross_location);
        for(var i = 0; i < b.length; i++) parent1[i] = b[i];
        for(var i = 0; i < a.length; i++) parent2[i] = a[i];
        let p_list = [parent1, parent2];
        var z2 = _random(0, 9);
        if (z2 < mr) {
            var z3 = _random(0, 1);
            var z4 = _random(0, 7);
            switch(z4) {
                case 0:
                    p_list[z3][0] = _random(24, 200);
                    break;
                case 1:
                    p_list[z3][1] = Math.floor(_random(5, 9) / 2) * 2 + 1;
                    break;
                case 2:
                    p_list[z3][2] = _random(30, 300);
                    break;
                case 3:
                    p_list[z3][3] = _random(3, 30);
                    break;
                case 4:
                    p_list[z3][4] =  0.5;
                    break;
                case 5:
                    p_list[z3][5] = _random(5, 7) + Math.random();
                    break;
                case 6:
                    p_list[z3][6] = _random(0, 5);
                    break;
                case 7:
                    p_list[z3][7] = _random(0, 5);
                    break;
            } 
        }
        child_data[n] = p_list[0];
        child_data[n+1] = p_list[1];
    } else {
        child_data[n] = parent1;
        child_data[n+1] = parent2;
    }
}
function clearRobots(){
    for (var i = 0; i < 315; i++) {
        // currentID = i;
        delCarEvent();
    }
}

function addRobots(){
    setTimeout(selectEvent, 30005)
    clearRobots()
    robots[0].score = 0
    winner = 0;
    winnerScore = 9999;
    robots[0].x = 210
    robots[0].y = 61
    robots[0].theta = -90
    robotNoCounter = 2
    for (var i = 0; i < 10; i++) {
        addCarEvent();
    }
    for (var i = 0; i < new_pop.length; i++) {
        robots.push(new Robot(robotNoCounter, 210, 61, -90));
        robotNoCounter++;
        robots[robots.length - 1].robotWidth = new_pop[i][0];
        robots[robots.length - 1].sensorNo = new_pop[i][1];
        robots[robots.length - 1].sensor_distance = new_pop[i][2];
        robots[robots.length - 1].sensor_width = new_pop[i][3]
        robots[robots.length - 1].maxAccel = new_pop[i][4];
        robots[robots.length - 1].maxVel = new_pop[i][5];
        robots[robots.length - 1].Kp = new_pop[i][6];
        robots[robots.length - 1].Kd = new_pop[i][7];
        updateLocalParams(robots.length - 1);
		createGUI(robots.length - 1);
		robotNoCounter++;
        // if(i % 2 == 0) addCarEvent();
    } 
    updateLocalParams(currentID);
    for (var i = 0; i < robots.length; i++) {
		updateLocalParams(i);
		createGUI(i);
	}
	updateLocalParams(0);
	GUI();
}

function print(a) {
    console.log(a)
}

function _random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
setTimeout(genetic_algorithm, 300000)




