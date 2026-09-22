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

	// make everything draggable
	document.addEventListener("dragstart", ev => {
		const target = ev.target.closest("[data-drag-uuid]");
		if (!target)
			return;
		ev.dataTransfer.setData("text/plain", JSON.stringify({
			type: "Item",
			uuid: target.dataset.dragUuid
		}));
	});

	// global delete
	document.addEventListener("click", async ev => {
		// I don't LOVE closest? but I guess it's fine...
		const target = ev.target.closest("[data-delete-uuid]");
		if (!target)
			return;
		const doc = await fromUuid(target.dataset.deleteUuid);
		await doc?.delete()
	});
});

// add basic moves to a wrestler
Hooks.on("preCreateActor", async (actor, data, options, userId) => {
	if (actor.type !== "wrestler")
		return;
	const pack = game.packs.get("world-wide-wrestling-2e.basicMoves");
	if (!pack) {
		console.error("cannot find basic move pack: won't add moves to the wrestler");
		return;
	}
	const moves = await pack.getDocuments();
	actor.updateSource({ items: moves.map(m => m.toObject()) });
});

// enforce one gimmick per wrestler
Hooks.on("preCreateItem", async (item, data, options, userId) => {
	if (item.type !== "gimmick")
		return;
	const wrestler = item.parent;
	if (!wrestler)
		return;

	const existingGimmick = wrestler.items.find(i => i.type === "gimmick");
	if (existingGimmick)
	{
		// probably should be on the wrestler, ah well
		await existingGimmick.system.removeFromWrestler(wrestler);
		existingGimmick.delete(); // get rid of the old one
	}
	await item.system.addToWrestler(wrestler);
});
