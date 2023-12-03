import {Sequelize} from 'sequelize';

import {initUser} from '../models/user';

export function initOrm(ORM: Sequelize) {
	initUser(ORM);

	return Promise.resolve();
}
