import {ModelDefined, Optional, Sequelize} from 'sequelize';

import {isProd} from '@constants';

import {initOrm} from './init-orm';
import {initRelations} from './init-relations';

export type DefinedModel<
	T extends {},
	K extends keyof T = never,
> = ModelDefined<T, Optional<T, K>>;

const {
	POSTGRES_DATABASE,
	POSTGRES_HOST,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER,
} = process.env;

export const ORM = new Sequelize(
	POSTGRES_DATABASE,
	isProd ? POSTGRES_USER : POSTGRES_USER,
	isProd ? POSTGRES_PASSWORD : POSTGRES_PASSWORD,
	{
		ssl: true,
		native: true,
		// query: {raw: true},
		// logging: isProd ? false : true,
		dialect: 'postgres',
		port: isProd ? POSTGRES_PORT : POSTGRES_PORT,
		host: isProd ? POSTGRES_HOST : POSTGRES_HOST,
		logging: false,
		// minifyAliases: true,
		pool: {
			max: 10,
			min: 1,
			maxUses: 250,
			idle: 10 * 1000,
			evict: 1000 * 2.5,
			acquire: 1000 * 60 * 5,
		},
	},
);

initOrm(ORM).then(initRelations);
