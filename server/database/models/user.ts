import {
	InitOptions,
	Model,
	ModelAttributes,
	Optional,
	Sequelize,
	STRING,
} from 'sequelize';

import {TUser} from '@appTypes/app.zod';
import {Tables} from '@server';
import {
	defaultExcludeColumn,
	defaultOrderBy,
} from '@server-utils/sequelize/const';

export class dUser extends Model<TUser> {
	static _alias = 'dataUser' as const;
}

export function dUserAttributes(): [
	ModelAttributes<dUser, Optional<TUser, never>>,
	Omit<InitOptions<dUser>, 'sequelize'>,
] {
	return [
		{
			id: {type: STRING, primaryKey: true},
			name: {type: STRING},
		},
		{
			tableName: Tables.User,
			defaultScope: {
				...defaultOrderBy,
				attributes: {
					exclude: [...defaultExcludeColumn, 'password'],
				},
			},
		},
	];
}

export function initUser(sequelize: Sequelize) {
	const [attributes, options] = dUserAttributes();
	dUser.init(attributes, {...options, sequelize});

	return dUser;
}
