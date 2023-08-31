let clicks = 0;
let cps    = 0;
let cpc    = 1;

let upgrades = [];

const gei = (id) => { console.log("[INFO] grabbing element '"+id+"'"); return document.getElementById(id)};

const click = {
	newUpgrade: function(name, cClass, cost, costMult, lcps, lcpc, appItem) {
		upgrades.push({
			name: name,
			cClass: cClass,
			cost: cost,
			costIncrease: costMult,
			cps: lcps,
			cpc: lcpc,
			own: 0,
			appItem: appItem
		});

		let upgrade = this.createUpgradeMenu(name, costMult, lcps, lcpc);
		document.getElementById(`${cClass}Flex`).appendChild(upgrade)

		gei(name + "Buy").addEventListener('click', function () {click.buyUpgrade(name)});

		this.updateUpgradeMenu(name, cost, 0);
	},

	click: function() {
		clicks += cpc;
		gei('clicks').innerHTML = JSON.stringify(Math.floor(clicks));
	},

	getSubsectionTemplate: function() {
		let el = document.createElement('div');
		el.className = 'subSection';
		return el;
	},

	createUpgradeMenu: function(upgrade, costInc, lCps, lCpc) {
		let el = this.getSubsectionTemplate();
		el.innerHTML = `
			<h3 class="noMargin">${upgrade}</h3>
			<h4 class="noMargin preserveWhitespace">Cost            : <span id="${upgrade + "Cost"}">0</span></h4>
			<h4 class="noMargin preserveWhitespace">Cost Multiplier : <span>${costInc}</span></h4>
			<h4 class="noMargin preserveWhitespace">CPS Increase    : <span id="${upgrade + "CPS"}">${lCps}</span></h4>
			<h4 class="noMargin preserveWhitespace">CPC Increase    : <span id="${upgrade + "CPC"}">${lCpc}</span></h4>
			<h4 class="noMargin preserveWhitespace">You Own         : <span id="${upgrade + "Own"}">0</span></h4>
			<button id="${upgrade + "Buy"}" class="upgradeButton">Purchase</button>
		`;
		el.classList.add("fitContent");
		return el;
	},

	updateUpgradeMenu: function(upgrade, cost, own) {
		gei(upgrade + "Cost").innerHTML = cost;
		gei(upgrade + "Own").innerHTML = own;
	},

	updateStats: function() {
		document.getElementById('cps').innerHTML = cps
		document.getElementById('cpc').innerHTML = cpc
	},

	applyCPS: function() {
		let obj = [];
		console.log(`appCPS [INFO] : searching upgrade list for items that add CPS...`)
		for (let i = 0; i < upgrades.length; i++) {
			if (upgrades[i].cps > 0) {
				console.log(`appCPS [INFO] : found item ("${upgrades[i].name}") that adds CPS, adding to temporary list`)
				obj.push({
					upgrade: upgrades[i].name,
					own: upgrades[i].own,
					val: upgrades[i].cps,
					appUpg: upgrades[i].appItem
				})
			}
		}
		let tempCPS = 0;
		console.log(`appCPS [INFO] : calculating CPS variable based on found items...`)
		for (let i = 0; i < obj.length; i++) {
			let temp = obj[i].own * obj[i].val
			tempCPS += temp;
			console.log(`appCPS [INFO] : added item "${obj[i].upgrade}" to the calculation. it added ${temp} CPS, and total temp CPS is now ${tempCPS}`)
		}
		console.log(`appCPS [INFO] : searching for applicable upgrades to items...`)
		for (let i = 0; i < obj.length; i++) {
			console.log(`appCPS [INFO] : searching for upgrade "${obj[i].appUpg}"`)
			for (let j = 0; j < upgrades.length; j++) {
				if (upgrades[j].name === obj[i].appUpg) {
					console.log(`appCPS [INFO] : found "${obj[i].appUpg}" at index ${j}, calculating its effect on CPS...`)
					let temp = upgrades[j].own;
					temp *= (obj[i].own * obj[i].val)
					tempCPS += temp;
					console.log(`appCPS [INFO] : added upgrade "${obj[i].appUpg}" to the calculation. it added ${temp} CPS, and total temp CPS is now ${tempCPS}`)
					break;
				}
			}
		}
		cps = tempCPS;
		console.log(`appCPS [INFO] : completed CPS calculation. CPS is now set to ${cps}`)
	},

	buyUpgrade: function(upgrade) {
		console.log(`buyUpgrade [INFO]: searching upgrades list for upgrade with id "${upgrade}"`)
		for (let i = 0; i < upgrades.length; i++) {
			console.log(`buyUpgrade [INFO]: checking index ${i}`)
			if (upgrades[i].name === upgrade) {
				console.log(`buyUpgrade [INFO]: found upgrade with id: "${upgrade}", attempting to purchase`)
				if (clicks >= upgrades[i].cost) {
					console.log(`buyUpgrade [INFO]: upgrade can be purchased, running purchase code...`)
					clicks -= upgrades[i].cost;
					upgrades[i].cost = Math.floor(upgrades[i].cost * upgrades[i].costIncrease);
					upgrades[i].own++;
					cpc += upgrades[i].cpc;
					this.updateUpgradeMenu(upgrade, upgrades[i].cost, upgrades[i].own);
					this.applyCPS();
					this.updateStats();
				}
				break;
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("click").addEventListener("click", function () { click.click() })
	click.newUpgrade("Clicker-Upgrade",            "upgrades", 15,   1.1, 0,   1  , undefined);
	click.newUpgrade("Clicker-Upgrade-II",         "upgrades", 5e+2, 1.2, 0,   10 , undefined);
	click.newUpgrade("Clicker-Upgrade-III",        "upgrades", 1e+4, 1.3, 0,   100, undefined);
	click.newUpgrade("AutoClicker",                "items",    1e+2, 1.1, 1,   0,   "AutoClicker-Upgrade");
	click.newUpgrade("AutoClicker-Mk.II",          "items",    1e+3, 1.2, 10,  0,   "AutoClicker-Mk.II-Upgrade");
	click.newUpgrade("AutoClicker-Mk.III",         "items",    1e+4, 1.3, 100, 0,   "AutoClicker-Mk.III-Upgrade");
	click.newUpgrade("AutoClicker-Upgrade",        "upgrades", 1e+4, 2.1, 0,   0,   undefined)
	click.newUpgrade("AutoClicker-Mk.II-Upgrade",  "upgrades", 1e+5, 2.1, 0,   0,   undefined)
	click.newUpgrade("AutoClicker-Mk.III-Upgrade", "upgrades", 1e+6, 2.1, 0,   0,   undefined)

	setInterval(function() {
		clicks += cps/60;
		gei("clicks").innerHTML = JSON.stringify(Math.floor(clicks));
	}, 1000/60)
})
