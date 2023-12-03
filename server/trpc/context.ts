import {inferAsyncReturnType} from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
export type Context = inferAsyncReturnType<typeof createContext>;

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
	return ctx;
}
