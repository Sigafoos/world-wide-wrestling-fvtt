const {
	HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField, DocumentUUIDField
} = foundry.data.fields;

export class WrestlerData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			generalLook: new StringField(),
			hailingFrom: new StringField(),
			entrance: new StringField(),
			want: new StringField(),
			audience: new NumberField(),
			momentum: new NumberField(),
			heat: new ArrayField(new SchemaField({
				wrestler: new DocumentUUIDField(),
				value: new NumberField()
			}))
			// TODO extra stats from the gimmick
		};
	}

	get gimmick() {
		return this.parent?.items.find(i => i.type === "gimmick");
	}

	get body() {
		const gimmick = this.gimmick;
		if (!gimmick)
			return 0;
		return gimmick.system.body;
	}

	get look() {
	}

	get real() {
	}

	get work() {
	}
}
