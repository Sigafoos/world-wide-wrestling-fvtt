export class MoveItem extends Item {
	async roll() {
		const wrestler = this.parent;
		if (!wrestler) {
			console.log('no parent?'); // and you may ask yourself, well, how did I get here?
			return;
		}

		const statKey = this.system.stat;
		let formula, statValue;
		if (statKey === "flat") {
			formula = "2d6";
			statValue = 0;
		} else {
			formula = "2d6 + @stat";
			statValue = wrestler?.system[statKey] ?? 0;
		}

		const roll = new Roll(formula, { stat: statValue });
		await roll.evaluate();

		let result;
		if (roll.total >= 10) {
			result = "onSuccess";
		} else if (roll.total >= 7) {
			result = "onMixed";
		} else {
			result = "onBotch";
		}

		await roll.toMessage({
			speaker: ChatMessage.getSpeaker({ wrestler }),
			flavor: `${this.name} — ${this.system[result]}`
		});
	}
}
