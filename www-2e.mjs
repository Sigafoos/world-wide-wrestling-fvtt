import { PlayerActor } from "./module/documents.mjs";
import { WrestlerData } from "./module/data-models.mjs";

Hooks.once("init", () => {
	// this will allow NPWs and PWs to have the same stats. we'll see if it's needed.
	CONFIG.Actor.documentClass = PlayerActor;
	CONFIG.Actor.dataModels.wrestler = WrestlerData;
});
