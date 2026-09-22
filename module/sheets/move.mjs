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
}
