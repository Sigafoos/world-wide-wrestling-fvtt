const { api, sheets } = foundry.applications;

export class WrestlerSheet extends foundry.appv1.sheets.ActorSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["www-2e", "sheet", "actor"],
			width: 600,
			height: 600
		});
	}
	get template() {
		return `systems/${game.system.id}/templates/actor/wrestler-sheet.hbs`;
	}
}
