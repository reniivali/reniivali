const cipher = {
	convertKey: function (key, dict, ab) {
		//loop through key
		for (let i = 0; i < key.length; i++) {
			//figure out the position of current letter
			let pos;
			for (let j = 0; j < ab.length; j++) {
				if (key[i] === ab[j]) {
					pos = j;
					break;
				}
			}

			// split alphabet string into an array of individual letters
			let temp = ab.split("");
			//remove the beginning of the alphabet, up to the letter in the key
			let end = temp.splice(0, pos)
			//push the beginning onto the end.
			for (let j = 0; j < end.length; j++) {
				temp.push(end[j])
			}
			//push final result onto end list
			dict.push({ab: temp, pos: pos})
		}
	},

	encode: function (dict, input, output, key, ab) {
		//loop through string, append results to output
		let keyPos = 0;
		for (let i = 0; i < input.length; i++) {
			//get current ciphered value

			//figure out the position of current letter
			let pos;
			for (let j = 0; j < ab.length; j++) {
				if (input[i] === ab[j]) {
					pos = j;
					break;
				}
			}

			output.push(dict[keyPos].ab[pos])

			if (keyPos === key.length - 1) {
				keyPos = 0;
			} else {
				keyPos++
			}
		}
	},

	decode: function (dict, input, output, key, ab) {
		//loop through string, append results to output
		let keyPos = 0;
		for (let i = 0; i < input.length; i++) {
			//get current ciphered value

			//figure out the position of current letter
			let pos;
			for (let j = 0; j < ab.length; j++) {
				if (input[i] === dict[keyPos].ab[j]) {
					pos = j;
					break;
				}
			}

			output.push(ab[pos])

			if (keyPos === key.length - 1) {
				keyPos = 0;
			} else {
				keyPos++;
			}
		}
	},

	doCipher: function () {
		const cipherInput = d.getElementById("cipherInput");
		const cipherOutput = d.getElementById("cipherOutput");
		const cipherKey = d.getElementById("cipherKey");
		const cipherABselect = d.getElementById("cipherABselect");
		const cipherEDselect = d.getElementById("cipherEDselect");
		
		const input = cipherInput.value;
		let output = [];
		const key = cipherKey.value;
		const ab = cipher.abs[cipherABselect.value];
		const ed = cipherEDselect.value;
	
		let dict = [];
		cipher.convertKey(key, dict, ab);
	
		if (ed === "encode") {
			cipher.encode(dict, input, output, key, ab);
		} else {
			cipher.decode(dict, input, output, key, ab);
		}
	
		cipherOutput.innerHTML = `${output.join("")}`;
		cipherOutput.style.display = "block";
	},

	abs: {
		default: "Y%.*B{G/A#ULnEzF;yr)tep^3OfQ:m(>h2R5]8@-=w1vqd,7Zc'_4DN?Soij+M[bl&6!xH0<9 gsXW$CKuk}~`IVTaPJ",
		lcase: "gpmwktdyo qfvhezcrjlusxnbia",
		ucase: "RNVSKFIDYEHUAMPZXLC TBOGWJQ",
		both: "nauDysOqAILWNvijgCGHJYodETZmFcprRXkQUtV hxbzBSeMPwlKf",
		num: "mXfrvBqEydTZlzcSpRD0xGjJ2N91boMsa7Pi3FYIwku8gOL5U4 hCHKAeWVnQt6",
		jphi: "あXゎゕひぶaPのmGIがぇでぼまわzょけoVW6き ぃえっdZかぐpw1い2るHBぅさそゆDせOちFTLはにSYbりれぎもgぢUてぞゖぽめだJAと5qづhうぉん9uこKfNばぜ4tろeへむざじほ8しぺぬすiぱゐnlQねEたずゑRs3おvをみCびjな7kぁらyゅごゔxふぷどゃつべMrcよ0くげやぴ",
		jpka: "csㄫQOS8iㄉDyㄣㄩaVㄪㄙ0ㄟuUZㄤㄗㄆxㄏㄎrmㄚㄜM1ㄍlqCzㄘYㄐㄓ7hㄒBㄅvㄕHㄑG3ㄬㄠㄝgTeㄥㄊt9ㄌㄞP5obpLnfXJㄡdㄭREㄧN2ㄈ6ㄦAㄔㄨjㄛWㄖFㄇKㄢ4kㄋIw",
		jphika: "ぇはぴかㄙるえ9qㄘㄤjㄞㄑけkㄪっㄓやねrぺてへきゖつxにすEゑちㄏしずㄐgㄍㄆのFぶㄋㄉㄚだぷosYㄥりぎぉじKぢゆSㄔOUどさらくぐGJ7Bょれせこともㄎㄈㄅゎ4bみびㄦゃㄨぁC80ごㄌnyㄠZTㄜぽㄇゅぬㄝぅほcざmわ3をぃ2たなㄭlMpゕ5づzㄊまtでiWひuんNろㄫふぱ1ㄖㄩおㄛゐぞa6RPwむㄟげhAㄣゔㄒQそぜHevうめ LVぼㄧIいfㄢXあDばべㄬㄕㄡㄗがよd",
		unicode: "",
		custom: ""
	}
}

const d = document;
let iFlexDemoBoxes = 4;
let menuOpen = false;

function sarcasText() {
	const og = d.getElementById("textModifierInput").value;
	let words = og.split(" ");
	let newWords = [];
	for (let i = 0; i < words.length; i++) {
		let temp = []
		for (let j = 0; j < words[i].length; j++) {
			if (j % 2 === 0) {
				temp.push(words[i][j].toLowerCase());
			} else {
				temp.push(words[i][j].toUpperCase());
			}
		}
		newWords.push(temp.join(""));
	}
	d.getElementById("textModifierOutput").innerHTML = `Output:<br><br>${newWords.join(" ")}`;
	d.getElementById("textModifierOutput").style.display = "block";
}

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
	$("#home").load('pages/about.html');

	const menuHamburger = d.getElementById("hamburger");
	let navSection = 0;
	let navSections = d.getElementsByClassName('section');
	let navButtons = d.getElementsByClassName('navButton');

	menuHamburger.addEventListener('click', function() {
		if (menuOpen) {
			d.getElementsByClassName("navMain")[0].style.marginLeft = "-155px";
			d.getElementById("hamburger").style.left = "0";
			d.getElementById("name").style.left = "-100px"
			menuOpen = false;
		} else {
			d.getElementById("name").style.left = "47px";
			d.getElementById("hamburger").style.left = "155px";
			d.getElementsByClassName("navMain")[0].style.marginLeft = "0";
			menuOpen = true;
		}
	});

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

	const rotDemo = d.getElementById("rotateDemo");
	const rotDemoSld = d.getElementById("rotateDemoSliders");
	sliderSetup(0, 360, 1, 0, "rotateZ", "Rotate Z", "0", "", 1, rotDemoSld, false, "deg");
	sliderSetup(0, 360, 1, 0, "rotateX", "Rotate X", "0", "", 1, rotDemoSld, false, "deg");
	sliderSetup(0, 360, 1, 0, "rotateY", "Rotate Y", "0", "", 1, rotDemoSld, false, "deg");
	sliderSetup(-1000, 100, 1, -100, "translateZ", "Translate Z", "-100", "", 1, rotDemoSld, false, "px");
	sliderSetup(-1000, 1000, 1, 0, "translateX", "Translate X", "0", "", 1, rotDemoSld, false, "px");
	sliderSetup(-1000, 1000, 1, 0, "translateY", "Translate Y", "0", "", 1, rotDemoSld, false, "px");

	setInterval(() => {
		const bsx = d.getElementById("boxShadowXDemoSlide1").value;
		const bsy = d.getElementById("boxShadowYDemoSlide1").value;
		const bsblur = d.getElementById("boxShadowBlurDemoSlide1").value;
		const bsspread = d.getElementById("boxShadowSpreadDemoSlide1").value;
		boxShadowDemo.style.boxShadow = `${bsx}px ${bsy}px ${bsblur}px ${bsspread}px black`;

		const rz = d.getElementById("rotateZDemoSlide1").value;
		const rx = d.getElementById("rotateXDemoSlide1").value;
		const ry = d.getElementById("rotateYDemoSlide1").value;
		const tz = d.getElementById("translateZDemoSlide1").value;
		const tx = d.getElementById("translateXDemoSlide1").value;
		const ty = d.getElementById("translateYDemoSlide1").value;
		rotDemo.style.transform = `rotateZ(${rz}deg) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px) translateX(${tx}px) translateY(${ty}px)`;
	}, 50)

	let abSelector = d.getElementById('cipherABselect')

	abSelector.addEventListener('change', function (e) {
		let val = e.target.value;
		if (val === "custom") {
			d.getElementById("cipherCustomAB").style.display = "block";
		} else {
			d.getElementById("cipherCustomAB").style.display = "none";
		}
	})

	let abInput = d.getElementById("cipherCustomIn")

	abInput.addEventListener('change', function (e) {
		cipher.abs.custom = e.target.value;
		console.log(`cipher.abs.custom updated to: ${e.target.value}`)
	});
});