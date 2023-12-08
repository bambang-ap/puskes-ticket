import {z} from 'zod';

import {Gender} from '@enum';

export const nikRegex = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{4})/;
export const dateRegex = /^(\d{4})-(\d{2})-(\d{2})/;

export type ZDate = z.infer<typeof zDate>;
export const zDate = z.string().regex(dateRegex);

export type ZId = z.infer<typeof zId>;
export const zId = z.object({id: z.string()});

export type TUser = z.infer<typeof tUser>;
export const tUser = zId.extend({
	name: z.string(),
});

export type TProvince = z.infer<typeof tProvince>;
export const tProvince = zId.extend({name: z.string()});

export type TRegency = z.infer<typeof tRegency>;
export const tRegency = tProvince.extend({province_id: z.string()});

export type TDistrict = z.infer<typeof tDistrict>;
export const tDistrict = tProvince.extend({regency_id: z.string()});

export type TVillage = z.infer<typeof tVillage>;
export const tVillage = tProvince.extend({district_id: z.string()});

export type TState = z.infer<typeof tState>;
export const tState = z.object({
	provinceId: z.string(),
	regencyId: z.string(),
	districtId: z.string(),
	villageId: z.string(),
});

export type TCustomer = z.infer<typeof tCustomer>;
export const tCustomer = zId.extend({
	registerNumber: z.string(),
	nik: z.string().regex(nikRegex),
	name: z.string(),
	gender: z.nativeEnum(Gender),
	phone: z.string(),
	birthDate: zDate,
	addressDetail: z.string(),
	registered: z.boolean().default(false),
	...tState.shape,
});

export type TCustomerCreate = z.infer<typeof tCustomerCreate>;
export const tCustomerCreate = tCustomer.partial({
	id: true,
	registerNumber: true,
});

export type TGallery = z.infer<typeof tGallery>;
export const tGallery = zId.extend({
	image: z.string(),
	index: z.number().optional(),
});

export type TGalleryUpsert = z.infer<typeof tGalleryUpsert>;
export const tGalleryUpsert = tGallery.partial({id: true, index: true});

export const tGalleryResolver = zId.or(tGalleryUpsert);
