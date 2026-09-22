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

	prepareDerivedData() {
		this._gimmick = this.parent?.items.find(i => i.type === "gimmick") ?? null;
	}

	get gimmick() {
		return this._gimmick;
	}

	get body() {
		return this.gimmick?.system.body ?? 0;
	}

	get look() {
		return this.gimmick?.system.look ?? 0;
	}

	get real() {
		return this.gimmick?.system.real ?? 0;
	}

	get work() {
		return this.gimmick?.system.work ?? 0;
	}
}
