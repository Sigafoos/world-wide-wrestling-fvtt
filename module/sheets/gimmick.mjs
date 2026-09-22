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

	async _resolveMoveList(moves) {
		if (!moves)
			return [];
		return await Promise.all(
			moves.map(async uuid => await fromUuid(uuid))
		);
	}

	async getData(options) {
		const context = await super.getData(options);

		const wantOptions = this.item.system.wantOptions ?? [];
		context.wantOptionsValue = wantOptions.join("\n");
		const heatQuestions = this.item.system.heatQuestions ?? [];
		context.heatQuestionsValue = heatQuestions.join("\n");

		context.finisher = await fromUuid(this.item.system.finisher);
		context.moves = await this._resolveMoveList(this.item.system.moves);
		context.movePicks = await this._resolveMoveList(this.item.system.movePicks);

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

	activateListeners(html) {
		super.activateListeners(html);
		html.find(".drop-zone").on("dragover", ev => ev.preventDefault()); // native browser requirement
		html.find(".drop-zone").on("drop", async ev => {
			ev.preventDefault();
			const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(ev.originalEvent);
			if (data.type !== "Item")
				return;

			const target = ev.currentTarget;

			// finisher
			if (target.dataset.single) {
				await this.item.update({[`system.${target.dataset.single}`]: data.uuid });
			} else { // the lists
				const key = target.dataset.list;
				const current = this.item.system[key] ?? [];
				await this.item.update({ [`system.${key}`]: [...current, data.uuid] });
			}
		});
	}
}
