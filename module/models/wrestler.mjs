const {
	HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField
} = foundry.data.fields;

export class WrestlerData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			ringName: new StringField(),
			generalLook: new StringField(),
			hailingFrom: new StringField(),
			entrance: new StringField(),
			picture: new FilePathField({ required: false, categories: ["IMAGE"] })
		};
	}
}
