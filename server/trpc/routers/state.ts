import {TProvince, zId} from '@appTypes/app.zod';
import {procedure, router} from '@trpc';

export default function stateRouters() {
	const url = 'https://www.emsifa.com/api-wilayah-indonesia/api';

	return router({
		provinces: procedure.query(async () => {
			const data = await fetch(`${url}/provinces.json`);
			return data.json() as unknown as TProvince[];
		}),

		regencies: procedure.input(zId).query(async ({input: {id}}) => {
			const data = await fetch(`${url}/regencies/${id}.json`);
			return data.json() as unknown as TProvince[];
		}),

		districts: procedure.input(zId).query(async ({input: {id}}) => {
			const data = await fetch(`${url}/districts/${id}.json`);
			return data.json() as unknown as TProvince[];
		}),

		villages: procedure.input(zId).query(async ({input: {id}}) => {
			const data = await fetch(`${url}/villages/${id}.json`);
			return data.json() as unknown as TProvince[];
		}),
	});
}
