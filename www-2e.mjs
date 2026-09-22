import { PlayerActor, MoveItem } from "./module/documents.mjs";
import { WrestlerData, MoveData, GimmickData } from "./module/data-models.mjs";
import { WrestlerSheet, MoveSheet, GimmickSheet } from "./module/sheets.mjs";

Hooks.once("init", () => {
	// this will allow NPWs and PWs to have the same behavior. we'll see if it's needed.
	CONFIG.Actor.documentClass = PlayerActor;
	CONFIG.Item.documentClass = MoveItem; // also applies to gimmicks I guess

	CONFIG.Actor.dataModels.wrestler = WrestlerData;
	CONFIG.Item.dataModels.move = MoveData;
	CONFIG.Item.dataModels.gimmick = GimmickData;

	// sheets
	const actors = foundry.documents.collections.Actors;
	actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
	actors.registerSheet("world-wide-wrestling-2e", WrestlerSheet, {
		types: ["wrestler"],
		makeDefault: true
	});
	const items = foundry.documents.collections.Items;
	items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
	items.registerSheet("world-wide-wrestling-2e", MoveSheet, {
		types: ["move"],
		makeDefault: true
	});
	items.registerSheet("world-wide-wrestling-2e", GimmickSheet, {
		types: ["gimmick"],
		makeDefault: true
	});

});

// enforce one gimmick per wrestler
Hooks.on("preCreateItem", (item, data, options, userId) => {
	if (item.type !== "gimmick")
		return;
	const parent = item.parent;
	if (!parent)
		return;

	const existingGimmick = parent.items.find(i => i.type === "gimmick");
	if (existingGimmick)
	{
		existingGimmick.delete(); // get rid of the old one
		// TODO probably get rid of the moves and stuff?
	}
});
