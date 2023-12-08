import {Sequelize} from 'sequelize';

import {initCust} from '../models/customer';
import {initGallery} from '../models/gallery';
import {initUser} from '../models/user';

export function initOrm(ORM: Sequelize) {
	initUser(ORM);
	initCust(ORM);
	initGallery(ORM);

	return Promise.resolve();
}
