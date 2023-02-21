const d = document;

function unsetBasis() {
	for (let i = 0; i < 4; i++) {
		const flexDemoBox = d.getElementsByClassName("flexDemo")[i];
		flexDemoBox.style.flexBasis = "";
		d.getElementById(`flexBasisDemoVal${i}`).innerHTML = `Flex Basis: Unset`;
		d.getElementById(`flexBasisDemoSlide${i}`).value = "1";
	}
}

function unsetWidth() {
	for (let i = 0; i < 4; i++) {
		const flexDemoBox = d.getElementsByClassName("flexDemo")[i];
		flexDemoBox.style.width = "";
		d.getElementById(`flexRawWidthVal${i}`).innerHTML = `Raw Width: Unset`;
		d.getElementById(`flexRawWidthSlide${i}`).value = "1";
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
		const flexBasisVal = d.createElement("p");
		flexBasisVal.id = `flexBasisDemoVal${i}`;
		flexBasisVal.innerHTML = `Flex Basis: Unset`;

		const flexBasisSlider = d.createElement("input");
		flexBasisSlider.type = "range";
		flexBasisSlider.min = "0";
		flexBasisSlider.max = "1000";
		flexBasisSlider.value = "1";
		flexBasisSlider.className = "slider";
		flexBasisSlider.id = `flexBasisDemoSlide${i}`;
		flexDemoBoxes[i].append(flexBasisVal, flexBasisSlider);
		flexBasisSlider.addEventListener('input', function() {
			flexDemoBoxes[i].style.flexBasis = flexBasisSlider.value + "px";
			flexBasisVal.innerHTML = `Flex Basis: ${flexBasisSlider.value}px`;
		});

		const flexGrowVal = d.createElement("p");
		flexGrowVal.id = `flexGrowDemoVal${i}`;
		flexGrowVal.innerHTML = `Flex Grow: 1`;

		const flexGrowSlider = d.createElement("input");
		flexGrowSlider.type = "range";
		flexGrowSlider.min = "0";
		flexGrowSlider.max = "1";
		flexGrowSlider.value = "1";
		flexGrowSlider.step = "0.001";
		flexGrowSlider.className = "slider";
		flexGrowSlider.id = `flexGrowDemoSlide${i}`;
		flexDemoBoxes[i].append(flexGrowVal, flexGrowSlider);
		flexGrowSlider.addEventListener('input', function() {
			flexDemoBoxes[i].style.flexGrow = flexGrowSlider.value;
			flexGrowVal.innerHTML = `Flex Grow: ${flexGrowSlider.value}`;
		});

		const flexShrinkVal = d.createElement("p");
		flexShrinkVal.id = `flexShrinkDemoVal${i}`;
		flexShrinkVal.innerHTML = `Flex Shrink: 1`;

		const flexShrinkSlider = d.createElement("input");
		flexShrinkSlider.type = "range";
		flexShrinkSlider.min = "0";
		flexShrinkSlider.max = "1";
		flexShrinkSlider.value = "1";
		flexShrinkSlider.step = "0.001";
		flexShrinkSlider.className = "slider";
		flexShrinkSlider.id = `flexShrinkDemoSlide${i}`;
		flexDemoBoxes[i].append(flexShrinkVal, flexShrinkSlider);
		flexShrinkSlider.addEventListener('input', function() {
			flexDemoBoxes[i].style.flexShrink = flexShrinkSlider.value;
			flexShrinkVal.innerHTML = `Flex Shrink: ${flexShrinkSlider.value}`;
		});

		const rawWidthVal = d.createElement("p");
		rawWidthVal.id = `flexRawWidthVal${i}`;
		rawWidthVal.innerHTML = `Raw Width: Unset`

		const rawWidthSlider = d.createElement("input");
		rawWidthSlider.type = "range";
		rawWidthSlider.min = "0";
		rawWidthSlider.max = "1000";
		rawWidthSlider.value = "1";
		rawWidthSlider.className = "slider";
		rawWidthSlider.id = `flexRawWidthSlide${i}`;
		flexDemoBoxes[i].append(rawWidthVal, rawWidthSlider)
		rawWidthSlider.addEventListener('input', function() {
			flexDemoBoxes[i].style.width = rawWidthSlider.value + "px";
			rawWidthVal.innerHTML = `Raw Width: ${rawWidthSlider.value}px`
		});
	}

	d.getElementById("flexDirection").addEventListener('change', function() {
		d.getElementById("flexDemoContainer").style.flexDirection = d.getElementById("flexDirection").value;
	});

	d.getElementById("flexWrap").addEventListener('change', function() {
		d.getElementById("flexDemoContainer").style.flexWrap = d.getElementById("flexWrap").value;
	});

	//clicker
	//gei('click').addEventListener('click', click.click);
	//click.newUpgrade("Mouse.Reinforcement", 10, 1.2, 0, 1);
});