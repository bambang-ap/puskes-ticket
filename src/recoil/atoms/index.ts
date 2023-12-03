import {atom} from 'recoil';

import {TMenu} from '@appTypes/app.zod';

export const atomSidebarOpen = atom({
	key: 'atomSidebar',
	default: true,
});

export const atomHeaderTitle = atom<string>({
	key: 'atomHeaderTitle',
	default: '',
});

export const atomIsMobile = atom({
	key: 'atomIsMobile',
	default: false,
});

export const atomCart = atom({
	key: 'atomCart',
	default: null,
});

export const atomListMenu = atom<TMenu[]>({
	key: 'atomListMenu',
	default: [
		{title: 'Overview', path: '/admin', icon: 'faHome'},
		{title: 'Product', path: '/admin/products', icon: 'faGlassWater'},
		{title: 'Category', path: '/admin/categories', icon: 'faList'},
		{title: 'Payment', path: '/admin/payment', icon: 'faWallet'},
		{title: 'Promo', path: '/admin/promo', icon: 'faTags'},
	],
});
