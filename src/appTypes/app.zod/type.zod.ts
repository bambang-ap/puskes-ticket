import {z} from 'zod';

export const zId = z.object({id: z.string()});

export type TUser = z.infer<typeof tUser>;
export const tUser = zId.extend({
	name: z.string(),
});
