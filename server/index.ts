// FIXME:
/* eslint-disable @typescript-eslint/no-unused-vars */

import {NextApiRequest, NextApiResponse} from 'next';

import {PagingResult} from '@appTypes/app.type';
import {TSession} from '@appTypes/app.zod';
import {TRPCError} from '@trpc/server';
import {moment} from '@utils';

export {generateId} from '@utils';
export * from './enum';

export const getSession = async (
	_req: NextApiRequest,
	_res: NextApiResponse,
) => {
	return {hasSession: true, session: {expires: '', user: {}} as TSession};

	// if (req.headers['user-agent']?.toLowerCase()?.includes('postman')) {
	// 	return {
	// 		session: {user: "{role: 'admin'}"} as TSession,
	// 		hasSession: true,
	// 	};
	// }

	// const session = (await getServerSession(_req, _res, authOptions)) as TSession;

	// return {session, hasSession: !!session};
};

export const Response = <T extends object>(res: NextApiResponse) => {
	return {
		success(body: T) {
			return res.status(200).send(body);
		},
		error(message: string) {
			return res.status(500).send({message});
		},
	};
};

export const getNow = () => {
	return moment().toLocaleString();
};

export const checkCredential = async (
	req: NextApiRequest,
	res: NextApiResponse,
	callback: NoopVoid | (() => Promise<void>),
) => {
	const {hasSession} = await getSession(req, res);

	if (!hasSession) return Response(res).error('You have no credentials');

	return callback();
};

export async function checkCredentialV2<T>(
	ctx: {req: NextApiRequest; res: NextApiResponse},
	callback: ((session: TSession) => Promise<T>) | ((session: TSession) => T),
	// allowedRole?: string,
) {
	const {hasSession, session} = await getSession(ctx.req, ctx.res);

	if (!hasSession) {
		throw new TRPCError({
			code: 'FORBIDDEN',
			message: 'You have no credentials',
		});
	}

	return callback(session);
}

export function pagingResult<T extends unknown>(
	count: number,
	page: number,
	limit: number,
	rows: T[],
): PagingResult<T> {
	const mod = count % limit;
	const totalPage = (count - mod) / limit + (mod > 0 ? 1 : 0);

	return {count, page, limit, totalPage, rows};
}
