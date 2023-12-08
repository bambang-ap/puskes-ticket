import {TMenu} from '@appTypes/app.zod';
import {
	CreateSignal,
	CreateSignalArray,
	CreateSignalBoolean,
} from '@utils/signals';

export const sFilterExpand = new CreateSignalBoolean(true);
export const sIsMobile = new CreateSignalBoolean(false);

export const sHeaderTitle = new CreateSignal('');

export const sListMenu = new CreateSignalArray<TMenu>([
	{title: 'Overview', path: '/admin', icon: 'faHome'},
	{title: 'Customer', path: '/admin/customer', icon: 'faUserAstronaut'},
	{title: 'User', path: '/admin/user', icon: 'faUser'},
	{title: 'Gallery', path: '/admin/gallery', icon: 'faImage'},
]);
