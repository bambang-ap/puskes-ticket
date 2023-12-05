import {TRPCError} from '@trpc/server';
import {TRPC_ERROR_CODE_KEY} from '@trpc/server/rpc';

export * from './sequelize';

export function PSuccess<T extends undefined | unknown = undefined>(data?: T) {
	return {message: 'Success', data: data as T};
}

export class PError extends TRPCError {
	constructor(err: unknown, code: TRPC_ERROR_CODE_KEY, message?: string) {
		const errMsg = err instanceof Error ? err.message : message;

		super({code, message: message || errMsg});
	}
}
