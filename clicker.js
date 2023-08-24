let clicks = 0;
let cps    = 0;
let cpc    = 1;

let upgrades = [];

const gei = (id) => { console.log("[INFO] grabbing element '"+id+"'"); return document.getElementById(id)};

const click = {
	newUpgrade: function(name, cClass, cost, costMult, lcps, lcpc, appItem) {
		if (cClass === "items") {
			upgrades.push({
				name: name,
				cClass: cClass,
				cost: cost,
				costIncrease: costMult,
				cps: lcps,
				cpc: lcpc,
				own: 0
			});
		} else if (cClass === "upgrades") {
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
		}

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
		console.log(`appCPS [INFO] : searching upgrade list for upgrades that add CPS...`)
		for (let i = 0; i < upgrades.length; i++) {
			if (upgrades[i].cps > 0) {
				console.log(`appCPS [INFO] : found upgrade that adds CPS, adding to temporary list`)
				obj.push({
					upgrade: upgrades[i].name,
					own: upgrades[i].own,
					val: upgrades[i].cps
					//applicable upgrades here eventually
				})
			}
		}
		let tempCPS = 0;
		console.log(`appCPS [INFO] : calculating CPS variable based on found upgrades`)
		for (let i = 0; i < obj.length; i++) {
			let temp = obj[i].own * obj[i].val
			tempCPS += temp;
			console.log(`appCPS [INFO] : added upgrade "${obj.upgrade}" to the calculation. it added ${temp} CPS, and total temp CPS is now ${tempCPS}`)
		}
		cps = tempCPS;
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
					if (upgrades[i].cps > 0) {
						this.applyCPS();
					}
					this.updateStats();
				}
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("click").addEventListener("click", function () { click.click() })
	click.newUpgrade("Clicker-Upgrade",     "upgrades", 15,    1.1, 0,   1  , "Mouse");
	click.newUpgrade("Clicker-Upgrade-II",  "upgrades", 500,   1.2, 0,   10 , "Mouse");
	click.newUpgrade("Clicker-Upgrade-III", "upgrades", 10000, 1.3, 0,   100, "Mouse");
	click.newUpgrade("Auto-Clicker",        "items",    100,   1.1, 1,   0);
	click.newUpgrade("Auto-Clicker-Mk.II",  "items",    1000,  1.2, 10,  0);
	click.newUpgrade("Auto-Clicker-Mk.III", "items",    10000, 1.3, 100, 0);

	setInterval(function() {
		clicks += cps/60;
		gei("clicks").innerHTML = JSON.stringify(Math.floor(clicks));
	}, 1000/60)
})
