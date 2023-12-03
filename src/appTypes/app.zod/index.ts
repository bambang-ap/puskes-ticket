import {z} from 'zod';

import {decimalRegex} from '@constants';

export * from './type.zod';

export type TDecimal = z.infer<typeof zDecimal>;
export const zDecimal = z
	.string()
	.transform(str => parseFloat(str))
	.or(z.number());

export const decimalSchema = z.string().regex(decimalRegex); //.transform(Number);

export type TSession = z.infer<typeof tSession>;
export const tSession = z.object({
	expires: z.string(),
	user: z.string().optional(),
});
// export const tSession = z.object({expires: z.string(), user: tUser.nullish()});
