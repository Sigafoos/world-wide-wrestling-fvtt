const { api, sheets } = foundry.applications;

export class GimmickSheet extends foundry.appv1.sheets.ItemSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["www-2e", "sheet", "item"],
			width: 600,
			height: 600
		});
	}
	get template() {
		return `systems/${game.system.id}/templates/item/gimmick-sheet.hbs`;
	}
	async getData(options) {
		const context = await super.getData(options);

		const wantOptions = this.item.system.wantOptions ?? [];
		context.wantOptionsValue = wantOptions.join("\n");
		const heatQuestions = this.item.system.heatQuestions ?? [];
		context.heatQuestionsValue = heatQuestions.join("\n");

		return context;
	}

	async _updateObject(event, formData) {
		for (let key of ["system.wantOptions", "system.heatQuestions"]) {
			if (typeof formData[key] === "string") {
				formData[key] = formData[key]
				.split("\n")
				.map(l => l.trim())
				.filter(l => l.length > 0);
			}
		}
		return super._updateObject(event, formData);
	}
}
