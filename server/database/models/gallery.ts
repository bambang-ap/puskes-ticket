import {Model, NUMBER, Sequelize, STRING} from 'sequelize';

import {TGallery} from '@appTypes/app.zod';
import {Tables} from '@server';
import {defaultExcludeColumn, defaultOrderBy} from '@server-utils';

export class dGallery extends Model<TGallery> {}

export function initGallery(sequelize: Sequelize) {
	dGallery.init(
		{
			id: {type: STRING, primaryKey: true},
			image: STRING,
			index: NUMBER,
		},
		{
			sequelize,
			tableName: Tables.Gallery,
			defaultScope: {
				...defaultOrderBy,
				attributes: {
					exclude: [...defaultExcludeColumn, 'password'],
				},
			},
		},
	);

	return dGallery;
}
