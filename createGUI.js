function GUI(){
    //create GUI////////////////////////////////////////////////////////////////
	saveButton = createButton('SAVE');
	saveButton.position(width - 100, height - 25);
	saveButton.size(50, 25);
	saveButton.mousePressed(saveEvent);

	loadButton = createButton('LOAD');
	loadButton.position(width - 50, height - 25);
	loadButton.size(50, 25);
	loadButton.mousePressed(loadEvent);

	resetButton = createButton('Reset position');
	resetButton.position(width - 100, height - 50);
	resetButton.size(100, 25);
	resetButton.style("font-size", "12px");
	resetButton.mousePressed(resetPosition);

	leftButton = createButton('←');
	leftButton.position(width - 100, height - 75);
	leftButton.size(25, 25);
	leftButton.mousePressed(leftEvent);

	rightButton = createButton('→');
	rightButton.position(width - 25, height - 75);
	rightButton.size(25, 25);
	rightButton.mousePressed(rightEvent);

	addCarButton = createButton('+');
	addCarButton.position(width - 75, height - 75);
	addCarButton.size(25, 25);
	addCarButton.mousePressed(addCarEvent);

	delCarButton = createButton('−');
	delCarButton.position(width - 50, height - 75);
	delCarButton.size(25, 25);
	delCarButton.mousePressed(delCarEvent);

	fpsSlider = createSlider(1, 120, 30);
	fpsSlider.position(10, 15);
	fpsSlider.style('width', '80px');

	autoDelCheckbox = createCheckbox('Auto delete car', true);
	autoDelCheckbox.changed(autoDelCheckedEvent);
	autoDelCheckbox.position(0, height - 20);
	autoDelCheckbox.style("font-size", "12px");
}