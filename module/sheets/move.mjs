const { api, sheets } = foundry.applications;

export class MoveSheet extends foundry.appv1.sheets.ItemSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["www-2e", "sheet", "item"],
			width: 600,
			height: 600
		});
	}

	get template() {
		return `systems/${game.system.id}/templates/item/move-sheet.hbs`;
	}

	async getData(options) {
		const context = await super.getData(options);
		context.statChoices = {
			body: "WWW.Stats.Body",
			look: "WWW.Stats.Look",
			real: "WWW.Stats.Real",
			work: "WWW.Stats.Work",
			flat: "WWW.Stats.Flat"
		};
		return context;
	}
}
