document.addEventListener('DOMContentLoaded', function() {
	let navSection = 0;
	let navSections = document.getElementsByClassName('section');
	let navButtons = document.getElementsByClassName('navButton');

	function checkShown() {
		for (let i = 0; i < navSections.length; i++) {
			if (i === navSection) {
				navSections[i].style.display = 'block';
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

	//clicker
	gei('click').addEventListener('click', click.click);
	click.newUpgrade("Mouse.Reinforcement", 10, 1.2, 0, 1);
});