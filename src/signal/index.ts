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
	{title: 'Product', path: '/admin/products', icon: 'faGlassWater'},
	{title: 'Category', path: '/admin/categories', icon: 'faList'},
	{title: 'Payment', path: '/admin/payment', icon: 'faWallet'},
	{title: 'Promo', path: '/admin/promo', icon: 'faTags'},
]);
