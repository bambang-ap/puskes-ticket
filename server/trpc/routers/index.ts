import {router} from '@trpc';
import {inferRouterInputs, inferRouterOutputs} from '@trpc/server';

import userRouters from './user';

export const appRouter = router({
	user: userRouters(),
});

export type AppRouter = typeof appRouter;
export type AppRouterCaller = ReturnType<AppRouter['createCaller']>;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
