import {z} from 'zod';

export type TDateFilter = z.infer<typeof tDateFilter>;
export const tDateFilter = z.object({
	filterFrom: z.string(),
	filterTo: z.string(),
});
