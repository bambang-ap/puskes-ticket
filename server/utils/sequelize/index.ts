import {DECIMAL, literal, Sequelize} from 'sequelize';

import {defaultExcludeColumn, defaultOrderBy} from './const';

export * from './attribute';
export * from './relation';
export * from './where';

export function defaultScope(sequelize: Sequelize, withOrder = true) {
	return {
		sequelize,
		defaultScope: {
			...(withOrder ? defaultOrderBy : {}),
			attributes: {
				exclude: defaultExcludeColumn,
			},
		},
	} as const;
}

export function ormDecimalType(fieldName: string) {
	return {
		type: DECIMAL,
		get(): number {
			// @ts-ignore
			const value = this?.getDataValue?.(fieldName);
			return value ? parseFloat(value ?? 0) : 0;
		},
	};
}

export function NumberOrderAttribute<T extends {}>(
	order: LiteralUnion<ObjKeyof<T>>,
) {
	return [literal(`ROW_NUMBER() OVER (ORDER BY ${order})`), 'number'] as const;
}
