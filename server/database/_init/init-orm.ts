import {Sequelize} from 'sequelize';

import {initCust} from '../models/customer';
import {initUser} from '../models/user';

export function initOrm(ORM: Sequelize) {
	initUser(ORM);
	initCust(ORM);

	return Promise.resolve();
}
