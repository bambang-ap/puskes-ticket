export type {
	AppRouter,
	AppRouterCaller,
	RouterInput,
	RouterOutput,
} from '@trpc/routers';
export type {Context} from 'server/trpc/context';

export type PagingResult<T> = {
	rows: T[];
	count: number;
	page: number;
	totalPage: number;
	limit: number;
};
