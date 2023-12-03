import {FindAttributeOptions, Model, ModelStatic} from 'sequelize';
import {noUnrecognized, objectKeyMask, z, ZodObject, ZodRawShape} from 'zod';

import {defaultExcludeColumns} from './const';

export function attrParser<
	T extends ZodRawShape,
	K extends ObjKeyof<T>,
	Mask extends noUnrecognized<objectKeyMask<T>, T>,
>(schema: ZodObject<T>, attributes?: K[]) {
	let obj = schema;
	if (attributes) {
		const reducer = attributes.reduce(
			(a, b) => ({...a, [b]: true}),
			{} as Mask,
		);
		obj = schema.pick(reducer);
	}
	// @ts-ignore
	type ObjType = Pick<z.infer<typeof obj>, K>;
	return {obj: {} as ObjType, keys: attributes as K[]};
}

export function attrParserZod<
	T extends ZodRawShape,
	K extends ObjKeyof<T>,
	Mask extends noUnrecognized<objectKeyMask<T>, T>,
>(schema: ZodObject<T>, model: ModelStatic<Model<any>>, attributes?: K[]) {
	let obj = schema;
	if (attributes) {
		const reducer = attributes.reduce(
			(a, b) => ({...a, [b]: true}),
			{} as Mask,
		);
		obj = schema.pick(reducer);
	}
	// @ts-ignore
	type ObjType = Pick<z.infer<typeof obj>, K>;
	return {
		model,
		zod: schema,
		obj: {} as ObjType,
		attributes: attributes as K[],
	};
}

export function attrParserV2<T extends {}, K extends keyof T>(
	model: ModelStatic<Model<T>>,
	attributes?: K[],
) {
	type ObjType = Pick<T, K>;

	return {model, obj: {} as ObjType, attributes};
}
export function attrParserExclude<T extends {}, K extends keyof T>(
	model: ModelStatic<Model<T>>,
	attributes?: K[],
	excludeDefault = true,
) {
	type Keys = Exclude<keyof T, K>;
	type ObjType = Pick<T, Keys>;
	return {
		model,
		obj: {} as ObjType,
		attributes: (!!attributes
			? {
					exclude: excludeDefault
						? [...defaultExcludeColumns, ...attributes]
						: attributes,
			  }
			: excludeDefault
			? {exclude: defaultExcludeColumns}
			: undefined) as FindAttributeOptions,
	};
}
