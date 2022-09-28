var img;
let robots = [];
var GUIs = [];
let resetButton, leftButton, rightButton, addCarButton, delCarButton, fpsSlider, saveButton, loadButton;
let fileSelectButton;
let autoDelCheckbox;

var currentID = 0;
var robotNoCounter = 0;
var FPS = 30;
let RobotsStore;
var isAutoDelCar = true;

var robotWidth;
var sensorNo;
var sensorSize;
var sensor_distance;
var sensor_width;
var maxAccel;
var maxVel;
var Kp;
var Kd;

var winner = 0;
var winnerScore = 9999;

function preload() {
	img = loadImage("data/line guide-01.svg");
}

function setup() {
	createCanvas(600, 600);
	pixelDensity(2.0);
	frameRate(FPS);

	//Create the first 50 robots////////////////////////////////////////////////
	for (var i = 0; i < 51; i++) {
		addCarEvent();
	}

	for (var i = 0; i < robots.length; i++) {
		updateLocalParams(i);
		createGUI(i);
	}
	updateLocalParams(0);

	GUI();

}

/**
 * 
 * @param {number} i 
 */
function createGUI(i) {
	GUIs[i] = createGui('Robot' + str(robots[i].id)).setPosition(600, 0);
	sliderRange(24, 200, 1);
	GUIs[i].addGlobals('robotWidth');
	sliderRange(3, 21, 2);
	GUIs[i].addGlobals('sensorNo');
	sliderRange(30, 300, 1);
	GUIs[i].addGlobals('sensor_distance');
	sliderRange(3, 30, 1);
	GUIs[i].addGlobals('sensor_width');
	sliderRange(0.1, 10, 0.1);
	GUIs[i].addGlobals('maxAccel', 'maxVel');
	sliderRange(0, 10, 0.05);
	GUIs[i].addGlobals('Kp', 'Kd');
	GUIs[i].hide();
}

function draw() {
	
	//set the fps//////////////////////////////////////////////////////////////
	FPS = fpsSlider.value();
	frameRate(FPS);

	//background////////////////////////////////////////////////////////////////
	image(img, 0, 0, 600, 600);

	//update the robots////////////////////////////////////////////////////////
	updateParams(currentID);

	for (var i = 0; i < robots.length; i++) {
		robots[i].update();
		if (i == currentID) GUIs[i].show();
		else GUIs[i].hide();
	}

	// if any car run outside the field, delete it//////////////////////////////
	if (isAutoDelCar) {
		for (var i = 0; i < robots.length; i++) {
			if (robots[i].isDead) {
				currentID = i;
				delCarEvent();
				break;
			}
		}
	}

	//draw the start line///////////////////////////////////////////////////////
	fill(127, 127, 255, 127);
	noStroke();
	rectMode(CORNER);
	rect(200, 0, 10, 110);

	//draw the fps text/////////////////////////////////////////////////////////
	fill(0);
	textAlign(LEFT, TOP);
	text("fps: " + nf(frameRate(), 3, 1) + '/' + FPS, 0, 0);

	//draw the stroke of field/////////////////////////////////////////////////
	noFill();
	stroke(0);
	strokeWeight(.5);
	rect(0, 0, 600, 600);

	//draw the robots, it should be do after all robot sensor is read//////////
	for (var i = 0; i < robots.length; i++) robots[i].show();

	//Circle out the winner////////////////////////////////////////////////////
	for (var i = 0; i < robots.length; i++) {
		if (robots[i].score > 2) {
			if (robots[i].score < winnerScore) {
				winnerScore = robots[i].score;
				winner = i;
			}
		}
	}
	fill(255, 255, 0, 70);
	ellipse(robots[winner].x, robots[winner].y, 60, 60);

	//Circle out the current car////////////////////////////////////////////////
	noFill();
	strokeWeight(2);
	stroke('#FF0000');
	ellipse(robots[currentID].x, robots[currentID].y, 60, 60);

}

//all events below/////////////////////////////////////////////////////////////

/**
 * 
 */
function leftEvent() {
	currentID--;
	if (currentID < 0) currentID = robots.length - 1;
	updateLocalParams(currentID);
}

/**
 * 
 */
function rightEvent() {
	currentID++;
	if (currentID > robots.length - 1) currentID = 0;
	updateLocalParams(currentID);
}

/**
 * 
 */
function addCarEvent() {
	robots.push(new Robot(robotNoCounter, 210, 61, -90));
	robotNoCounter++;
	robots[robots.length - 1].robotWidth = random(24, 200);
	robots[robots.length - 1].sensorNo = floor(random(5, 9) / 2) * 2 + 1;
	robots[robots.length - 1].sensor_distance = random(30, 300);
	robots[robots.length - 1].sensor_width = random(3, 30);
	robots[robots.length - 1].maxVel = random(5., 7.);
	robots[robots.length - 1].maxAccel = .5;
	robots[robots.length - 1].Kp = random(0, 5);
	robots[robots.length - 1].Kd = random(0, 5);

	updateLocalParams(robots.length - 1);
	createGUI(robots.length - 1);
	updateLocalParams(currentID);
}

/**
 * 
 */
function delCarEvent() {
	if (robots.length > 1) robots.splice(currentID, 1);
	if (GUIs.length > 1) {
		GUIs[currentID].hide();
		GUIs.splice(currentID, 1);
	}
	if (currentID >= robots.length) currentID = robots.length - 1;
	updateLocalParams(currentID);
	winner = 0;
	winnerScore = 9999;
}


/**
 * 
 */
function saveEvent() {
	saveJSON(robots, 'RobotsStore');
}

/**
 * 
 */
function loadEvent() {
	fileSelectButton = createFileInput(handleFile);
	fileSelectButton.position(200, height - 25);
}

/**
 * 
 * @param {file} file 
 */
function handleFile(file) {
	if (file.type === 'application' && file.subtype === 'json') {
		RobotsStore = file.data;
		setTimeout(selectEvent, 30002);
		print(RobotsStore);
		clearRobots()
		robots[0].score = 0
		winner = 0;
	    winnerScore = 9999;
		robots[0].x = 210
		robots[0].y = 61
		robots[0].theta = -90
		for (var i = 0; i < 10; i++) {
			addCarEvent();
		}
		for (var i = 0; i < RobotsStore.length; i++) {
			robots.push(new Robot(robotNoCounter, 210, 61, -90));
			robots[robots.length - 1].robotWidth = RobotsStore[i][0];
			robots[robots.length - 1].sensorNo = RobotsStore[i][1];
			robots[robots.length - 1].sensor_distance = RobotsStore[i][2];
			robots[robots.length - 1].sensor_width = RobotsStore[i][3];
			robots[robots.length - 1].maxAccel = RobotsStore[i][4];
			robots[robots.length - 1].maxVel = RobotsStore[i][5];
			robots[robots.length - 1].Kp = RobotsStore[i][6];
			robots[robots.length - 1].Kd = RobotsStore[i][7];
			updateLocalParams(robots.length - 1);
			createGUI(robots.length - 1);
			robotNoCounter++;
		}
		updateLocalParams(currentID);
	}
	for (var i = 0; i < robots.length; i++) {
		updateLocalParams(i);
		createGUI(i);
	}
	updateLocalParams(0);
	GUI();
	fileSelectButton.remove();
}

/**
 * 
 */
function autoDelCheckedEvent() {
	isAutoDelCar = !isAutoDelCar;
}
