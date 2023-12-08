import {router} from '@trpc';
import {inferRouterInputs, inferRouterOutputs} from '@trpc/server';

import customerRouters from './customer';
import galleryRouters from './gallery';
import stateRouters from './state';
import userRouters from './user';

export const appRouter = router({
	user: userRouters(),
	customer: customerRouters(),
	state: stateRouters(),
	gallery: galleryRouters(),
});

export type AppRouter = typeof appRouter;
export type AppRouterCaller = ReturnType<AppRouter['createCaller']>;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
