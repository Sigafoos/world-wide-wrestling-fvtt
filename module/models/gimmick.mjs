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

	async addToWrestler(wrestler) {
		const finisherUuid = this.finisher;
		const uuids = [this.finisher, ...this.moves].filter(Boolean);
		const docMap = await Promise.all(uuids.map(u => fromUuid(u)));
		const docs = docMap.filter(Boolean);
		const data = docs.map(d => {
			const obj = d.toObject();
			obj.flags = { ...obj.flags, "world-wide-wrestling-2e": {
				grantedBy: this.parent.uuid,
				isFinisher: d.uuid === finisherUuid
			} };
			return obj;
		});
		await wrestler.createEmbeddedDocuments("Item", data);
	}

	// TODO changing gimmicks and keeping moves is allowed
	async removeFromWrestler(wrestler) {
		const toRemove = wrestler.items.filter(
			i => i.getFlag("world-wide-wrestling-2e", "grantedBy") === this.parent.uuid
		);
		await wrestler.deleteEmbeddedDocuments("Item", toRemove.map(i => i.id));
	}
}
