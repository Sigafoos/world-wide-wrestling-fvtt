export class MoveData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			description: new foundry.data.fields.StringField({ required: true }),
			onSuccess: new foundry.data.fields.HTMLField({ required: true }),
			onMixed: new foundry.data.fields.HTMLField({ required: true }),
			onBotch: new foundry.data.fields.HTMLField({ required: true })
		};
	}
}
