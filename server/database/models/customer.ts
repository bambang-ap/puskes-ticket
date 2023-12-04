import {
	BOOLEAN,
	InitOptions,
	Model,
	ModelAttributes,
	Optional,
	Sequelize,
	STRING,
} from 'sequelize';

import {TCustomer} from '@appTypes/app.zod';
import {Tables} from '@server';
import {defaultExcludeColumn, defaultOrderBy} from '@server-utils';

type J = TCustomer;

export class dCust extends Model<J> {
	static _alias = 'dataUser' as const;
}

export function dCustAttributes(): [
	ModelAttributes<dCust, Optional<J, never>>,
	Omit<InitOptions<dCust>, 'sequelize'>,
] {
	return [
		{
			id: {type: STRING, primaryKey: true},
			registerNumber: STRING,
			nik: STRING,
			name: STRING,
			gender: STRING,
			phone: STRING,
			birthDate: STRING,
			addressDetail: STRING,
			registered: BOOLEAN,
			districtId: STRING,
			provinceId: STRING,
			regencyId: STRING,
			villageId: STRING,
		},
		{
			tableName: Tables.Customer,
			defaultScope: {
				...defaultOrderBy,
				attributes: {
					exclude: [...defaultExcludeColumn, 'password'],
				},
			},
		},
	];
}

export function initCust(sequelize: Sequelize) {
	const [attributes, options] = dCustAttributes();
	dCust.init(attributes, {...options, sequelize});

	return dCust;
}
