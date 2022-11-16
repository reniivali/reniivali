let clicks = 0;
let cps    = 0;
let cpc    = 1;

let upgrades = [];

const d = document;
const gei = (id) => document.getElementById(id);

const click = {
	newUpgrade: function(name, cost, costIncrease, cps, cpc) {
		upgrades.push({
			name: name,
			cost: cost,
			costIncrease: eval(costIncrease),
			cps: cps,
			cpc: cpc
		});

		let upgrade = this.createUpgradeMenu(name, costIncrease, cps, cpc);
		gei('upgrades').appendChild(upgrade)

		gei(name + "Buy").addEventListener('click', this.buyUpgrade(name))

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

	createUpgradeMenu: function(upgrade, costInc) {
		let el = this.getSubsectionTemplate();
		el.innerHTML = `<h3 class="noMargin">${upgrade}</h3><h4 class="noMargin preserveWhitespace">Cost  : <span id="${upgrade + "Cost"}">0</span></h4><h4 class="noMargin preserveWhitespace">Cost* : <span>${costInc}</span></h4><h4 class="noMargin preserveWhitespace">CPS+  : <span id="${upgrade + "CPS"}">${cps}</span></h4><h4 class="noMargin preserveWhitespace">CPC+  : <span id="${upgrade + "CPC"}">${cpc}</span></h4><button id="${upgrade + "Buy"}" class="upgradeButton">Purchase</button>`;
		return el;
	},

	updateUpgradeMenu: function(upgrade, cost) {
		gei(upgrade + "Cost").innerHTML = cost;
	},

	buyUpgrade: function(upgrade) {
		for (let i = 0; i < upgrades.length; i++) {
			if (upgrades[i].name === upgrade) {
				if (clicks >= upgrade[i].cost) {
					clicks -= upgrade[i].cost;
					upgrade[i].cost *= upgrade[i].costIncrease;
					cps += upgrade[i].cps;
					cpc += upgrade[i].cpc;
					this.updateUpgradeMenu(upgrade, upgrade[i].cost);
					return true;
				}
				return false;
			}
		}
	}
}
