let clicks = 0;
let cps    = 0;
let cpc    = 1;

let upgrades = [];

const gei = (id) => { console.log("grabbing element '"+id+"'"); return document.getElementById(id)};

const click = {
	newUpgrade: function(name, cost, costMult, lcps, lcpc) {
		upgrades.push({
			name: name,
			cost: cost,
			costIncrease: costMult,
			cps: lcps,
			cpc: lcpc,
			own: 0
		});

		let upgrade = this.createUpgradeMenu(name, costMult, lcps, lcpc);
		document.getElementById("upgrades").appendChild(upgrade)

		gei(name + "Buy").addEventListener('click', function () {click.buyUpgrade(name)});

		this.updateUpgradeMenu(name, cost);
	},

	click: function() {
		clicks += cpc;
		gei('clicks').innerHTML = clicks;
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
		return el;
	},

	updateUpgradeMenu: function(upgrade, cost, own) {
		gei(upgrade + "Cost").innerHTML = cost;
		gei(upgrade + "Own").innerHTML = own;
		console.log("???")
	},

	updateStats: function() {
		document.getElementById('cps').innerHTML = cps
		document.getElementById('cpc').innerHTML = cpc
	},

	buyUpgrade: function(upgrade) {
		console.log(`searching upgrades list for upgrade with id "${upgrade}"`)
		for (let i = 0; i < upgrades.length; i++) {
			console.log(`checking index ${i}`)
			if (upgrades[i].name === upgrade) {
				console.log(`found upgrade with id: "${upgrade}", attempting to purchase`)
				if (clicks >= upgrades[i].cost) {
					console.log(`upgrade can be purchased, running purchase code...`)
					clicks -= upgrades[i].cost;
					upgrades[i].cost *= upgrades[i].costIncrease;
					upgrades[i].own++;
					cps += upgrades[i].cps;
					cpc += upgrades[i].cpc;
					this.updateUpgradeMenu(upgrade, upgrades[i].cost, upgrades[i].own);
					this.updateStats();
				}
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("click").addEventListener("click", function () { click.click() })
	click.newUpgrade("ClickerUpgrade", 15, 2, 0, 1);
})
