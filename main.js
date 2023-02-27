const d = document;
let iFlexDemoBoxes = 4;

function unsetBasis() {
	for (let i = 0; i < iFlexDemoBoxes - 1; i++) {
		const flexDemoBox = d.getElementsByClassName("flexDemo")[i];
		flexDemoBox.style.flexBasis = "";
		d.getElementById(`flexBasisDemoVal${i}`).innerHTML = `Flex Basis: Unset`;
		d.getElementById(`flexBasisDemoSlide${i}`).value = "1";
	}
}

function unsetWidth() {
	for (let i = 0; i < iFlexDemoBoxes - 1; i++) {
		const flexDemoBox = d.getElementsByClassName("flexDemo")[i];
		flexDemoBox.style.width = "";
		d.getElementById(`flexRawWidthDemoVal${i}`).innerHTML = `Raw Width: Unset`;
		d.getElementById(`flexRawWidthDemoSlide${i}`).value = "1";
	}
}

/**
 * @param min Slider's minimum value
 * @param max Slider's maximum value
 * @param step Slider's step value
 * @param value Slider's starting value
 * @param id Slider's base id
 * @param did What the display p element should call the changing value
 * @param dval What the display p element should display as the starting value
 * @param cngval What the slider should change (CSS property in CamelCase)
 * @param nid the number of the demo box
 * @param appendTo the demo box element passed in
 * @param change the ID of the element to change
 * @param unit (OPTIONAL) the unit of the value (px, %, etc.)
 */
function sliderSetup(min, max, step, value, id, did, dval, cngval, nid, appendTo, change, unit) {
	const container = d.createElement("div");
	const disp = d.createElement("p");
	disp.id = `${id}DemoVal${nid}`;
	disp.innerHTML = `${did}: ${dval}`

	const slider = d.createElement("input");
	slider.type = "range";
	slider.min = min;
	slider.max = max;
	slider.value = value;
	slider.step = step;
	slider.className = "slider";
	slider.id = `${id}DemoSlide${nid}`;

	appendTo.append(container);
	container.append(disp, slider);
	if (change) {
		slider.addEventListener('input', function() {
			appendTo.style[cngval] = slider.value + unit;
			disp.innerHTML = `${did}: ${slider.value}${unit}`;
		});
	} else {
		slider.addEventListener('input', function() {
			disp.innerHTML = `${did}: ${slider.value}${unit}`;
		});
	}
}

function addFlexDemoBox() {
	const flexDemoContainer = d.getElementById("flexDemoContainer");
	const flexDemoBox = d.createElement("div");
	flexDemoBox.className = "demo flexDemo";
	flexDemoBox.id = `flexDemo${iFlexDemoBoxes + 1}`;
	flexDemoBox.innerHTML = `<h1>Box ${iFlexDemoBoxes + 1}</h1>`;
	flexDemoContainer.append(flexDemoBox);
	iFlexDemoBoxes++;
	sliderSetup(0, 1000, 1, 1, "flexBasis", "Flex Basis", "Unset", "flexBasis", iFlexDemoBoxes, flexDemoBox, true, "px");
	sliderSetup(0, 1000, 1, 1, "flexRawWidth", "Raw Width", "Unset", "width", iFlexDemoBoxes, flexDemoBox, true, "px");
	sliderSetup(0, 1, 0.001, 1, "flexGrow", "Flex Grow", "1", "flexGrow", iFlexDemoBoxes, flexDemoBox, true, "");
	sliderSetup(0, 1, 0.001, 1, "flexShrink", "Flex Shrink", "1", "flexShrink", iFlexDemoBoxes, flexDemoBox, true, "");
}

function removeFlexDemoBox() {
	if (iFlexDemoBoxes > 4) {
		d.getElementById(`flexDemo${iFlexDemoBoxes}`).remove();
		iFlexDemoBoxes--;
	} else {
		alert("You can't remove any more boxes!");
	}
}

d.addEventListener('DOMContentLoaded', function() {
	let navSection = 0;
	let navSections = d.getElementsByClassName('section');
	let navButtons = d.getElementsByClassName('navButton');

	function checkShown() {
		for (let i = 0; i < navSections.length; i++) {
			if (i === navSection) {
				navSections[i].style.display = '';
				navButtons[i].style.backgroundColor = '#1e1e2e';
				navButtons[i].style.color = '#a6adc8';
				navButtons[i].style.borderRadius = '10px 0 0 10px';
				navButtons[i].style.margin = '0 0 10px 0';
				navButtons[i].style.boxShadow = "rgba(0, 0, 0, 0) 0px 0px 0px";
			} else {
				navSections[i].style.display = 'none';
				navButtons[i].style.backgroundColor = '';
				navButtons[i].style.color = '';
				navButtons[i].style.borderRadius = '';
				navButtons[i].style.margin = '';
				navButtons[i].style.boxShadow = '';

			}
		}
	}
	setInterval(checkShown, 50);

	//add onclick handlers to the nav buttons
	for (let i = 0; i < navButtons.length; i++) {
		navButtons[i].addEventListener('click', function() {
			navSection = i;
		});
	}

	//css dict stuff
	const borderRadSlider = d.getElementById("borderRadDemoSlide")
	const borderRadElement = d.getElementById("borderRadDemo")
	borderRadSlider.addEventListener('input', function() {
		borderRadElement.style.borderRadius = borderRadSlider.value + "px";
		d.getElementById("borderRadDemoVal").innerHTML = `Radius: ${borderRadSlider.value}px`;
	});

	const flexDemoBoxes = d.getElementsByClassName("flexDemo");
	for (let i = 0; i < 4; i++) {
		sliderSetup(0, 1000, 1, 1, "flexBasis", "Flex Basis", "Unset", "flexBasis", i, flexDemoBoxes[i], true, "px");
		sliderSetup(0, 1000, 1, 1, "flexRawWidth", "Raw Width", "Unset", "width", i, flexDemoBoxes[i], true, "px");
		sliderSetup(0, 1, 0.001, 1, "flexGrow", "Flex Grow", "1", "flexGrow", i, flexDemoBoxes[i], true, "");
		sliderSetup(0, 1, 0.001, 1, "flexShrink", "Flex Shrink", "1", "flexShrink", i, flexDemoBoxes[i], true, "");
	}

	d.getElementById("flexDirection").addEventListener('change', function() {
		d.getElementById("flexDemoContainer").style.flexDirection = d.getElementById("flexDirection").value;
	});

	d.getElementById("flexWrap").addEventListener('change', function() {
		d.getElementById("flexDemoContainer").style.flexWrap = d.getElementById("flexWrap").value;
	});

	const boxShadowContainer = d.getElementById("boxShadowDemoSliders");
	const boxShadowDemo = d.getElementById("boxShadowDemo");
	sliderSetup(0, 100, 1, 0, "boxShadowX", "offset-x", "0", "", 1, boxShadowContainer, false,  "px");
	sliderSetup(0, 100, 1, 0, "boxShadowY", "offset-y", "0", "", 1, boxShadowContainer, false,  "px");
	sliderSetup(0, 100, 1, 0, "boxShadowBlur", "blur-radius", "0", "", 1, boxShadowContainer, false,  "px");
	sliderSetup(0, 100, 1, 0, "boxShadowSpread", "spread-radius", "0", "", 1, boxShadowContainer, false,  "px");

	function updateBoxShadow() {
		const x = d.getElementById("boxShadowXDemoSlide1").value;
		const y = d.getElementById("boxShadowYDemoSlide1").value;
		const blur = d.getElementById("boxShadowBlurDemoSlide1").value;
		const spread = d.getElementById("boxShadowSpreadDemoSlide1").value;
		boxShadowDemo.style.boxShadow = `${x}px ${y}px ${blur}px ${spread}px black`;
	}

	setInterval(updateBoxShadow, 50);

	//clicker
	//gei('click').addEventListener('click', click.click);
	//click.newUpgrade("Mouse.Reinforcement", 10, 1.2, 0, 1);
});