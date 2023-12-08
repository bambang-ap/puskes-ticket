import {z} from 'zod';

import {IconName} from '@components';
import {decimalRegex, defaultLimit} from '@constants';

export * from './type.zod';

export type TDecimal = z.infer<typeof zDecimal>;
export const zDecimal = z
	.string()
	.transform(str => parseFloat(str))
	.or(z.number());

export const decimalSchema = z.string().regex(decimalRegex); //.transform(Number);

// export const tSession = z.object({expires: z.string(), user: tUser.nullish()});
export type TSession = z.infer<typeof tSession>;
export const tSession = z.object({
	expires: z.string(),
	user: z.string().optional(),
});

export type TableFormValue = z.infer<typeof tableFormValue>;
export const tableFormValue = z.object({
	id: z.string().optional(),
	ids: z.string().array().optional(),
	search: z.string().optional(),
	pageTotal: z.number().optional(),
	page: z.number().optional().default(1),
	limit: z.number().optional().default(defaultLimit),
});

export type ModalType = z.infer<typeof uModalType>;
export const uModalType = z.union([
	z.undefined(),
	z.literal('add'),
	z.literal('edit'),
	z.literal('delete'),
	z.literal('other'),
]);
export type ModalTypePreview = z.infer<typeof uModalTypePreview>;
export const uModalTypePreview = z.union([uModalType, z.literal('preview')]);

export type ModalTypeSelect = z.infer<typeof uModalTypeSelect>;
export const uModalTypeSelect = z.union([
	uModalTypePreview,
	z.literal('select'),
]);

export type TMenu = z.infer<typeof tMenu>;
export const tMenu = z.object({
	title: z.string(),
	path: z.string(),
	icon: z.string().transform(t => t as IconName),
});
