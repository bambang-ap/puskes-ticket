import {jsPDFOptions} from 'jspdf';

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

export type PaperSize = [height: number, width: number];

export type GenPdfOpts = {
	filename?: string;
	paperSize?: PaperSize;
	orientation?: jsPDFOptions['orientation'];
};
