export class GimmickData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			description: new foundry.data.fields.StringField({ required: true }),
			audienceReset: new foundry.data.fields.NumberField({ required: true }),
			wantOptions: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField()),
			heatQuestions: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField()),
			body: new foundry.data.fields.NumberField({ required: true }),
			look: new foundry.data.fields.NumberField({ required: true }),
			real: new foundry.data.fields.NumberField({ required: true }),
			work: new foundry.data.fields.NumberField({ required: true }),
			finisher: new foundry.data.fields.DocumentUUIDField(),
			moves: new foundry.data.fields.ArrayField(new foundry.data.fields.DocumentUUIDField()),
			movePickCount:  new foundry.data.fields.NumberField({ required: true }),
			movePicks: new foundry.data.fields.ArrayField(new foundry.data.fields.DocumentUUIDField())
		};
	}
}
