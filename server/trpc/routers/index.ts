import {router} from '@trpc';
import {inferRouterInputs, inferRouterOutputs} from '@trpc/server';

import customerRouters from './customer';
import stateRouters from './state';
import userRouters from './user';

export const appRouter = router({
	user: userRouters(),
	customer: customerRouters(),
	state: stateRouters(),
});

export type AppRouter = typeof appRouter;
export type AppRouterCaller = ReturnType<AppRouter['createCaller']>;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
