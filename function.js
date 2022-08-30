
/**
 * 
 * @param {nuumber} i 
 */
function updateLocalParams(i) {
	robotWidth = robots[i].robotWidth;
	sensorNo = robots[i].sensorNo;
	sensor_distance = robots[i].sensor_distance;
	sensor_width = robots[i].sensor_width;
	maxAccel = robots[i].maxAccel;
	maxVel = robots[i].maxVel;
	Kp = robots[i].Kp;
	Kd = robots[i].Kd;
}

/**
 * 
 */
function resetPosition() {
	for (var i = 0; i < robots.length; i++) {
		robots[i].x = 210;
		robots[i].y = 61;
		robots[i].theta = -90;
		robots[i].isDead = false;
		robots[i].timer = frameCount;
		robots[i].last_timer = robots[i].timer;
		robots[i].score = 0;
	}
	winner = 0;
	winnerScore = 9999;
}

function updateParams(i) {
	robots[i].robotWidth = robotWidth;
	robots[i].sensorNo = sensorNo;
	robots[i].sensor_distance = sensor_distance;
	robots[i].sensor_width = sensor_width;
	robots[i].maxVel = maxVel;
	robots[i].maxAccel = maxAccel;
	robots[i].Kp = Kp;
	robots[i].Kd = Kd;
}
