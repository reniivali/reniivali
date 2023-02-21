const d = document;

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
		flexBasisVal.innerHTML = `Flex Basis: auto`;

		const flexBasisSlider = d.createElement("input");
		flexBasisSlider.type = "range";
		flexBasisSlider.min = "0";
		flexBasisSlider.max = "500";
		flexBasisSlider.value = "1";
		flexBasisSlider.className = "slider";
		flexBasisSlider.id = `flexBasisDemoSlide${i}`;
		flexDemoBoxes[i].append(flexBasisVal);
		flexDemoBoxes[i].append(flexBasisSlider);
		flexBasisSlider.addEventListener('input', function() {
			flexDemoBoxes[i].style.flexBasis = flexBasisSlider.value + "px";
			d.getElementById(`flexBasisDemoVal${i}`).innerHTML = `Flex Basis: ${flexBasisSlider.value}px`;
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